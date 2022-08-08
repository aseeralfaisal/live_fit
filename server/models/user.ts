import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
} from 'sequelize'
import db from '../config/db.config'

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  [x: string]: any
  declare user: string
  declare pass: string
}
User.init(
  {
    user: { type: DataTypes.STRING, primaryKey: true },
    pass: { type: DataTypes.STRING },
  },
  { sequelize: db, freezeTableName: true, tableName: 'users' }
)

db.sync({ force: true })

export default User
