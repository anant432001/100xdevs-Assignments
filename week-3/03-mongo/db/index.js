const mongoose = require('mongoose');
const uri = "mongodb+srv://admin:admin%40123@cluster0.8wnnoy6.mongodb.net/myLatestDataBase"
// Connect to MongoDB
mongoose.connect('mongodb+srv://admin:admin%40123@cluster0.8wnnoy6.mongodb.net/');

// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}