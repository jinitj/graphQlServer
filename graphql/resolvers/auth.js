const bcrypt = require('bcryptjs');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');
 
 module.exports = {
    createUser: async (args) => {
        try{
            const checkIfEmailExists = await User.findOne({email: args.userInput.email});
            if(checkIfEmailExists){
                throw new Error('Email Already Used');
            }
            const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
            const newUser = new User({
                email: args.userInput.email,
                password: hashedPassword
            })
            const newUSerResult = await newUser.save();
            return {...newUSerResult._doc, password: null};;
        }catch(err){
            console.log(err);
            return err;
        }
    },

    login: async (args) => {
        try {
            const currentUser = await User.findOne({email: args.email});
            if(!currentUser){
                throw new Error('User does not exist');
            }
            const isValidPassword = await bcrypt.compare(args.password, currentUser.password);
            if(!isValidPassword){
                throw new Error('Password incorrect');
            }
            const token = jwt.sign({userId: currentUser.id, email: currentUser.email}, process.env.MY_JWT_KEY,{
                expiresIn: '1h'
            });
            return {userId: currentUser.id, token: token, tokenExpiration: 1};
        } catch (error) {
            console.log(error);
            return error
        }
        
    }
}