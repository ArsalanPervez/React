import mongoose from "mongoose";
import Users from "../models/user.models.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const generateAccessToken = (user) => {
    return jwt.sign({ email: user.email, id: user._id }, process.env.ACCESS_JWT_SECRET, {
        expiresIn: "6h",
    });
};
const generateRefreshToken = (user) => {
    return jwt.sign({ email: user.email, id: user._id }, process.env.REFRESH_JWT_SECRET, {
        expiresIn: "7d",
    });
};


const addUser = async (req , res) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName) return res.status(401).json({ message: "First Name is required" })
    if (!lastName) return res.status(401).json({ message: "Last Name is required" })
    if (!email) return res.status(401).json({ message: "email is required" })
    if (!password) return res.status(401).json({ message: "password is required" })

    try {
        const user = await Users.findOne({ email })
        if (user) return res.status(400).json({ message: "User already exist" })

        const createUser = await Users.create({ firstName, lastName, email, password });

        res.json({
            status: 201, 
            message: "User registered successfully", 
        })
    } catch (error) {
        res.status(500).json({
            message: "internal server error"
        })
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body

    if (!email) return res.status(400).json({ message: "Email is required" });
    if (!password) return res.status(400).json({ message: "Password is required" });

    const user = await Users.findOne({ email })
    if (!user) return res.status(400).json({ message: "User is not registered" })

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: "incorrect password" });

    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)

    res.cookie("refreshToken", refreshToken, { http: true, secure: false });

    res.json({
        message: "User logged in successfully",
        userData: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            user_id: user._id,
            accessToken,
            refreshToken,
        },
       
        
    })
}

const getAllUser = async (req , res) => {
    try {

        const todos = await Users.find();
        res.status(200).json({
            message: "Todos fetched successfully",
            todos,
        });
    } catch (err) {
        console.error('Error fetching todos:', err);
        res.status(500).json({
            message: "Server error",
            error: err.message,
        });
    }
}

const deleteUser = async (req , res) => {
    const {id} = req.params;
    // Class code
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            message: "Not a valid Id",
        })
    }
    // Class code end

    try {
        const user = await Users.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.status(200).json({
            message: "User deleted successfully",
        });
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).json({
            message: "Server error",
            error: err.message,
        });
    }
}
const editUser = async (req , res) => {
    const {id} = req.params;
    const { firstName, lastName, email, password } = req.body;

    // Class code
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            message: "Not a valid Id",
        })
    }
    // Class code end

    if (!firstName) return res.status(401).json({ message: "First Name is required" })
    if (!lastName) return res.status(401).json({ message: "Last Name is required" })
    if (!email) return res.status(401).json({ message: "email is required" })
    if (!password) return res.status(401).json({ message: "password is required" })

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await Users.findByIdAndUpdate(
            id,
            { firstName, lastName, email, password: hashedPassword },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.status(200).json({
            message: "User updated successfully",
            userData: {
                firstName: user.firstName,
                lastName: user.lastName,
            },
        });
    } catch (err) {
        console.error('Error editing user:', err);
        res.status(500).json({
            message: "Server error",
            error: err.message,
        });
    }
}


const logoutUser = async (req, res) => {
    res.clearCookie("refreshToken");
    res.json({ message: "user logout successfully" });
}

const regenerateAccessToken = async (req, res) => {
    // cookies sa refresh token pakarlo
    const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
    if (!refreshToken)
        return res.status(401).json({ message: "no refresh token found!" });
    // jwt sa check krwao token sahi ha ya nahi
    try {
        const decodedToken = jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET);


        const user = await Users.findOne({ email: decodedToken.email });

        if (!user) return res.status(404).json({ message: "invalid token" });

        const generateToken = generateAccessToken(user);
        res.json({ message: "access token generated", accesstoken: generateToken });
    } catch (error) {
        res.status(500).json({
            error: 'error occured'
        })
    }

}


export {addUser, getAllUser, deleteUser, editUser, loginUser, logoutUser, regenerateAccessToken}