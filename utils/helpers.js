const validateFields = (reqBody, fields) => {
  for (const field of fields) {
    if (!(field in reqBody)) {
      return false
    }
  }
  return true
}

const validatePostID = postId => {
  if (!(isNaN(postId) || postId <= 0)) {
    return false
  }
  return true
}

module.exports = {
  validateFields,
  validatePostID
}