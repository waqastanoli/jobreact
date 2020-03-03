import mongoose from "mongoose";
const Schema = mongoose.Schema;

const orderSchema = mongoose.Schema(
  {
    title: String,
    department: String,
    number: String,
    description: String,
    status: String,
    createDate: String
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_At" }
  }
);

export default mongoose.model("Position", orderSchema);
