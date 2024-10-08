// Importing Mongoose
const mongoose = require('mongoose');
const { Schema } = mongoose;

// 1. User Schema
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], required: true },
  profilePhoto: { type: String }, // URL of the user's profile photo
  purchasedCourses: [{ type: Schema.Types.ObjectId, ref: 'Course' }], // List of purchased courses
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// 2. Course Schema
const courseSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  courseImage: { type: String }, // URL to the course image
  videos: [{ videoUrl: { type: String } }], // List of videos for the course
  creator: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Admin who created the course
  studentsEnrolled: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Users who enrolled in this course
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// 3. Purchase Schema (for tracking course purchases by users)
const purchaseSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  purchaseDate: { type: Date, default: Date.now }
});

// 4. Photo Schema (for storing photos, possibly for users or courses)
const photoSchema = new Schema({
  url: { type: String, required: true }, // URL to the stored photo
  uploadedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Who uploaded the photo
  description: { type: String },
  course: { type: Schema.Types.ObjectId, ref: 'Course' }, // Optional reference to a course
  uploadedAt: { type: Date, default: Date.now }
});

// 5. Likes Schema (for tracking likes on photos or courses)
const likeSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  targetType: { type: String, enum: ['Photo', 'Course'], required: true }, // Whether it's a photo or course being liked
  targetId: { type: Schema.Types.ObjectId, required: true }, // ID of the target (photo or course)
  likedAt: { type: Date, default: Date.now }
});

// Compiling Models
const User = mongoose.model('User', userSchema);
const Course = mongoose.model('Course', courseSchema);
const Purchase = mongoose.model('Purchase', purchaseSchema);
const Photo = mongoose.model('Photo', photoSchema);
const Like = mongoose.model('Like', likeSchema);

// Exporting the models
module.exports = {
  User,
  Course,
  Purchase,
  Photo,
  Like
};
