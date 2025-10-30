import { Schema, model, Document } from "mongoose";

export interface IPhone {type: String; number: String}

export interface IUser extends Document {
  username: string;
  password: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  address?: {
    area?: string;
    street?: string;
    number?: string;
    po?: string;
    municipality?: string;
  },
    phone?: IPhone[];
}

const PhoneSchema = new Schema({ // most optimal way for defining Objects inside Objects
  type: String, 
  number: String
});
// {_id: false}) // for no new id

const UserSchema = new Schema({
  username: { type: String, required: [true, "Username is required"], unique: true,
    max: 15, min: 4, trim: true, lowercase: true },
  password: { type: String, required: true },
  firstname: String,
  lastname: { type: String },
  email: { type: String, index: true},
  address: {
    area: String,
    street: String,
    number: String,
    po: String,
    municipality: String
  },
  phone: {type: [PhoneSchema], null: true}
}, {
  collection: "users",
  timestamps: true
});

export default model("User", UserSchema);