import User from '../models/user.js'
import bcrypt from 'bcrypt';

const registerUser = async(req, res) => {
    try {
        const {email, name, password} = req.body

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

        //sent email
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

export {registerUser, loginUser};