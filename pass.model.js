const { Schema, model } = require('mongoose');

const testSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model('PassData', testSchema);
