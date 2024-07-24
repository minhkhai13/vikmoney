const logger = require('../config/logger')
const config = require('../config/config')
const aws = require('aws-sdk')

const paramasterStoreConfig = {
  region: config.aws.defaultRegion
}

const ssmClient = new aws.SSM(paramasterStoreConfig)

const getParameter = async (key) => {
  return await ssmClient
    .getParameter({
      Name: key,
      WithDecryption: true
    })
    .promise()
}

const getValue = async (key) => {
  const parameter = await getParameter(key)
  logger.info(`Value with key ${key} is ${parameter.Parameter.Value}`)
  return parameter.Parameter.Value
}

const updateValue = async (key, value) => {
  const param = {
    Name: key,
    Value: JSON.stringify(value),
    Overwrite: true
  }
  await ssmClient.putParameter(param).promise()
}

module.exports = {
  getValue,
  getParameter,
  updateValue
}
