import { Model, DataTypes } from "sequelize";
import { sequelize } from "./index";
import { Tabs } from "./tabs";

class ProgressBar extends Model {
  public id!: number;
  public list_name!: string;
  public task_name!: string;
  public complete!: boolean;
  public goal_number!: number;
  public current_number!: number;
  public units!: string;
  public tab!: number;
}

ProgressBar.init(
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
    goal_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    current_number: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    units: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Progress Bar",
    },
  },
  {
    sequelize,
    tableName: "progressbars",
  }
);

ProgressBar.belongsTo(Tabs, { foreignKey: "tab" });
Tabs.hasMany(ProgressBar, { foreignKey: "tab" });

export { ProgressBar };
