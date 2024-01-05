'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.Review = void 0
const mongoose_1 = require('mongoose')
const reviewSchema = new mongoose_1.Schema({
  productID: {
    type: mongoose_1.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose_1.Schema.Types.ObjectId,
    ref: 'User',
  },
})
exports.Review = (0, mongoose_1.model)('Review', reviewSchema)
