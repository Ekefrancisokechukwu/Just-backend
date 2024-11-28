// Custom class Here

class CustomError extends Error {
  constructor(message) {
    super(message);
  }
}

module.exports = CustomError;
