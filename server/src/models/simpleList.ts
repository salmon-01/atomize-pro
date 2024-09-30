import { Model, DataTypes } from "sequelize";
import { sequelize } from "./index";
import { Tabs } from "./tabs";

class SimpleList extends Model {
  public id!: number;
  public list_name!: string;
  public task_name!: string;
  public complete!: boolean;
  public tab!: number;
  public color?: string;
}

SimpleList.init(
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
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Simple List",
    },
  },
  {
    sequelize,
    tableName: "simplelists",
  }
);

SimpleList.belongsTo(Tabs, { foreignKey: "tab" });
Tabs.hasMany(SimpleList, { foreignKey: "tab" });

export { SimpleList };