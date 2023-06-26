const responseMiddleware = (req, res, next) => {
  // TODO: Implement middleware that returns result of the query
  if (res.error) {
    res.json({
      error: true,
      message: res.message,
    });
  } else {
    res.json({
      error: false,
      data: res.data,
      message: res.message || "Success"
    });
  }
  next();
};

export { responseMiddleware };
