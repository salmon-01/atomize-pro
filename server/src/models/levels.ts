import { Model, DataTypes } from "sequelize";
import { sequelize } from "./index";
import { Tabs } from "./tabs";

class Levels extends Model {
  public id!: number;
  public list_name!: string;
  public task_name!: string;
  public complete!: boolean;
  public color!: string;
  public level!: number;
  public tab!: number;
}

Levels.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    list_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    task_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    complete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    level: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        max: 3,
        min: 0,
      },
    },
  },
  {
    sequelize,
    tableName: "levels",
  }
);

Levels.belongsTo(Tabs, { foreignKey: "tab" });
Tabs.hasMany(Levels, { foreignKey: "tab" });

export { Levels };
