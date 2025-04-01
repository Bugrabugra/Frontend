const errorHandler = (err, req, res, next) => {
  if (err.status) {
    return res.status(err.status).json({ error: err.message });
  }

  res.status(404).json({ msg: err.message });
};

export default errorHandler;
