import currency from 'currency.js'

export const getNumericFormatter = ({ code = 'USD', locale = 'en', formatWithSymbol, style, ...options } = {}) => {
  return new Intl.NumberFormat(locale, {
    currency: code,
    ...options,
    ...(formatWithSymbol || style)  && { style: style || 'currency' }
  })
}

export const numeric = (value, options) => {
  const formatter = getNumericFormatter(options)

  const trim = (amount) => {
    let number = ''
  
    for (const part of formatter.formatToParts(amount)) {
      const { type, value } = part
      if (type === 'decimal') {
        break
      }

      number += value
    }

    return number
  }

  return {
    ...currency(value, options),
    format: () => formatter.format(value),
    formatToParts: () => formatter.formatToParts(value),
    trim:() => trim(value)
  }
}

// eslint-disable-next-line default-param-last
export const formatPrice = (price = 0, currenceCode = "USD", symbol) => {
  const amount = price / 100
  const code = currenceCode.toUpperCase()

  return {
    currency: code,
    amount: numeric(amount).intValue,
    formatted: `${numeric(amount, {
      code,
      formatWithSymbol: true,
      ...symbol && { symbol },
    }).format()}`
  }
}
