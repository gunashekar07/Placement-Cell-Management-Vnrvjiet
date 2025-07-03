const mongoose = require("mongoose");

let schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      validate: {
        validator: function (v) {
          return v !== "" ? /\+\d{1,3}\d{10}/.test(v) : true;
        },
        msg: "Phone number is invalid!",
      },
    },
    role: {
      type: String,
      default: "System Administrator",
    },
    permissions: {
      type: [String],
      default: ["view_all_jobs", "view_all_users", "view_all_applications", "manage_users"]
    }
  },
  { collation: { locale: "en" } }
);

module.exports = mongoose.model("AdminInfo", schema); 