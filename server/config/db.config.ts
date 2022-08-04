import * as dotenv from 'dotenv'
dotenv.config()
import { Sequelize } from 'sequelize'
const DIALECT = 'postgres'

const db = new Sequelize(process.env.DATABASE_URL, {
  dialect: DIALECT,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
})
export default db
