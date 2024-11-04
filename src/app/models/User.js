import mongoose from 'mongoose';

mongoose.connect(`${process.env.MONGODBURL}`)

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
