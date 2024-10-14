import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const signup = async (req, res) => {
    const { name, email, password, age, gender, genderPreference } = req.body;
    try {
        if (
            !name ||
            !email ||
            !password ||
            !age ||
            !gender ||
            !genderPreference
        ) {
            return res
                .status(400)
                .json({ success: false, message: 'Please fill in all fields' });
        }

        if (age < 18) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: 'You must be 18 years or older to use this app',
                });
        }

        if (password.length < 6) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: 'Password must be at least 6 characters long',
                });
        }

        //check if user exists already
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: 'User with this email already exists',
                });
        }

        //hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            age,
            gender,
            genderPreference,
        });

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });

        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            httpOnly: true, // prevent XSS attacks
            sameSite: "strict", //prevent CSRF attacks
            secure: process.env.NODE_ENV === "production" ? true : false, // cookie only works in https in production
        });

        res.status(201).json({
            success: true,
            user: newUser,
        });

    } catch (error) {
        console.log('Error in authController.signup: ', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

export const login = async (req, res) => {

    const { email, password } = req.body;

    try {

        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: 'Please fill in all fields',
            });
        }

        const user = await User.findOne({ email });

        if(user) {
            const passwordMatch = await bcryptjs.compare(password, user.password);

            if(passwordMatch){
                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                    expiresIn: '7d',
                });

                res.cookie("jwt", token, {
                    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
                    httpOnly: true, // prevent XSS attacks
                    sameSite: "strict", //prevent CSRF attacks
                    secure: process.env.NODE_ENV === "production" ? true : false, // cookie only works in https in production
                });

                res.status(201).json({
                    success: true,
                    user: user,
                });

            } else {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid credentials',
                });
            }
        }
        
    } catch (error) {
        console.log('Error in authController.login: ', error);
        res.status(401).json({
            success: false,
            message: 'No user found with this email',
        });
    }
};

export const logout = async (req, res) => {
    res.clearCookie("jwt", '', { httpOnly: true, expires: new Date(0) });
    res.status(200).json({
        success: true,
        message: 'Logged out successfully',
    });
};
