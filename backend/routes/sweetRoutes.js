import express from "express";
import {
  addSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet,
  showSweet,
} from "../controllers/sweetController.js";

const sweetRouter = express.Router();

sweetRouter.post("/create", addSweet);
sweetRouter.delete("/delete/:id", deleteSweet);
sweetRouter.get("/view", showSweet);
sweetRouter.put("/purchase/:id", purchaseSweet);
sweetRouter.put("/restock/:id", restockSweet);

export default sweetRouter;
