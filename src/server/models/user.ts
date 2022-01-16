import { Schema, model } from 'mongoose';

interface User {
  login: string;
  password: string;
}

const userSchema = new Schema<User>({
  login: {
    type: "String",
    required: true,
  },
  password: {
    type: "String",
    required: true,
  },
});

export default model('User', userSchema);
