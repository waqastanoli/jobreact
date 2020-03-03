import express from "express";
import productController from "../controllers/position_controller";
const router = express.Router();

//=============== BASE CALLS
router
  .route("/create")
  // POST
  .post(productController.create);

router
  .route("/list") // GET
  .get(productController.getAll);

export default router;
