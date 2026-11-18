import mongoose from "mongoose";

// Sprint-8: Schema'da required, trim, timestamps ve en az bir kısıt (min, max, minlength) bulunmalıdır.
const eventSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: [true, "id alanı zorunludur"],
      unique: true,
      trim: true
    },
    title: {
      type: String,
      required: [true, "title alanı zorunludur"],
      trim: true,
      minlength: [3, "Başlık en az 3 karakter olmalıdır"] // Kısıt 1
    },
    category: {
      type: String,
      required: [true, "category alanı zorunludur"],
      trim: true
    },
    capacity: {
      type: Number,
      default: 0,
      min: [0, "Kapasite 0'dan küçük olamaz"], // Kısıt 2
      max: [10000, "Kapasite 10000'den büyük olamaz"] // Kısıt 3
    },
    date: {
      type: String,
      required: [true, "date alanı zorunludur"],
      trim: true
    },
    time: {
      type: String,
      default: "",
      trim: true
    },
    location: {
      type: String,
      default: "",
      trim: true
    },
    description: {
      type: String,
      default: "",
      trim: true
    }
  },
  {
    timestamps: true, // timestamps kuralı
    toJSON: {
      transform: (doc, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    },
    toObject: {
      transform: (doc, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    }
  }
);

export const Event = mongoose.models.Event || mongoose.model("Event", eventSchema, "events");
export default Event;
