'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.ReviewService = void 0
const AppError_1 = __importDefault(require('../../error/AppError'))
const course_model_1 = require('../Course/course.model')
const review_model_1 = require('./review.model')
const createReviewIntoDB = (payload, _id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const checkIfCategoryExists = yield course_model_1.Course.findOne({
      _id: payload.productID,
    })
    if (!checkIfCategoryExists) {
      throw new AppError_1.default(404, 'Course not found')
    }
    const result = yield review_model_1.Review.create(
      Object.assign(Object.assign({}, payload), { createdBy: _id }),
    )
    return result
  })
const getAllReviewsFromDB = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_model_1.Review.find().populate('productID')
    return result
  })
exports.ReviewService = {
  createReviewIntoDB,
  getAllReviewsFromDB,
}
