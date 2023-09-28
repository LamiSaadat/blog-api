const validateFields = (reqBody, fields) => {
  for (const field in fields) {
    if (!(field in reqBody)) {
      return false
    }
  }
  return true
}

module.exports = {
  validateFields
}