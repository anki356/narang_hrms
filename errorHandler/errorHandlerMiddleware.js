
const errorHandlerMiddleware = (error, req, res, next) => {
  console.log("error handler catch", error.name);
  let DEFAULT_RESPONSE = {
    statusCode: error.statusCode || 500,
    status: "request failed",
    type: "internal",
    errors: error,
  };

  if (error.name === "ValidationError") {
    let array_err = Object.values(error.errors)
      .map((item) => item.message)
      .join(",");

    DEFAULT_RESPONSE = {
      statusCode: 400,
      status: "request validation failed",
      type: "validation",
      errors: {message:array_err},
    };
  }

  let { statusCode, status, errors, type } = DEFAULT_RESPONSE;
  
   res.status(200).json({statusCode, status, error: errors.message, type });
};

module.exports= errorHandlerMiddleware
