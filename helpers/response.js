exports.sendCreated = (res, data) => res.status(201).json(data);

exports.sendBadRequest = (res, error) => res.status(400).send({
  success: false,
  error,
});

exports.sendUnauthorized = (res, message) => res.status(401).send({
  success: false,
  message,
});

exports.sendForbidden = (res) => res.status(403).send({
  success: false,
  message: 'You do not have rights to access this resource.',
});

exports.sendNotFound = (res) => res.status(404).send({
  success: false,
  message: 'Resource not found.',
});

exports.sendServerError = (res) => res.status(500).send({
  success: false,
  message: 'Internal Server Error.',
});
