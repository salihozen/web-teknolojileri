import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      required: true,
      trim: true
    },
    capacity: {
      type: Number,
      default: 0,
      min: 0
    },
    date: {
      type: String,
      required: true
    },
    time: {
      type: String,
      default: ""
    },
    location: {
      type: String,
      default: ""
    },
    description: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.__v;
        return ret;
      }
    }
  }
);

export const Event = mongoose.models.Event || mongoose.model("Event", eventSchema, "events");
export default Event;
