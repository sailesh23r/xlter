import mongoose from "mongoose";

const TestimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  text: { type: String, required: true },
  avatar: { type: String, required: true }, // URL to image
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Testimonial || mongoose.model("Testimonial", TestimonialSchema);
