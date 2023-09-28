const validateFields = (reqBody, fields) => {
  return fields.every((field) => field in reqBody)
}

module.exports = {
  validateFields
}