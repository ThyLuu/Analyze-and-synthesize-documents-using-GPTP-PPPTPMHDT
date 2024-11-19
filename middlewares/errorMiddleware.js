const errorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    // Mongoose CastError
    if (err.name === 'CastError') {
        const message = 'Resource not found';
        error = new errorResponse(message, 404);
    }

    // Mongoose Duplicate Key Error
    if (err.code === 11000) {
        const message = 'Duplicate field value entered';
        error = new errorResponse(message, 400);
    }

    // Mongoose Validation Error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message).join(', ');
        error = new errorResponse(message, 400);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    });
};

module.exports = errorHandler;
