const mongoose = require("mongoose");

const TipSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide title"],
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    description: {
      type: String,
      required: [true, "Please provide description"],
      trim: true,
      minlength: 10,
      maxlength: 1000,
    },
    language: {
      type: String,
      required: [true, "Please Provide programming language"],
      trim: true,
      set: (v) => v.toLowerCase(), // Convert to lowercase before saving
    },
    tags: {
      type: [String],
      required: [true, "Please provide a tag"],
      validate: {
        validator: function (v) {
          return Array.isArray(v) && v.length > 0;
        },
        message: "A tip must have at least one tag.",
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Tip", TipSchema);
