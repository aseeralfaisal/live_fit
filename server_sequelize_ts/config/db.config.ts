import { Sequelize } from 'sequelize'

const DB_PORT = process.env.DB_PORT as unknown as number
const DIALECT = 'postgres'

const db = new Sequelize('postgres', 'postgres', '1234', {
    host: 'localhost',
    port: DB_PORT,
    dialect: DIALECT
})

export default db
