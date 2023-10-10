const apiLoggerMiddleware = (req, res, next) => {
  const currentDate = new Date().toString();
  console.log(`An API is coming at ${currentDate}`);
  next();
};

export default apiLoggerMiddleware;
