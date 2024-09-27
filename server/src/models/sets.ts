import { DataTypes, Model } from "sequelize";
import { sequelize } from "./index";
import { Tabs } from "./tabs";

class Sets extends Model {
  public id!: number;
  public list_name!: string;
  public task_name!: string;
  public complete!: boolean;
  public color!: string;
  public completed_sets!: number;
  public sets!: number;
  public reps!: number;
  public tab!: number;
}

Sets.init(
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
    completed_sets: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    sets: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reps: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "sets",
  }
);

Sets.belongsTo(Tabs, { foreignKey: "tab" });
Tabs.hasMany(Sets, { foreignKey: "tab" });

export { Sets };
