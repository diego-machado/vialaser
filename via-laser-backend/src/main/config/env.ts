export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/vialaser',
  port: process.env.PORT || 3333,
  jwtSecret: process.env.JWT_SECRET || 'asdes89sg9bk9'
}
