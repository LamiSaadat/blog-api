const validateUserID = (userId) => {
  if(!userId || isNaN(userId) || userId <= 0) {
    return res.status(400).send({
      error: "Invalid user ID",
    });
  }
}

module.exports = {
  validateUserID
}