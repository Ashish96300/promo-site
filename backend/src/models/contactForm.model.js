import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true
    },
    mobileNumber: {
      type: String,
      required: true,
      trim: true
    },
     city: {
      type: String,
      required: true,
      trim: true
    },
  },
  { timestamps: true }
);

export const Contact = mongoose.model("Contact", contactSchema);
