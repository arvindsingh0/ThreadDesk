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
  tenantKey: {
  type: String,
  required: true,
  }, 
  uploadedBy: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true,
},
tenantKey: {
  type: String,
  required: true,
  index: true,
}

}, {
  timestamps: true,
});

const Vector = mongoose.model("Vector", vectorSchema);

export default Vector;