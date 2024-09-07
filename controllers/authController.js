import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { generateToken, hashPassword, validateEmail, validatePassword } from '../utils/Auth.js';

const register = async (req, res) => {
    const { name, email, username, password, confirmPassword ,role} = req.body;

    if (!name || !username || !password || !confirmPassword || !email) {
        return res.status(403).json({ message: 'Please enter all fields' });
    }
    if (!validateEmail(email) || !validatePassword(password)) {
        return res.status(403).json({ message: 'email or password not allowed' });
    }
    const exist = await User.findOne({
        "$or": [{ username }, { email }]
    });
    if (exist) {
        return res.status(403).json({ message: 'Username or Email already exists' });
    }
    if (password !== confirmPassword) {
        return res.status(403).json({ message: 'Passwords do not match' });
    }

    const hashedPassword = await hashPassword(password);

    try {
        await User.create({
            name,
            email,
            username,
            password: hashedPassword,
            role
        })
        res.status(201).json("user created successfully, now you can login")
    } catch (error) {
        res.status(500).json({ message: 'User register error', error });
    }
};

const login = async (req, res) => {
    const { username, password, email } = req.body;

    try {
        const user = await User.findOne({
            "$or": [{ username }, { email }]
        });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user._id);

        res.json({
            token,
            user
        });
    } catch (error) {
        res.status(500).json({ message: 'Login error' });
    }
};

export { register, login };