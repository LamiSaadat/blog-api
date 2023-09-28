const validateUserID = (userId) => {
  if(!userId || isNaN(userId) || userId <= 0) {
    return res.status(400).send({
      error: "Invalid user ID",
    });
  }
}

const validateFields = (reqBody, fields) => {
  for (const field in fields) {
    if (!(field in reqBody)) {
      return false
    }
  }
}

module.exports = {
  validateUserID,
  validateFields
}