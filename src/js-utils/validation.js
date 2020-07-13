const VALIDATE_URL = /^(?:http(s)?:\/\/)?[\w.-]+(?:.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/
const VALIDATE_URL_QUALIFIED = /^(http(s):\/\/)[\w.-]+(?:.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/
const VALIDATE_NAME = /^[a-z]+([a-z',. -]?[a-z.]+)*$/i
const VALIDATE_EMAIL = /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9-]+[.]+(?:.[a-z0-9-]+)+$/i
const VALIDATE_ZIP = /^\b\d{5}(-\d{4})?\b$/
const VALIDATE_ALPHA = /^[a-z]+$/i
const VALIDATE_ALPHANUMERIC = /^[a-z0-9]+$/i
const VALIDATE_ALPHANUMERIC_SEPARATOR = /^[a-z0-9_-]+$/i
const VALIDATE_ALPHANUMERIC_UNDERSCORE = /^[a-z0-9_]+$/i
const VALIDATE_NUMERIC = /^[0-9]+$/
const VALIDATE_TOKEN = /^[a-z0-9_./~=+-]+$/i
const VALIDATE_TOKEN_32 = /^[a-z0-9_./~=+-]{32}$/i
const VALIDATE_FOMATTED_TIMESTAMP = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/
const VALIDATE_FOMATTED_PRICE = /^\D{1,3}\d{1,3}(,\d{3})*(\.\d{2})$/

export const validators = {
  VALIDATE_URL,
  VALIDATE_URL_QUALIFIED, // FULLY QUALIFIED URL
  VALIDATE_NAME,
  VALIDATE_EMAIL,
  VALIDATE_ZIP,
  VALIDATE_ALPHA,
  VALIDATE_ALPHANUMERIC,
  VALIDATE_ALPHANUMERIC_SEPARATOR,
  VALIDATE_ALPHANUMERIC_UNDERSCORE,
  VALIDATE_NUMERIC,
  VALIDATE_TOKEN,
  VALIDATE_TOKEN_32,
  VALIDATE_FOMATTED_TIMESTAMP,
  VALIDATE_FOMATTED_PRICE
}

export const isValidEmail = input => {
  return input && input.match(validators.VALIDATE_EMAIL)
}

export const isValidRegex = (input, regex) => {
  return input && regex && regex.test(input)
}

export const isValidName = input => {
  return input && input.match(validators.VALIDATE_NAME)
}

export const isValidZip = input => {
  return input && input.match(validators.VALIDATE_ZIP)
}

export const validateRegex = (
  input,
  regex,
  errorMessage
) => {
  const isValid = input && regex && isValidRegex(input, regex);
  return {
    isValid,
    validationStatus: isValid ? 'success' : 'error',
    errorMessage,
    isRegex: true
  }
}

export const validateEmail = (
  email,
  errorMessage
) => {
  const isValid = isValidEmail(email);
  return {
    isValid,
    validationStatus: isValid ? 'success' : 'error',
    errorMessage
  }
}

export const validateName = (
  name,
  errorMessage
) => {
  const isValid = isValidName(name);
  return {
    isValid,
    validationStatus: isValid ? 'success' : 'error',
    errorMessage
  }
}

export const validateZip = (
  zip,
  errorMessage
) => {
  const isValid = isValidZip(zip);
  return {
    isValid,
    validationStatus: isValid ? 'success' : 'error',
    errorMessage
  }
}

export const validateAddress = ({
  line1,
  city,
  selectedState,
  zip
} = {}) => {
  return line1 && city && selectedState && zip
}

export const validateNotEmpty = (
  value,
  errorMessage
) => {
  // eslint-disable-next-line eqeqeq
  const isValid = value != undefined && value !== '';
  return {
    isValid,
    validationStatus: isValid ? 'success' : 'error',
    errorMessage
  }
}

export const validateAlways = (
  value,
  errorMessage = ''
) => ({
  isValid: true,
  validationStatus: 'success',
  errorMessage
})

export const isUnparsedAddress = address => {
  const { type, unparsed } = address || {}
  return unparsed && ['store', 'address-customer'].includes(type)
}

export const isValidAddress = address => {
  return (
    address &&
    (isUnparsedAddress(address) ||
      (address.name ||
        address.firstName ||
        address.lastName ||
        address.line1 ||
        address.line2 ||
        address.city ||
        address.region ||
        address.country ||
        address.postCode ||
        address.phone ||
        address.email))
  )
}
