import mongoose from "mongoose";

const vectorSchema = new mongoose.Schema({

  chunk: {
    type: String,
    required: true,
  },

  embedding: {
    type: [Number],
    required: true,
  },

  documentName: {
    type: String,
    required: true,
  },

}, {
  timestamps: true,
});

const Vector = mongoose.model("Vector", vectorSchema);

export default Vector;