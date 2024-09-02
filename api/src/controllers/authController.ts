import User from '../models/User';
import crypto from 'crypto-js';

export const validationUser = async (username: string, password: string) => {
    const validatedUser = await User.findOne({ username });

    if (!validatedUser) {
      throw new Error('Invalid username')
    }

    const userPassword = crypto.SHA256(password).toString();

    let PasswordsMatched = userPassword === validatedUser.password;

    if (!PasswordsMatched) {
      throw new Error('Invalid password');
    }

    return validatedUser;
}

export const signUp = async (username: string, password: string) => {
    let encryptedPassword = crypto.SHA256(password).toString();
    const newUser = new User({username, password: encryptedPassword});
    await newUser.save();
    return newUser;
}