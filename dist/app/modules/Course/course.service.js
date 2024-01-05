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
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {}
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p]
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]]
      }
    return t
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.CourseService = void 0
const AppError_1 = __importDefault(require('../../error/AppError'))
const category_model_1 = require('../Category/category.model')
const review_model_1 = require('../Review/review.model')
const course_model_1 = require('./course.model')
const createCourseIntoDB = (payload, id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // console.log(payload.categoryID)
    const checkIfCategoryExists = yield category_model_1.Category.findOne({
      _id: payload.categoryID,
    })
    if (!checkIfCategoryExists) {
      throw new AppError_1.default(404, 'Category not found')
    }
    const result = yield course_model_1.Course.create(
      Object.assign(Object.assign({}, payload), { createdBy: id }),
    )
    return result
  })
const getAllCoursesFromDB = (query) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const limit = query.limit ? parseInt(query.limit) : 2
    const page = query.page ? parseInt(query.page) : 1
    const sortBy = query.sort ? query.sort : 'name'
    const sortOrder = query.order ? query.order : 'asc'
    const tags = query.tags ? query.tags : ''
    const sortCriteria = {}
    sortCriteria[sortBy] = sortOrder
    const result = yield course_model_1.Course.find()
      .limit(limit)
      .skip(limit * (page - 1))
      .sort(sortCriteria)
      .find({ 'tags.name': { $regex: tags, $options: 'i' } })
      .populate('tags.name')
    return result
  })
const getSingleCourseByIDFromDB = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.Course.findById(id).populate([
      {
        path: 'tags.name',
        select: 'name isDeleted',
      },
      {
        path: 'createdBy',
        select: '_id username email role',
      },
    ])
    const reviews = yield review_model_1.Review.aggregate([
      {
        $match: {
          productID: result === null || result === void 0 ? void 0 : result._id,
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'createdBy',
          foreignField: '_id',
          as: 'createdBy',
        },
      },
      {
        $unwind: '$createdBy',
      },
      {
        $project: {
          _id: 1,
          review: 1,
          rating: 1,
          productID: 1,
          'createdBy._id': 1,
          'createdBy.username': 1,
          'createdBy.email': 1,
          'createdBy.role': 1,
        },
      },
    ])
    return Object.assign(
      Object.assign(
        {},
        result === null || result === void 0 ? void 0 : result.toObject(),
      ),
      { reviews },
    )
  })
const getBestCourseByRatingFromDB = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const review = yield review_model_1.Review.aggregate([
      {
        $group: {
          _id: '$productID',
          averageRating: { $avg: '$rating' },
          reviewCount: { $sum: 1 },
        },
      },
      {
        $sort: { averageRating: -1 },
      },
      {
        $limit: 1,
      },
    ])
    const course = yield course_model_1.Course.findById(review[0]._id).populate(
      [
        {
          path: 'tags.name',
          select: 'name isDeleted',
        },
        {
          path: 'createdBy',
          select: '_id username email role',
        },
      ],
    )
    return {
      course,
      averageRating: review[0].averageRating,
      reviewCount: review[0].reviewCount,
    }
  })
const updateCourseByIDFromDB = (id, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { tags, details } = payload,
      restPayload = __rest(payload, ['tags', 'details'])
    const modifiedData = Object.assign({}, restPayload)
    if (details && Object.keys(details).length) {
      for (const [key, value] of Object.entries(details)) {
        modifiedData[`details.${key}`] = value
      }
    }
    const updateCourseInfo = yield course_model_1.Course.findByIdAndUpdate(
      id,
      modifiedData,
      {
        new: true,
        runValidators: true,
      },
    )
    if (tags && tags.length > 0) {
      const deletedTags = tags
        .filter((tag) => tag.isDeleted === true)
        .map((tag) => (tag === null || tag === void 0 ? void 0 : tag.name))
      const deletedTagsOfCourse = yield course_model_1.Course.findByIdAndUpdate(
        id,
        {
          $pull: { tags: { name: { $in: deletedTags } } },
        },
      )
      const newTags =
        tags === null || tags === void 0
          ? void 0
          : tags.filter((tag) => tag.isDeleted === false)
      const newTagsOfCourse = yield course_model_1.Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { tags: { $each: newTags } },
        },
      )
    }
    const result = yield course_model_1.Course.findById(id).populate(
      'tags.name createdBy',
    )
    return result
  })
exports.CourseService = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCourseByIDFromDB,
  updateCourseByIDFromDB,
  getBestCourseByRatingFromDB,
}
