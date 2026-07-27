const sanitizeInput = (req, res, next) => {
  if (req.body) {
    for (const key of Object.keys(req.body)) {
      if (typeof req.body[key] === 'string') {
        req.body[key] = req.body[key].trim();
        req.body[key] = req.body[key].replace(/[<>]/g, '');
      }
    }
  }
  next();
};

module.exports = { sanitizeInput };
