import mongoose from "mongoose";

const ChatMessageSchema = new mongoose.Schema(
  {
    appointment_id: {
      type: String,
      required: true,
    },

    senderRole: {
      type: String,
      required: true,
    },

    senderName: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    is_prescription: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "ChatMessage",
  ChatMessageSchema
);