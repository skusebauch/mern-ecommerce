import express from 'express'

const router = express.Router()

import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
} from '../controllers/orderController.js'
import protect from '../middleware/authMiddleware.js'

router.route('/').post(protect, addOrderItems)
// make sure to make :id at the bottom same as rails
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)

export default router
