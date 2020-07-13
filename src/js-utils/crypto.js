/* eslint-disable max-params */
/* eslint-disable default-param-last */
// TODO modify the method signature to place params with default values as last in the signature

import crypto from 'crypto'
import { safeParse } from './display'

// TODO!!!: need to double check if we need to destructure audit out of provider config in here
export const cleanProviderConfig = (providerConfig = {}) => {
  const { fetch, application, ...config } = providerConfig
  return config
}

export const createHash = object => {
  return object ? crypto.createHash('sha256', JSON.stringify(object)) : object
}

export const getRecrypted = encrypted => {
  const [begining, hiddenInitialVector, end] = encrypted.split(/_(.*==)=/g)
  return { initialVector: hiddenInitialVector, encrypted: `${begining}${end}` }
}

export const getEncryptedKey = (name, keys) => {
  const [, encryptedKey] = Object.entries(keys).find(
    ([entryKey]) => entryKey === name
  )
  return encryptedKey
}

export const getInitialVector = () => {
  return crypto.randomBytes(16).toString('base64')
}

// #region RSA

export const encryptRSAPublic = (toEncrypt, publicKey) => {
  return !toEncrypt || !publicKey
    ? ''
    : crypto
        .publicEncrypt(publicKey, Buffer.from(JSON.stringify(toEncrypt)))
        .toString('base64')
}

export const decryptRSAPublic = (toDecrypt, publicKey) => {
  return !toDecrypt || !publicKey
    ? ''
    : crypto
        .publicDecrypt(publicKey, Buffer.from(toDecrypt, 'base64'))
        .toString('utf8')
}

export const encryptRSAPrivate = (toEncrypt, privateKey) => {
  return !toEncrypt || !privateKey
    ? ''
    : crypto
        .privateEncrypt(privateKey, Buffer.from(JSON.stringify(toEncrypt)))
        .toString('base64');
};

export const decryptRSAPrivate = (toDecrypt, privateKey) => {
  return !toDecrypt || !privateKey
    ? ''
    : crypto
        .privateDecrypt(privateKey, Buffer.from(toDecrypt, 'base64'))
        .toString('utf8')
}

// #endregion RSA

// #region AES

export const encryptIvAES = (toEncrypt, sharedSecret, initialVector) => {
  return `${initialVector}${encryptAES(
    toEncrypt,
    sharedSecret,
    initialVector
  )}`
}

export const encryptAES = (toEncrypt, sharedSecret, initialVector) => {
  if (!toEncrypt || !sharedSecret || !initialVector) return ''
  const cipher = crypto.createCipheriv(
    'aes-256-cbc',
    Buffer.from(sharedSecret, 'base64'),
    Buffer.from(initialVector, 'base64')
  )
  const encrypted = cipher.update(JSON.stringify(toEncrypt))
  return Buffer.concat([encrypted, cipher.final()]).toString('base64')
}

export const decryptIvAES = (toDecrypt, sharedSecret, initialVector) => {
  if (!initialVector) {
    initialVector = toDecrypt.slice(0, 24)
    toDecrypt = toDecrypt.slice(24)
  }
  
  return decryptAES(toDecrypt, sharedSecret, initialVector)
}

export const decryptAES = (toDecrypt, sharedSecret, initialVector) => {
  if (!toDecrypt || !sharedSecret || !initialVector) return ''
  const decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    Buffer.from(sharedSecret, 'base64'),
    Buffer.from(initialVector, 'base64')
  )
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(toDecrypt, 'base64')),
    decipher.final()
  ])
  return decrypted.toString('utf8')
}

// #endregion AES

// #region SHARED

// TODO!!!!!!: major change, need to ensure we triple test everything that was using this
export const handleProviderCryptoConfig = (
  provider = {},
  cryptoConfigHandler,
  cryptoFunction,
  cryptoKey
) => {
  const { audit, config, ...data } = provider

  const providerConfig = cleanProviderConfig(
    cryptoConfigHandler(cleanProviderConfig(config), cryptoFunction, cryptoKey)
  )

  return { config: providerConfig, ...data }
}

// #endregion SHARED

// #region SHARED_ENCRYPT

export const encryptProviderConfig = (
  unecryptedConfig = {},
  encryptFunction,
  cryptoKey
) => {
  const encryptedConfig = encryptFunction(unecryptedConfig, cryptoKey)
  
  return { encrypted: encryptedConfig }
}

const encryptProvider = (
  provider = {},
  encryptFunction,
  cryptoKey,
  sharedSecret,
  initialVector,
  configHandler = provider => provider
) => {
  const encryptedProviderConfig = configHandler(
    provider,
    encryptProviderConfig,
    encryptFunction,
    cryptoKey
  )
  
  const encryptedProviderData = encryptAES(
    encryptedProviderConfig,
    sharedSecret,
    initialVector
  )
  
  const encryptedProvider = { encrypted: encryptedProviderData }
  
  return encryptedProvider
}

export const encryptProviders = (
  providers = {},
  encryptFunction,
  cryptoKey,
  sharedSecret,
  initialVector,
  configHandler = provider => provider
) => {
  return Object.entries(providers).reduce(
    (encryptedProviders, [providersType, provider]) => {
      return {
        ...encryptedProviders,
        [providersType]: encryptProvider(
          provider,
          encryptFunction,
          cryptoKey,
          sharedSecret,
          initialVector,
          configHandler
        )
      }
    },
    {}
  )
}

// #endregion SHARED_ENCRYPT

// #region SHARED_DECRYPT

export const decryptProviderConfig = (
  encryptedConfig = {},
  decryptFunction,
  cryptoKey
) => {
  const { encrypted: encryptedConfigData } = encryptedConfig
  
  const decryptedConfigData = decryptFunction(encryptedConfigData, cryptoKey)
  
  const decryptedConfig = safeParse(decryptedConfigData)
  
  return decryptedConfig
}

const decryptProvider = (
  encryptedProvider = {},
  decryptFunction,
  cryptoKey,
  sharedSecret,
  initialVector,
  configHandler = provider => provider
) => {
  const { encrypted: encryptedProviderData } = encryptedProvider
  
  const decryptedProviderData = safeParse(
    decryptAES(encryptedProviderData, sharedSecret, initialVector)
  )
  
  const decryptedProvider = configHandler(
    decryptedProviderData,
    decryptProviderConfig,
    decryptFunction,
    cryptoKey
  )

  return decryptedProvider
}

export const decryptProviders = (
  encryptedProviders = {},
  decryptFunction,
  cryptoKey,
  sharedSecret,
  initialVector,
  configHandler = provider => provider
) => {
  return Object.entries(encryptedProviders).reduce(
    (decryptedProviders, [providersType, encryptedProvider]) => {
      return {
        ...decryptedProviders,
        [providersType]: decryptProvider(
          encryptedProvider,
          decryptFunction,
          cryptoKey,
          sharedSecret,
          initialVector,
          configHandler
        )
      }
    },
    {}
  )
}

// #endregion SHARED_DECRYPT

// #region SHARED_RECRYPT

// TODO: clean up to be bi-directional Public><Private
// Takes a public encrypted object and swaps it to a private encrypted so that it
// can be decrypted w/ public key on other side
const recryptProvider = (
  encryptedProvider = {},
  decryptFunction,
  encryptFunction,
  cryptoKey,
  sharedSecret,
  initialVector,
  configHandler = provider => provider
) => {
  const decryptedProvider = decryptProvider(
    encryptedProvider,
    decryptFunction,
    cryptoKey,
    sharedSecret,
    initialVector,
    configHandler
  )
  const recryptedProvider = encryptProvider(
    decryptedProvider,
    encryptFunction,
    cryptoKey,
    sharedSecret,
    initialVector,
    configHandler
  )

  return recryptedProvider
}

export const recryptProviders = (
  providers = {},
  decryptFunction,
  encryptFunction,
  cryptoKey,
  sharedSecret,
  initialVector,
  configHandler = provider => provider
) => {
  return Object.entries(providers).reduce(
    (encryptedProviders, [providersType, provider]) => {
      return {
        ...encryptedProviders,
        [providersType]: recryptProvider(
          provider,
          decryptFunction,
          encryptFunction,
          cryptoKey,
          sharedSecret,
          initialVector,
          configHandler
        )
      }
    },
    {}
  )
}

// #endregion SHARED_RECRYPT
