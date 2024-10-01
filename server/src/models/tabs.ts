import { DataTypes, Model } from "sequelize";
import { sequelize } from "./index";

class Tabs extends Model {
  public id!: number;
  public name!: string;
  public icon_name!: string;
}

Tabs.init(
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
    sequelize,
    tableName: "tabs",
  }
);

export { Tabs };
