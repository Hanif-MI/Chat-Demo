import { ApiErrorResponse } from "../utils/ApiResponse.js";

export function errorHandlerMiddleware(err, req, res, next) {
  console.error(err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  if (err instanceof ApiErrorResponse) {
    return res.status(statusCode).json({
      statusCode,
      status: err.status,
      message,
      extra: err.extra ?? null
    });
  }

  res.status(statusCode).json({
    statusCode,
    message,
  });
}
