import {
  isType,
  splitName,
  lowercase,
  objectEmpty,
  arrayEmpty,
  arrayNotEmpty,
  ensureArray,
  ensureObject,
  compareDate,
  objectNotEmpty,
} from './display'
// TODO!!!!!!!!!!!!!!!!: helper to check .then(subscription if .errors && .errors.length > 0 then reject

const UNIT_PRICE = 'Unit Price'
const DESCRIPTION = 'Description'
const MINIMUM_UNITS = 'Minimum Units'
const TRIAL_PERIOD = 'Trial Period Days'
const STATUS = 'Status'

const METADATA_APPLICATION_NAME = 'Application'
const METADATA_APPLICATION_ID = 'App ID'
const METADATA_HOSTNAME = 'Host'
const METADATA_AUDIT_ID = 'Audit ID'
export const METADATA_INSTALLATION_ID = 'Installation ID'


export const PLAN_STATUS = {
  LEGACY: 'LEGACY',
  CURRENT: 'CURRENT',
  HIDDEN: 'HIDDEN',
  FUTURE: 'FUTURE',
}

export const PRODUCT_METADATA = {
  UNIT_PRICE,
  DESCRIPTION,
  MINIMUM_UNITS,
  TRIAL_PERIOD,
  STATUS
}

export const activateSubscription = (
  adminPaymentProvider,
  customerId,
  subscriptionBillingData,
  modifiedSubscriptionBillingData,
  subscriptionProduct,
  installation,
  agent,
  sourceOrToken
  // eslint-disable-next-line max-params
) => {
  const {
    billing_email: billingEmail,
    billing_name: billingName
  } = subscriptionBillingData || {}
  const {
    billing_email: modifiedBillingEmail,
    billing_name: modifiedBillingName
  } = modifiedSubscriptionBillingData || {}

  const {
    id: installationId,
    app_id: appId,
    app_name: appName,
    host_name: hostname
  } = installation || {}
  const { id: agentId } = agent || {}
  
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    if (
      !(billingEmail || modifiedBillingEmail) ||
      !installationId ||
      !agentId ||
      objectEmpty(subscriptionProduct)
    ) {
      reject(new Error('Missing Required Data to Subscribe'))
    }

    const {
      metadata: {
        [PRODUCT_METADATA.TRIAL_PERIOD]: subscriptionProductTrialDays
      }
    } = subscriptionProduct
    const subscriptionProductHasTrial = subscriptionProductTrialDays > 0

    let paymentSource = null
    try {
      // NOTE: this will be null for existing customers prior to 1.2.1 (added customer_id to installation settings)
      const existingPaymentCustomer = customerId
        ? await getPaymentCustomer(
            adminPaymentProvider,
            customerId,
            installation,
            agent
          )
        : null

      const paymentCustomer = objectNotEmpty(existingPaymentCustomer)
        ? existingPaymentCustomer
        : (billingEmail && billingName)
          ? (await getCreatePaymentCustomer(
            adminPaymentProvider,
            billingEmail,
            billingName,
            installation,
            agent
          ))
          : (modifiedBillingEmail && modifiedBillingName)
            ? (await getCreatePaymentCustomer(
              adminPaymentProvider,
              modifiedBillingEmail,
              modifiedBillingName,
              installation,
              agent
            ))
            : null

      if (objectEmpty(paymentCustomer)) {
        reject(new Error('Error getting/creating payment customer'))
      }

      const { id: paymentCustomerId } = paymentCustomer

      if (sourceOrToken) {
        paymentSource = await getCreatePaymentInstrument(
          adminPaymentProvider,
          paymentCustomer,
          sourceOrToken,
          installation,
          agent
        )
      }

      const plans = await adminPaymentProvider.getProductPlans(
        subscriptionProduct.id
      )

      if (modifiedBillingEmail || modifiedBillingName) {
        const { email: paymentCustomerEmail, name: paymentCustomerName } = paymentCustomer
        if (modifiedBillingEmail !== paymentCustomerEmail || modifiedBillingName !== paymentCustomerName) {
          await adminPaymentProvider.updateCustomer(paymentCustomerId, {
            email: modifiedBillingEmail,
            name: modifiedBillingName
          })
        }
      }

      // TODO: pass allowTrial = false if the customer has trialed more than X(3?) times before??
      const updatedSubscription = await adminPaymentProvider.upsertSubscription(
        paymentCustomerId,
        plans,
        {
          [METADATA_APPLICATION_NAME]: appName,
          [METADATA_HOSTNAME]: hostname,
          [METADATA_APPLICATION_ID]: appId,
          [METADATA_INSTALLATION_ID]: installationId,
          [METADATA_AUDIT_ID]: agentId
        },
        paymentSource,
        subscriptionProductHasTrial
      )
      resolve(updatedSubscription)
    } catch (error) {
      // TODO investigate if there is a format error function for this
      if (objectNotEmpty(error) && error.json) {
        reject(error)
      } else {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject({
          json: {
            errors: [{
              responseJSON: error
            }]
          }
        })
      }
    }
  })
}

export const cancelSubscription = async (
  adminPaymentProvider,
  subscriptionId
) => {
  await adminPaymentProvider.deleteSubscription(subscriptionId)
}

export const getPaymentInstruments = async (
  paymentProvider,
  email,
  // eslint-disable-next-line default-param-last
  name = '',
  installation,
  agent,
  customerId,
  // eslint-disable-next-line max-params
) => {
  try {
    if (!email || !installation || !agent) {
      throw new Error('Missing Required Data to Get Payment Instruments')
    }

    // TEMP: this is only temporary until all customers have customer id in installation settings (1.2.1)
    const existingCustomer = customerId
      ? await getPaymentCustomer(
          paymentProvider,
          customerId,
          installation,
          agent
        )
      : null

    const customer = objectNotEmpty(existingCustomer)
      ? existingCustomer
      : ensureArray(
          await getPaymentCustomers(
            paymentProvider,
            email,
            name,
            installation,
            agent
          )
        )[0]
    // TODO!!!!!!!!: not sure if this is safe to get cards for all customers just w/ email address, should filter/check on name
    const { payment_instruments: customerIntruments = [] } = customer || {}

    return customerIntruments
  } catch (err) {
    // HMMM, should this have an error message...or even throw direct?
    throw new Error(err)
  }
}

export const getPaymentCustomer = (
  paymentProvider,
  customer_id,
  installation,
  agent
) => {
  // eslint-disable-next-line no-unused-vars
  const { id: installationId, app_id: appId } = installation || {}
  const { id: agentId } = agent || {}

  return new Promise((resolve, reject) => {
    if (!customer_id || !installationId || !agentId) {
      // TODO: test with - reject(new Error('Missing Required Data to Get Payment Customer'))
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('Missing Required Data to Get Payment Customer')
    }

    // TODO consider double checking customer with these filters??
    // const filters = {
    //    [METADATA_APPLICATION_NAME]: appName,
    //    [METADATA_HOSTNAME]: hostname,
    //    [METADATA_APPLICATION_ID]: appId,
    //    [METADATA_INSTALLATION_ID]: installationId
    // }

    return paymentProvider
      .getCustomer(customer_id)
      .then(customer => {
        resolve(customer)
      })
      .catch(error => {
        console.error(`getPaymentCustomer, error: ${JSON.stringify(error)}`)
        reject(error)
      })
  })
}

// TODO!!!!!!!!: test this w/ special characters in email
export const getPaymentCustomers = (
  paymentProvider,
  email,
  name,
  installation,
  agent
  // eslint-disable-next-line max-params
) => {
  const { id: installationId, app_id: appId } = installation || {}
  const { id: agentId } = agent || {}

  return new Promise((resolve, reject) => {
    if (!email || !installationId || !agentId) {
      reject(new Error('Missing Required Data to Get Payment Customers'))
    }

    const { firstName, lastName } = splitName(name)
    // TODO: should this move to payment instuments instead of payment customers
    const filters = {
      [METADATA_APPLICATION_ID]: appId,
      [METADATA_INSTALLATION_ID]: installationId
    }

    return paymentProvider
      .searchCustomers(email, firstName, lastName, filters)
      .then(filteredCustomers => {
        resolve(filteredCustomers)
      })
      .catch(error => {
        console.error(`getPaymentCustomers, error: ${JSON.stringify(error)}`)
        reject(error)
      })
  })
}

export const getAvailablePaymentProducts = (adminPaymentProvider, filters = {}) => {
  return new Promise((resolve, reject) => {
    return adminPaymentProvider
      .getProducts(filters)
      .then(products => {
        resolve(products)
      })
      .catch(error => reject(error))
  })
}

export const getCreatePaymentCustomer = (
  paymentProvider,
  billingEmail,
  billingName,
  installation,
  agent
  // eslint-disable-next-line max-params
) => {
  const {
    id: installationId,
    app_id: appId,
    app_name: appName,
    host_name: hostname
  } = installation || {}
  const { id: agentId } = agent || {}

  return new Promise((resolve, reject) => {
    if (!billingEmail || !installationId || !agentId) {
      // TODO: test with - reject(new Error('Missing Required Data to Get/Create Payment Customer'))
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('Missing Required Data to Get/Create Payment Customer')
    }

    return getPaymentCustomers(
      paymentProvider,
      billingEmail,
      billingName,
      installation,
      agent
    )
      .then(filteredCustomers => {
        if (arrayNotEmpty(filteredCustomers)) {
          // TODO!!!!!!!!!!!!!!!!!!: what to do if more than one, shouldn't be...but what is?? (prompt for disambiguation?)
          const existingCustomer = filteredCustomers[0]
          resolve(existingCustomer)
        } else {
          const data = {
            [METADATA_APPLICATION_NAME]: appName,
            [METADATA_HOSTNAME]: hostname,
            [METADATA_APPLICATION_ID]: appId,
            [METADATA_INSTALLATION_ID]: installationId,
            [METADATA_AUDIT_ID]: agentId
          }

          return createPaymentCustomer(
            paymentProvider,
            billingEmail,
            billingName,
            data
          )
            .then(newCustomer => {
              resolve(newCustomer)
            })
            .catch(error => reject(error))
        }
      })
      .catch(error => reject(error))
  })
}

export const createPaymentCustomer = (
  paymentProvider,
  billingEmail,
  // eslint-disable-next-line default-param-last
  billingName = 'New Customer',
  data
) => {
  const { firstName, lastName } = splitName(billingName)
  return new Promise((resolve, reject) => {
    if (!billingEmail) {
      // TODO: test with - reject(new Error('Missing email'))
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('Missing email')
    }

    return paymentProvider
      .createCustomer(billingEmail, firstName, lastName, data)
      .then(customer => {
        resolve(customer)
      })
      .catch(error => reject(error))
  })
}

export const getPaymentProductSubscription = async (
  adminPaymentProvider,
  product,
  installation,
  agent
) => {
  const { items } = product || {}
  if (items && items.data && items.data[0].subscription) {
    const subscription = await getPaymentSubscription(
      adminPaymentProvider,
      items.data[0].subscription,
      installation,
      agent
    ).catch(error => {
      console.error(error)
    })

    return subscription
  }
  
  return null
}

export const getInstallationSubscription = async (
  adminPaymentProvider,
  installation,
  agent
) => {
  const {
    id: installationId,
    app_id: appId,
    settings: { billing_data }
  } = installation
  if (!installationId) return null
  const { billing_email, billing_name, customer_id } = billing_data || {}

  // TEMP: this is only temporary until all customers have customer_id in installation settings (1.2.1)
  const existingCustomer = customer_id
    ? await getPaymentCustomer(
        adminPaymentProvider,
        customer_id,
        installation,
        agent
      )
    : null

  const customer = objectNotEmpty(existingCustomer)
    ? existingCustomer
    : (billing_email && billing_name)
      ? ensureArray(
        await getPaymentCustomers(
          adminPaymentProvider,
          billing_email,
          billing_name,
          installation,
          agent
        )
      )[0]
      : null

  // TODO/HMMMMMMM: doesn't the customer object already have subscriptions??
  const subscriptions = !customer
    ? []
    : await adminPaymentProvider.getSubscriptions(customer.id, {
        [METADATA_APPLICATION_ID]: appId,
        [METADATA_INSTALLATION_ID]: installationId
      })
  // TODO!!!!!!!!!!!!!!!!!!: what to do if more than one subscription??
  return subscriptions[0]
}

export const getPaymentSubscription = async (
  adminPaymentProvider,
  subscriptionId,
  installation,
  agent
) => {
  const { id: installationId, app_id: appId } = installation || {}
  if (!installationId || !appId) return null

  const subscription = await adminPaymentProvider.getSubscription(
    subscriptionId,
    {
      [METADATA_APPLICATION_ID]: appId,
      [METADATA_INSTALLATION_ID]: installationId
    }
  )
  return subscription
}

const cleanPlan = (plan = {}) => {
  const { id, product } = plan
  return { id, product }
}

const cleanItem = (item = {}) => {
  const { id } = item
  return { id }
}

// eslint-disable-next-line no-unused-vars
const cleanItems = (items = {}) => {
  const data = items.data.map(itemData => {
    return cleanItem(itemData)
  })
  return { data }
}

// eslint-disable-next-line no-unused-vars
const cleanSubscription = subscription => {
  const {
    id,
    customer,
    status,
    start_date,
    plan,
    items,
    current_period_start,
    current_period_end,
    metadata,
    last_accessed,
    recheck
  } = subscription || {}
  return {
    id,
    customer,
    status,
    start_date,
    plan: cleanPlan(plan),
    items,
    current_period_start,
    current_period_end,
    metadata,
    last_accessed,
    recheck
  }
}

export const getPaymentCharges = async (
  paymentProvider,
  commerceChargeId,
  paymentChargeId,
  {
    orderId,
    email,
  }
) => {
  if (
    !paymentProvider ||
    !paymentChargeId ||
    paymentChargeId === 'manual' ||
    !paymentProvider.getCharge
  ) {
    return []
  }

  const paymentCharge = await paymentProvider
    .getCharge(paymentChargeId, { commerceChargeId, orderId, email })
    .catch(warn => {
      console.warn(warn)
      return []
    })

  return ensureArray(paymentCharge)
}

export const getPaymentInstrument = (
  paymentProvider,
  paymentCustomerId,
  paymentInstrumentId,
  installation,
  agent
  // eslint-disable-next-line max-params
) => {
  const {
    id: installationId,
    app_id: appId,
    app_name: appName,
    host_name: hostname
  } = installation || {}
  const { id: agentId } = agent || {}
  return new Promise((resolve, reject) => {
    if (!paymentInstrumentId || !installationId || !agentId) {
      // TODO: test with - reject(new Error('Missing Required Data to Get Payment Instrument'))
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('Missing Required Data to Get Payment Instrument')
    }

    const filters = {
      [METADATA_APPLICATION_NAME]: appName,
      [METADATA_HOSTNAME]: hostname,
      [METADATA_APPLICATION_ID]: appId,
      [METADATA_INSTALLATION_ID]: installationId,
      [METADATA_AUDIT_ID]: agentId
    }
    return paymentProvider
      .getPaymentInstrument(paymentCustomerId, paymentInstrumentId, filters)
      .then(paymentInstrument => {
        if (objectEmpty(paymentInstrument)) {
          throw new Error(
            `Error getting paymentInstrument[${paymentInstrumentId}] for customer: ${paymentCustomerId}`
          )
        }

        resolve(paymentInstrument)
      })
      .catch(reject)
  })
}

export const getCreatePaymentInstrument = (
  paymentProvider,
  paymentCustomer,
  sourceOrToken,
  installation,
  agent
  // eslint-disable-next-line max-params
) => {
  const {
    id: installationId,
    app_id: appId,
    app_name: appName,
    host_name: hostname
  } = installation || {}
  const { id: agentId } = agent || {}
  return new Promise((resolve, reject) => {
    if (!sourceOrToken || !installationId || !agentId) {
      // TODO: test with - reject(new Error('Missing Required Data to Get/Create Payment Instrument'))
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('Missing Required Data to Get/Create Payment Instrument')
    }

    const filters = {
      [METADATA_APPLICATION_NAME]: appName,
      [METADATA_HOSTNAME]: hostname,
      [METADATA_APPLICATION_ID]: appId,
      [METADATA_INSTALLATION_ID]: installationId,
      [METADATA_AUDIT_ID]: agentId
    }
    const { last4 } = ensureObject(sourceOrToken)
    const paymentInstrumentData = { ...(last4 && { last4 }) }

    return paymentProvider
      .getPaymentInstrument(
        paymentCustomer.id,
        sourceOrToken.id,
        filters,
        paymentInstrumentData
      )
      .then((paymentInstrument = {}) => {
        if (
          isType(paymentInstrument, 'object') &&
          objectEmpty(paymentInstrument)
        ) {
          throw new Error(
            `Error getting paymentInstrument[${sourceOrToken.id}] for customer: ${paymentCustomer.id}`
          )
        }

        const { payment_instruments: customerInstruments } = ensureObject(
          paymentCustomer
        )

        // HMMM does this need to sort by expiration date?
        const existingCustomerInstruments =
          paymentInstrument &&
          ensureArray(customerInstruments).filter(
            customerInstrument =>
              customerInstrument.hash === paymentInstrument.hash
          )

        if (
          arrayNotEmpty(existingCustomerInstruments) &&
          paymentInstrument &&
          paymentInstrument.id
        ) {
          return resolve(existingCustomerInstruments[0])
        }

        // NOTE this should never occur
        if (
          paymentInstrument &&
          paymentInstrument.customer_id &&
          paymentInstrument.customer_id !== paymentCustomer.id
        ) {
          console.error(
            `Payment instrument customer (${paymentInstrument.customer_id}) does not match payment customer (${paymentCustomer.id}) for installation (${installationId})`
          )
        }

        if (
          !paymentInstrument ||
          !paymentInstrument.customer_id ||
          paymentInstrument.customer_id !== paymentCustomer.id
        ) {
          const newPaymentInstrument = ensureObject(paymentInstrument).id
            ? paymentInstrument
            : sourceOrToken
          return paymentProvider
            .createPaymentInstrument(
              paymentCustomer.id,
              newPaymentInstrument,
              filters
            )
            .then(customerPaymentInstrument => {
              return resolve(customerPaymentInstrument)
            })
            .catch(error => reject(error))
        }

        return resolve(paymentInstrument)
      })
      .catch(error => reject(error))
  })
}

export const trimBrand = cardBrand => {
  return !cardBrand
    ? ''
    : lowercase(cardBrand).startsWith('american')
    ? 'amex'
    : lowercase(cardBrand)
}

export const matchSuccessfulCharges = (transactions = []) => (
  transactions
    .reduce((successfulCharges, {
      relationships: {
        charges: { data: charges },
      },
    }) => {
        return [
          ...successfulCharges,
          ...charges.filter(({
            status,
          }) => {
            return status === 'succeeded'
          }),
        ]
      },
      [],
    )
    .sort((
      { meta: { timestamps: { created_at: createdDate1 } } },
      { meta: { timestamps: { created_at: createdDate2 } } },
    ) => {
      return compareDate(createdDate1, createdDate2)
    },
  )
)

// NOTE: this function is not used right now, but will allow you to do partial refunds for platforms that only allow item refunds
export const matchRefundItems = (filteredItems = [], amount, itemsPrice = 0) => {
  const sortedItems = filteredItems
    .sort((
      { meta: { display_price: { with_tax: { value: { amount: price1 } } } } },
      { meta: { display_price: { with_tax: { value: { amount: price2 } } } } }
    ) => compareNumber(price1, price2)
  )

  let refundItems = []
  // NOTE: intentionally using for loops instead of map so we can break to exit quickly soon as matched
  for (const item of sortedItems) {
    const { meta: { display_price: { with_tax: { value: { amount: price } } } } } = item
    if (price >= amount) {
      itemsPrice += price
      refundItems = [
        ...refundItems,
        item
      ]
      break
    }
  }

  if (refundItems.length === 0 && sortedItems.length > 0) {
    const lastItem = sortedItems[sortedItems.length - 1]
    const { meta: { display_price: { with_tax: { value: { amount: lastItemPrice } } } } } = lastItem
    const [nextItem, previousItemsPrice] = matchRefundItems(sortedItems.slice(0,-1), amount - lastItemPrice, itemsPrice)
    itemsPrice = previousItemsPrice + price
    refundItems = [
      ...refundItems,
      lastItem,
      ...nextItem
    ]
  }

  return [refundItems, itemsPrice]
}
