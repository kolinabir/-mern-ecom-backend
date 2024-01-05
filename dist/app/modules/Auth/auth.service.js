"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const user_model_1 = require("../User/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    //check if user exists in database
    const userExists = yield user_model_1.User.isUserExistsByUserName(payload === null || payload === void 0 ? void 0 : payload.username);
    if (!userExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This User not found');
    }
    if (!(yield user_model_1.User.isPasswordMatch(payload === null || payload === void 0 ? void 0 : payload.password, userExists === null || userExists === void 0 ? void 0 : userExists.password))) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'Password is not correct');
    }
    const token = jsonwebtoken_1.default.sign({
        _id: userExists._id,
        email: userExists.email,
        role: userExists.role,
        iat: Date.now(),
    }, config_1.default.jwt_secret, {
        expiresIn: '1h',
    });
    const _a = userExists.toObject(), { password, createdAt, updatedAt, __v } = _a, user = __rest(_a, ["password", "createdAt", "updatedAt", "__v"]);
    return {
        user: user,
        token,
    };
});
const changePasswordToServer = (user, passwordData) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
    const userExists = yield user_model_1.User.findById(user._id).select('+password');
    if (!userExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This User not found');
    }
    if (!(yield user_model_1.User.isPasswordMatch(passwordData.oldPassword, userExists === null || userExists === void 0 ? void 0 : userExists.password))) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'Password change failed');
    }
    const newHashedPassword = yield bcrypt_1.default.hash(passwordData.newPassword, Number(config_1.default.bcrypt_salt_rounds));
    const passWordList = yield user_model_1.PassWords.find({ userId: user._id });
    if (passWordList[0].previous1 && passWordList[0].previous2) {
        const comparePrevious2 = yield bcrypt_1.default.compare(passwordData.newPassword, (_b = passWordList[0]) === null || _b === void 0 ? void 0 : _b.previous2);
        const comparePrevious1 = yield bcrypt_1.default.compare(passwordData.newPassword, (_c = passWordList[0]) === null || _c === void 0 ? void 0 : _c.previous1);
        if (comparePrevious1 || comparePrevious2) {
            throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'Password change failed ! password cannot be the same any of the previous two passwords');
        }
    }
    if (passWordList[0].previous1 && !passWordList[0].previous2) {
        const comparePrevious1 = yield bcrypt_1.default.compare(passwordData.newPassword, (_d = passWordList[0]) === null || _d === void 0 ? void 0 : _d.previous1);
        if (comparePrevious1) {
            throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'Password change failed ! password cannot be the same as the previous two password');
        }
    }
    if (!((_e = passWordList[0]) === null || _e === void 0 ? void 0 : _e.previous1) && ((_f = passWordList[0]) === null || _f === void 0 ? void 0 : _f.previous2)) {
        const comparePrevious2 = yield bcrypt_1.default.compare(passwordData.newPassword, (_g = passWordList[0]) === null || _g === void 0 ? void 0 : _g.previous2);
        if (comparePrevious2) {
            throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'Password change failed does not match previous passwords');
        }
    }
    const result = yield user_model_1.User.findOneAndUpdate({
        _id: user._id,
        role: user.role,
    }, {
        password: newHashedPassword,
    }, {
        new: true,
    });
    //update password list
    if (!((_h = passWordList[0]) === null || _h === void 0 ? void 0 : _h.previous1) && !((_j = passWordList[0]) === null || _j === void 0 ? void 0 : _j.previous2)) {
        yield user_model_1.PassWords.findOneAndUpdate({ userId: user._id }, {
            previous1: userExists.password,
            current: newHashedPassword,
        });
    }
    if (((_k = passWordList[0]) === null || _k === void 0 ? void 0 : _k.previous1) && !((_l = passWordList[0]) === null || _l === void 0 ? void 0 : _l.previous2)) {
        yield user_model_1.PassWords.findOneAndUpdate({ userId: user._id }, {
            previous2: (_m = passWordList[0]) === null || _m === void 0 ? void 0 : _m.previous1,
            previous1: userExists.password,
            current: newHashedPassword,
        });
    }
    if (((_o = passWordList[0]) === null || _o === void 0 ? void 0 : _o.previous1) && ((_p = passWordList[0]) === null || _p === void 0 ? void 0 : _p.previous2)) {
        yield user_model_1.PassWords.findOneAndUpdate({ userId: user._id }, {
            previous2: (_q = passWordList[0]) === null || _q === void 0 ? void 0 : _q.previous1,
            previous1: userExists.password,
            current: newHashedPassword,
        });
    }
    const userRes = yield user_model_1.User.findById(user._id).select('-__v');
    return userRes;
});
exports.AuthServices = {
    loginUser,
    changePasswordToServer,
};
