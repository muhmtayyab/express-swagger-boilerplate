import { model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

const schema = new Schema({
  _id: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  email: {
    type: String,
    unique: true
  },
  password: { type: String },
  status: {
    type: String,
    default: 'Trial',
    enum: ['Trial', 'Active', 'Cancelled']
  }
}, {
  timestamps: true
});

schema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) return next();
  user.password = bcrypt.hashSync(this.password, 10);
  return next();
});
schema.methods.validatePassword = function (candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.password);
};

const User = model('users', schema, 'users');

export default User;
