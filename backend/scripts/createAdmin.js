const mongoose = require("mongoose");
const User = require("../db/User");
const Admin = require("../db/Admin");

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/jobPortal", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

const createAdminUser = async () => {
  try {
    // Check if admin already exists
    const existingAdmin = await User.findOne({ type: "admin" });
    
    if (existingAdmin) {
      console.log("Admin user already exists!");
      mongoose.disconnect();
      return;
    }
    
    // Create a new admin user
    const adminUser = new User({
      email: "admin@jobportal.com",
      password: "admin123", // This will be hashed automatically
      type: "admin",
    });
    
    const savedUser = await adminUser.save();
    
    // Create admin profile
    const adminProfile = new Admin({
      userId: savedUser._id,
      name: "System Administrator",
      contactNumber: "+1234567890",
      role: "Super Admin",
      permissions: ["view_all_jobs", "view_all_users", "view_all_applications", "manage_users"]
    });
    
    await adminProfile.save();
    
    console.log("Admin user created successfully!");
    console.log("Email: admin@jobportal.com");
    console.log("Password: admin123");
    console.log("Please change the password after first login for security reasons.");
    
    mongoose.disconnect();
  } catch (error) {
    console.error("Error creating admin user:", error);
    mongoose.disconnect();
  }
};

createAdminUser(); 