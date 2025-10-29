import { Schema, model } from "mongoose";

const PhoneSchmea = new Schema({ // most optimal way for defining Objects inside Objects
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
  phone: {type: [PhoneSchmea], null: true}
}, {
  collection: "users",
  timestamps: true
});

export default model("User", UserSchema);