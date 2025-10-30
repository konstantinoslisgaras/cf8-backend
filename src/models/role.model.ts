import { Schema, model, Document } from "mongoose";

export interface IRole extends Document {
  role: String,
  description?: String,
  active: boolean;
}

const RoleSchema = new Schema<IRole>({
  role: { type: String, required: true, unique: true },
  description: { type: String },
  active: { type: Boolean, default: true }
}, {
  collection: "roles",
  timestamps: true
});

export default model<IRole>("Role", RoleSchema) // alias