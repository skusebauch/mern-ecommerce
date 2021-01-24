import express from 'express'

const router = express.Router()

import { protect, isAdmin } from '../middleware/authMiddleware.js'

import {
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
  createProduct,
  createProductReview,
} from '../controllers/productController.js'

router.route('/').get(getProducts).post(protect, isAdmin, createProduct)
router.route('/:id/reviews').post(protect, createProductReview)
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, isAdmin, deleteProduct)
  .put(protect, isAdmin, updateProduct)

export default router
