// to encrypt password
import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@gmail.com',
    // hash encrypt
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Sven Kusebauch',
    email: 'sven@gmail.com',
    // hash encrypt
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Leon Mooy',
    email: 'leon@gmail.com',
    // hash encrypt
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users
