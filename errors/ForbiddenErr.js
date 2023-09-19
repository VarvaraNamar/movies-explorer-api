// Код состояния HTTP - 403 Forbidden («запрещено (не уполномочен)»)
module.exports = class ForbiddenErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
};
