// backend/middleware/catchAsyncError.js
const catchAsyncError = (theFunc) => (req, res, next) => {
    Promise.resolve(theFunc(req, res, next)).catch(next);
};

export default catchAsyncError;
