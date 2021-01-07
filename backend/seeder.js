import mongoose from 'mongoose'
import dotenv from 'dotenv'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()
    console.log('cleared Database ✅')

    console.log('insert Users...')

    const createdUsers = await User.insertMany(users)
    console.log('created Users ✅')
    // assign admin user to each product
    const adminUser = createdUsers[0]._id
    const sampleProducts = products.map(p => {
      return { ...p, user: adminUser }
    })
    console.log('inser Products...')
    await Product.insertMany(sampleProducts)
    console.log('created Products ✅')
    console.log('all Datas Imported 🚀🍾🎉 ✅')
    process.exit()
  } catch (error) {
    console.error(`oh no -> ${error}`)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()
    console.log('cleared Database 🧨✅')
    process.exit()
  } catch (error) {
    console.error(`oh no -> ${error}`)
    process.exit(1)
  }
}

process.argv[2] === '-d' ? destroyData() : importData()
