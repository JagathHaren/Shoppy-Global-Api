// middleware/notFound.js
const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Oops! The route you are trying to reach does not exist.",
    hint: "Check your endpoint or explore the API docs ",
    pathTried: req.originalUrl,
    method: req.method
  });
};

module.exports = notFound;
