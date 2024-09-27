import express from "express";
import cors from "cors";
import { sequelize } from "./src/models/index";
import "module-alias/register";
import dotenv from "dotenv";
import tabsRoutes from "./src/routes/tabsRoutes";
import simpleListRoutes from "./src/routes/simpleListRoutes";
import progressBarRoutes from "./src/routes/progressBarRoutes";
import levelsRoutes from "./src/routes/levelsRoutes";
import setsRoutes from './src/routes/setsRoutes'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/tabs", tabsRoutes);
app.use("/api/simplelists", simpleListRoutes);
app.use("/api/progressbars", progressBarRoutes);
app.use("/api/levels", levelsRoutes);
app.use('/api/sets', setsRoutes);

(async function bootstrap() {
  try {
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`🚀 The server is running and listening on port ${PORT}!`);
    });
  } catch (err) {
    console.error(`😞 Something went wrong connecting to the server! ${err}`);
  }
})();
