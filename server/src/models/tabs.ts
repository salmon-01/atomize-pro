import { DataTypes } from "sequelize";
import { sequelize } from "./index";

export const Tabs = sequelize.define(
  "Tab",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    icon_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "tabs",
  }
);
