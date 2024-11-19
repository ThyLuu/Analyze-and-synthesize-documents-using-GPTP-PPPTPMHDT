const errorHandler = require('../middlewares/errorMiddleware');
const userModel = require('../models/userModel');
const ErrorResponse = require('../utils/errorResponse'); 

exports.sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken(res);
    res.status(statusCode).json({
        success: true,
        token,
    });
}

// Register
exports.registerController = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        // Kiểm tra email đã tồn tại chưa
        const existingEmail = await userModel.findOne({ email });
        if (existingEmail) {
            return next(new ErrorResponse('Email đã được đăng ký', 400));
        }

        const user = await userModel.create({ username, email, password });
        return exports.sendToken(user, 201, res);
    } catch (error) {
        console.log(error);
        next(new ErrorResponse('Lỗi máy chủ', 500));
    }
};


// Login
exports.loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Kiểm tra đủ thông tin
        if (!email || !password) {
            return next(new ErrorResponse('Vui lòng nhập email và mật khẩu', 400));
        }

        // Tìm người dùng bằng email
        const user = await userModel.findOne({ email }).select('+password');
        if (!user) {
            return next(new ErrorResponse('Sai thông tin đăng nhập', 401));
        }

        // Kiểm tra mật khẩu
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return next(new ErrorResponse('Sai thông tin đăng nhập', 401));
        }

        return exports.sendToken(user, 200, res);
    } catch (error) {
        console.log(error);
        next(new ErrorResponse('Lỗi máy chủ', 500));
    }
};

// Logout
exports.logoutController = async (req, res) => {
    res.clearCookie('refreshToken');
    return res.status(200).json({
        success: true,
        message: 'Đăng xuất thành công'
    });
};
