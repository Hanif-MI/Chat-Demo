class ApiResponse {
    constructor({ statusCode, message, data = null, extra = null }) {
      this.statusCode = statusCode;               
      this.status = statusCode >= 400 ? 'error' : 'success';
      this.message = message;                          
      if (data !== null) this.data = data;               
      if (extra) this.extra = extra;                    
    }
  }
  
  class ApiSuccessResponse extends ApiResponse {
    constructor({ message, data, extra = null, statusCode = 200 }) {
      super({ statusCode, message, data, extra });
    }
  
    static create({ message, data, extra = null, statusCode = 200 }) {
      return new ApiSuccessResponse({ message, data, extra, statusCode });
    }
  }

  class ApiError extends Error {
    constructor(statusCode, message) {
      super(message);
      this.statusCode = statusCode;
      this.isOperational = true; 
    }
  }
  
  export { ApiError };
  
  class ApiErrorResponse extends Error {
    constructor({ message, errorCode = null, extra = null, statusCode = 500 }) {
      super(message); // Sets the `message` on Error
      this.name = 'ApiErrorResponse';
      this.statusCode = statusCode;
      this.status = 'error';
      this.extra = errorCode != null ? { ...extra, errorCode } : extra;
    }
  
    static create({ message, errorCode = null, extra = null, statusCode = 500 }) {
      return new ApiErrorResponse({ message, errorCode, extra, statusCode });
    }
  }
  
  export { ApiSuccessResponse, ApiErrorResponse };
  