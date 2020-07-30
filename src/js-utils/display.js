import moment from 'moment-timezone'
import { zdColorWhite } from '@zendeskgarden/css-variables'

const semver = require('semver')
const equals = require('fast-deep-equal')

// LOCAL FUNCTIONS

const dateStartsWith = (value, comparison) => {
  return stringStartsWith(
    [
      moment(value).format('MDYY'),
      moment(value).format('M/D/YY'),
      moment(value).format('MDYYYY'),
      moment(value).format('M/D/YYYY'),
      moment(value).format('MMDDYYYY'),
      moment(value).format('MM/DD/YYYY'),
      moment(value).format('DDMMYYYY')
    ],
    comparison
  )
}

const prepareFetchResponse = response => {
  return response.text().then(body => {
    let json = {};

    if (body !== '') {
      json = JSON.parse(body);
    }

    if (!response.ok) {
      const error = JSON.parse(body);
      json = { errors: [error] };
    }

    return {
      status: response.status,
      ok: response.ok,
      json
    };
  });
}

const priceStartsWith = (values, comparison) => {
  return stringStartsWith(
    ensureArray(values).map(value => ensureString(value).replace(/\D/g, '')),
    ensureString(comparison).replace(/\D/g, '')
  )
}

const recase = (string, replacement = '') => !string
  ? ''
  : string
    .replace(/[^a-zA-Z0-9]+/g, replacement)
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/([0-9])([^0-9])/g, '$1-$2')
    .replace(/([^0-9])([0-9])/g, '$1-$2')
    .replace(/[-_]+/g, replacement)
    .toLowerCase()

const stringIncludes = (values, comparison) => {
  return ensureArray(values).some(
    value => 
      (value && typeof value !== 'object' && includes(value, comparison)) ||
      false
  )
}

const stringStartsWith = (values, comparison) => {
  return ensureArray(values).some(
    value =>
      (value &&
        typeof value !== 'object' &&
        ensureString(value).toLowerCase().startsWith(ensureString(comparison).toLowerCase())) ||
      false
  )
}

// EXPORTED FUNCTIONS

export const isWhite = color => {
  return (
    color === 'white' ||
    color === '#fff' ||
    color === '#ffffff' ||
    color === 'rgb(255, 255, 255)' ||
    color === zdColorWhite
  )
}

export const formatTimelineEventDate = date => {
  return `${moment(date).format('ll')} ${moment(date).format('LT')}`;
}

export const trimStatus = paymentStatus => {
  switch (paymentStatus) {
    case 'refunded':
      return 'refund'
    case 'authorized':
      return 'auth'
    default:
      return paymentStatus
  }
}

export const hashAddress = address => {
  return hashCode(
    `${address.line_1 || ''}${address.line_2 || ''}${address.city ||
      ''}${address.county || ''}${address.postcode || ''}${address.country ||
      ''}`
  )
}

export const convertStoreAddress = store => {
  return {
    name: store.name,
    firstName: '',
    lastName: '',
    line1: store.address,
    line2: '',
    city: store.city,
    region: store.state,
    country: '',
    postCode: store.zip,
    phone: store.phone,
    email: store.email
  }
}

// TODO: bring in address name field in general to address form?
export const toCommerceAddress = (
  line1,
  line2,
  city,
  state,
  zip,
  firstName = '',
  lastName = '',
  country = 'US'
  // eslint-disable-next-line max-params
) => ({
  first_name: firstName,
  last_name: lastName,
  line_1: line1,
  line_2: line2,
  city: city,
  county: state,
  postcode: zip,
  country: country
})

export const fromCommerceAddress = (address = {}) => ({
  name: address.company_name,
  firstName: address.first_name,
  lastName: address.last_name,
  line1: address.line_1,
  line2: address.line_2,
  city: address.city,
  region: address.county,
  country: address.country,
  postCode: address.postcode,
  phone: address.phone || '',
  email: address.email || ''
})

export const wrapKeyData = (keyData, keyType = 'RSA PRIVATE') => {
  return `-----BEGIN ${keyType} KEY-----${
    keyData.replace( /"/g, '')
  }-----END ${keyType} KEY-----\n`.replace(/\\n/g, '\n')
}

export const arrayEmpty = (array) => {
  // eslint-disable-next-line eqeqeq
  return !array || !array.length || array[0] == undefined
}

export const arraysEqual = (array1, array2) => {
  return (
    array1 &&
    array2 &&
    array1.length === array2.length &&
    array1.sort().every((value, index) => {
      return value === array2.sort()[index];
    })
  );
}

export const arrayNotEmpty = (array) => {
  // eslint-disable-next-line eqeqeq
  return !arrayEmpty(array) && array[0] != undefined
}

export const camelcase = string => {
  return !string
    ? ''
    : string.replace(
        /\w\S*/g,
        word => `${uppercase(word.charAt(0))}${word.substr(1).toLowerCase()}`
      );
}

export const clean = string => {
  return string ? string.replace(/\W/g, '') : string;
}

export const cleanObject = object => {
  return !object
    ? object
    : Object.entries(object)
        .filter(([key, value]) => {
          // eslint-disable-next-line eqeqeq
          return value && value != undefined;
        }) // Remove undef. and null.
        .reduce(
          (cleanedObject, [key, value]) =>
            typeof value === 'object'
              ? { ...cleanedObject, [key]: cleanObject(value) } // Recurse.
              : { ...cleanedObject, [key]: value }, // Copy value.
          {}
        );
}

export const cloneObject = object => {
  return JSON.parse(JSON.stringify(object));
}

export const compareDate = (date1, date2) => {
  return -moment.utc(date1).diff(moment.utc(date2))
}

export const compareNumber = (number1, number2) => {
  return number1 - number2
}

export const compareString = (string1, string2) => {
  return ensureString(string1).localeCompare(string2)
}

export const convertSpaces = string => {
  return string ? string.replace(/ /g, '\u00a0') : string;
}

export const dashcase = string => {
  return recase(string, '-');
}

export const deepEqual = (object1, object2) => {
  return object1 &&
    object2 &&
    typeof object1 === 'object' &&
    typeof object2 === 'object'
    ? equals(object1, object2)
    : object1 === object2;
}

export const delay = (time) => {
  return new Promise((res) => {
    return setTimeout(() => {
      return res()
    }, time)
  })
}

export const endsWithAny = (string, suffixes = []) => {
  return suffixes.some(suffix => {
    return string.endsWith(suffix);
  });
}

/**
 * Helper to escape unsafe characters in HTML, including &, <, >, ", ', `, =
 * @param {String} str String to be escaped
 * @return {String} escaped string
 */
export const escapeSpecialChars = str => {
  if (typeof str !== 'string')
    throw new TypeError(
      'escapeSpecialChars function expects input in type String'
    );

  const escaped = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;',
    '=': '&#x3D;'
  };

  return str.replace(/[&<>"'`=]/g, function(m) {
    return escaped[m];
  });
}

export const ensureNumeric = (string) => Number(ensureString(string).replace(/[^0-9.]/gi, ''))

export const ensureArray = (array = []) => {
  return !array ? [] : Array.isArray(array) ? array : [array]
}

export const ensureObject = (object) => {
  return object || {}
}

export const ensureString = (string) => {
  return string ? `${string}` : ''
}

export const splitString = (splitting, index = splitting.length) => {
  const string = ensureString(splitting)
  return [string.slice(0, index), string.slice(index)]
}

export const capitalize = (string) => {
  const parts = splitString(string, 1)
  return `${uppercase(parts[0])}${parts[1]}`
}

export const uppercase = string => {
  return ensureString(string).toUpperCase();
}

export const isTrue = (value) => {
  const string = ensureString(value)
  return !['','false'].includes(string)
}

export const isType = (value, type) => {
  return value && typeof value === type
}

export const formatPhone = phoneNumber => {
  return phoneNumber
    ? phoneNumber
        .replace(/[^\d]/g, '')
        .replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
    : '';
}

export const getHash = unhashed => {
  return clean(unhashed);
}

export const getPagedData = (
  data,
  selectedPage,
  pageSize,
  sortComparator,
  sortField,
  sortDirection
  // eslint-disable-next-line max-params
) => {
  const sortedData = sortField && sortDirection
    ? data.sort((a, b) => {
        const aValue = traverse(sortField, a);
        const bValue = traverse(sortField, b);
        const sortComparison = sortComparator(aValue, bValue);
        return sortDirection === 'asc' ? sortComparison : -sortComparison;
      })
    : data;
  return sortedData.slice((selectedPage - 1) * pageSize, selectedPage * pageSize);
}

export const handleFetchResponse = (response) => {
  return prepareFetchResponse(response).then((responseObj) => {
    if (responseObj.ok) {
      return responseObj.json
    }

    let errorMsg = responseObj

    if (typeof responseObj === 'object') {
      errorMsg = JSON.stringify(responseObj)
    }

    return Promise.reject(safeParse(errorMsg))
  })
}

export const hashCode = (object) => {
  const key = object ? JSON.stringify(object) : null
  return key
    ? Array.from(key).reduce((s, c) => {
      return (Math.imul(31, s) + c.charCodeAt(0)) | 0
    }, 0)
    : null
}

export const includes = (original, comparison) => {
  const formattedOriginal = ensureString(original)
    .replace(/ /g, '')
    .toLowerCase();
  const formattedComparison = ensureString(comparison)
    .replace(/ /g, '')
    .toLowerCase();

  return formattedOriginal.includes(formattedComparison);
}

export const isNumeric = string => {
  return string && !isNaN(parseFloat(string)) && isFinite(string);
}

export const isAlpha = string => {
  return string && /^[a-zA-Z]*$/.test(string);
}

export const lowercase = (string) => {
  return !string ? '' : string.toLowerCase()
}

export const mergeArraysByKey = (ary1, ary2, key) => {
  return ensureArray(ary1).map(item1 => {
    const matchingItem = ensureArray(ary2).find(item2 => {
      return item2[key] === item1[key] && item2;
    });
    return {
      ...item1,
      ...matchingItem
    };
  });
}

export const nextRandom = (max = 100, min = 1) => {
  let randomNumber;
  do {
    randomNumber = random(max, min);
  } while (randomNumber === nextRandom.last);

  nextRandom.last = randomNumber;
  return randomNumber;
}

export const nullable = object => {
  return !object || object === 'null' || object === undefined || object === null
    ? null
    : object;
}

export const objectEmpty = (object) => {
  return !object || !Object.keys(object).length
}

// TODO investigate if there is already a utility for this purpose
export const objectContainsAnyValue = (object) => {
  return Object.values(object).some(value => nullable(value)) 
}

export const objectMatchers = {
  stringIncludes,
  stringStartsWith,
  priceStartsWith,
  dateStartsWith
};

export const objectMatchesFilter = (
  object = {},
  matchers = {},
  filter = ''
) => {
  return Object.entries(matchers).some(
    ([fieldKey, match = stringIncludes]) => {
      const value = traverse(fieldKey, object);
      return match(value, filter);
    }
  );
}

export const objectNotEmpty = (object) => {
  return !objectEmpty(object)
}

export const objectToFormData = (object, formData = [], previousKey = '') => {
  object = safeParse(object);
  if (object && typeof object === 'object') {
    Object.keys(object).forEach(key => {
      objectToFormData(
        object[key],
        formData,
        previousKey === '' ? key : `${previousKey}[${key}]`
      );
    });
  } else if (previousKey !== '') {
    formData.push(`${encodeURIComponent(previousKey)}=${encodeURIComponent(object)}`)
  }
  
  return formData.join('&');
}

export const objectToQuerystring = (object) => {
  object = safeParse(object)
  return object
    ? Object.keys(object)
      .map((property) => {
        const value = object[property]
        return `${encodeURIComponent(property)}=${
          typeof value === 'object'
            ? objectToQuerystring(value)
            : encodeURIComponent(value)
        }`
      })
      .join('&')
    : ''
}

export const prepareRegex = (string) => {
  return (
    string
      // TODO!!: test out with: .replace(/[-[\]{}()*+!<=:?./\\^$|#\s,]/g, '\\$&')
      // eslint-disable-next-line no-useless-escape
      .replace(/[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g, '\\$&')
      .replace('\\*', '.+')
  )
}

export const toRegexArray = (csv) => {
  return (csv || '')
    .replace(/, /g, ',')
    .split(',')
    .map(value => new RegExp(`^${prepareRegex(value)}$`))
}

export const querystringToObject = queryString => {
  const hashes = queryString.split('&');
  return hashes.reduce((params, hash) => {
    const split = hash.indexOf('=');
    const key = hash.slice(0, split);
    const val = hash.slice(split + 1);
    return Object.assign(params, { [key]: decodeURIComponent(val) });
  }, {});
}

export const random = (max = 100, min = 1) => {
  const floor = Math.min(max, min)
  return Math.floor(Math.random() * (max - floor + 1)) + floor
}

export const reverseTruncate = (value, length, prefix) => {
  if (!value || !length) return value || '';
  const truncated = ensureString(value).slice(value.length - length);
  return value.length <= length
    ? value
    : prefix
    ? `${prefix}${truncated}`
    : truncated;
}

export const safeTrim = (object) => {
  if (object
    && typeof object === 'string'
  ) {
    object = object.trim(object)
  }

  return object
}

export const safeParse = (object, trim) => {
  if (object
    && typeof object === 'string'
  ) {
    if (trim) {
      object = safeTrim(object)
    }

    if (object.startsWith('{') || object.startsWith('[')) {
      object = JSON.parse(object)
    }
  }

  return object
}

export const safeStringify = object => {
  if (object && typeof object === 'object') {
    object = JSON.stringify(object);
  }

  return object;
}

export const snakecase = string => {
  return recase(string, '_');
}

export const splitName = (fullName = '') => {
  fullName = fullName || '';
  const firstName = fullName
    .split(' ')
    .slice(0, -1)
    .join(' ');
  const lastName = fullName.split(' ').slice(-1)[0];
  return { firstName, lastName };
}

/**
 * Helper to render a dataset using the same template function
 * @param {Array} set dataset
 * @param {Function} getTemplate function to generate template
 * @param {String} initialValue any template string prepended
 * @return {String} final template
 */
export const templatingLoop = (set, getTemplate, initialValue = '') => {
  return set.reduce((accumulator, item, index) => {
    return `${accumulator}${getTemplate(item, index)}`;
  }, initialValue);
}

export const toName = (nameable) => {
  return !nameable ? '' : Object.keys(nameable)[0]
}

// eslint-disable-next-line no-restricted-globals
export const traverse = (selector, obj = self, separator = '.') => {
  const properties = Array.isArray(selector)
    ? selector
    : ensureString(selector).split(separator);
  return properties.reduce((prev, curr) => prev && prev[curr], obj);
}


export const compareVersion = (version1, version2) =>
  version1 === version2 ? 0 : semver.gt(version1, version2) ? -1 : 1

export const removeLeadingSlash = string => ensureString(string).replace(/^\//, "")

export const removeTrailingSlash = string => ensureString(string).replace(/\/$/, "")

export const removeLeadingTrailingSlash = string =>
  removeTrailingSlash(removeLeadingSlash(string))

export const ensureLeadingSlash = string => `/${removeLeadingSlash(string)}`

export const getNavigationItem = (text, item) => {
  const { frontmatter, path } = item || {}
  const { title } = frontmatter || {}
  return {
    ...frontmatter,
    text: text || title,
    path,
  }
}

export const getNavigationLinks = ({
  path: currentPath,
  subPaths = [],
  labels = ['Previous', 'Next'],
  maxItems = 2,
}) => {
  const currentIndex = subPaths.findIndex(
    ({ path: subPath }) => subPath === currentPath
  )
  const items = Math.max(2, maxItems)
  const previousCount = Math.ceil(items / 2)
  const nextCount = items - previousCount
  const firstIndex = Math.max(0, currentIndex - previousCount)
  const lastIndex =
    currentIndex < 0
      ? 0
      : Math.min(subPaths.length, currentIndex + 1 + nextCount)

  return [
    ...(currentIndex === 0 ? [null] : []),
    ...subPaths.slice(firstIndex, currentIndex),
    ...subPaths.slice(currentIndex + 1, lastIndex),
    ...(currentIndex === subPaths.length - 1 ? [null] : []),
  ].map((navigationItem, index) =>
    getNavigationItem(labels[index] || index, navigationItem)
  )
}

export const scrollTo = hash => {
  if (hash && document.querySelector(hash)) {
    document.querySelector(hash).scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }
}

export const formatNumber = (number, locale = 'en') => Number(number).toLocaleString(locale)

export const formatDate = (value) => {
  return value
    ? moment(value).format('lll')
    : null
}

export const formatTimestamps = ({ created_at = moment(), updated_at = moment() } = {}) => ({
  created_at: moment(created_at).format('YYYY-MM-DD HH:mm:ss'),
  updated_at: moment(updated_at).format('YYYY-MM-DD HH:mm:ss'),
})

export const getOrigin = (origin, referer) => {
  const subOrigin = referer ? referer.match(/\?origin=([^?&]+)/) : null
  if (subOrigin) {
    origin = decodeURIComponent(subOrigin[1])
  }

  return origin || referer
}

export const handleError = response => {
  return new Promise((resolve, reject) => {
    if (response && response.error) {
      console.error(
        `handleError, response.error: ${JSON.stringify(response.error)}`
      )
      reject(response.error)
    } else {
      resolve(response)
    }
  })
}

export const getProvidersLabel = providersName => {
  // 'commerceProvider
  return providersName.replace('Provider', '') // 'commerce', 'shipping'
}

export const getProviderInfo = (providers, providerType) => {
  return objectEmpty(providers) || !providerType
    ? null
    : providers[providerType].getInfo()
}
