import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    DataTypes,
  } from 'sequelize'
  import db from '../config/db.config'
  
  class chosenExercise extends Model<InferAttributes<chosenExercise>, InferCreationAttributes<chosenExercise>> {
    [x: string]: any
    declare equipment: string
    declare gifUrl: string
    declare name: string
    declare target: string
  }
  chosenExercise.init(
    {
      user: {type: DataTypes.STRING},
      equipment: { type: DataTypes.STRING },
      gifUrl: { type: DataTypes.STRING },
      name: { type: DataTypes.STRING },
      target: { type: DataTypes.STRING },
    },
    { sequelize: db, freezeTableName: true, tableName: 'chosenExercises' }
  )
  
  chosenExercise.sync()
  
  export default chosenExercise
  