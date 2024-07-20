exports.successResponse = (message, data) => {
    return { success: true, message, data };
  };
  
  exports.errorResponse = (message) => {
    return { success: false, message };
  };
  