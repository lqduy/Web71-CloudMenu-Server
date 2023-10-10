const handleErrorMiddleware = (err, req, res, next) => {
  const statusCode = res.statusCode ?? 500;

  res.status(statusCode).json({
    statusCode,
    message: err.message,
    stack: err.stack
  });
};

export default handleErrorMiddleware;
