import User from '../models/user.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Verification from '../models/verification.js';
import { sendEmail } from '../libs/send-email.js';
import aj from '../libs/arcjet.js';

const registerUser = async(req, res) => {
    try {
        const {email, name, password} = req.body

        const decision = await aj.protect(req, { email: email });
        console.log("Arcjet decision", decision);

        if (decision.isDenied()) {
            res.writeHead(403, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Invalid email address" }));
        }

        const existingUser = await User.findOne({email});

        if (existingUser) {
            res.status(400).json('user already exists');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            email: email,
            password: hashedPassword,
            name: name
        });

        const verificationToken = jwt.sign(
            {userId: user._id, property: "email-verification"},
            process.env.JWT_SECRET,
            {expiresIn: "1h"}
        );

        await Verification.create({
            userId: user._id,
            token: verificationToken,
            expiresAt: new Date(Date.now() + 1 * 60 * 60 * 1000)
        });

        //send email
        const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;
        const emailBody = `<p>Hello, ${user.name}<br/>, please click <a href="${verificationLink}">here</a> to verify your email</p>`;
        const emailSubject = 'Verify your email';
        
        const isEmailSent = await sendEmail(email, emailSubject, emailBody);

        if (!isEmailSent) {
            return res.status(500).json({
                message: 'Failed to send verification email'
            });
        }

        res.status(201).json({message: 'Verification email sent to your email, please check to activate your account'});
    } catch(err) {
        console.log(err)
        res.status(500).json({message: 'something went wrong'});
    }
}

const loginUser = async(req, res) => {
    try {

    } catch(err) {
        console.log(err)
        res.status(500).json({message: 'something went wrong'});
    }
}

const verifyEmail = async(req, res) => {
    try {
        const {token} = req.body;

        const payload = jwt.verify(token, process.env.JWT_SECRET)

        if (!payload) {
            return res.status(401).json({message: 'Unauthorized'})
        }

        const {userId, property} = payload;

        if (property !== 'email-verification') {
            return res.status(401).json({message: 'Unauthorized'})
        }

        
    } catch(e) {
        console.log(e);
        res.status(500).json({message: 'Internal server error'})
    }
}

export {registerUser, loginUser};