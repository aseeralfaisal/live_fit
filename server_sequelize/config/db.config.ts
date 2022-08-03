import * as dotenv from 'dotenv'
dotenv.config()
import { Sequelize } from 'sequelize'
const DB_PORT = process.env.DB_PORT as unknown as number
const DIALECT = 'postgres'
const DB_PASS = process.env.DB_PASS
const HOST_NAME = process.env.HOST_NAME
const DB_NAME = process.env.DB_NAME
const DB_USER_NAME = process.env.DB_USER_NAME

const db = new Sequelize(DB_NAME, DB_USER_NAME, DB_PASS, {
    host: HOST_NAME,
    port: DB_PORT,
    dialect: DIALECT
})

export default db
