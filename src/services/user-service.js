const { JWT_KEY } = require('../config/serverConfig');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');

const UserRepository=require('../repository/user-repository');
class UserService{

    constructor()
    {
        const userrepository=new UserRepository;
        this.userrepository=userrepository;
    }

    async create(data){
        
        try {
            const response=await this.userrepository.create(data);
            return response;
        } catch (error) {
            console.log("Somthing went wrong in the service layer");
            throw error;
        }
    }

    async destroy(id){
        try {
            const response=await this.userrepository.destroy(id);
            return response;
        } catch (error) {
            console.log("Something went wrong in the service layer");
            throw error;
        }
    }
    async signIn(email,planePassword){
        try {
            // Featch the user object from DB
            const user=await this.userrepository.getByEmail(email);
            //  compare the encrypted password with place password
            const passowrdMatch=await this.checkPassword(planePassword,user.password);

            if(!passowrdMatch){
                console.log("Password didn't match");
                throw {error:"Incorrect Password"};

            }
            //If Password match then create a token and send it to the user

            const newJwt=this.createToken({email:user.email,id:user.id});
            return newJwt;

        } catch (error) {
            console.log("Something went wrong in the service layer");
            throw error;

        }
    }

    createToken(user){
        try {
            const result=jwt.sign(user,JWT_KEY,{expiresIn:'1d'});
            return result;

        } catch (error) {
            console.log("Something went wrong in the service layer",error);
            throw error;
        }
    }

    verifyToken(token){
        try {
            const response=jwt.verify(token,JWT_KEY);
            return response;

        } catch (error) {
            console.log("Something went wrong in the token Validation",error);
            throw error
        }
    }

    checkPassword(userInputPlanePassword,encryptedPassword){
        try {
            return bcrypt.compareSync(userInputPlanePassword,encryptedPassword);
        } catch (error) {
            console.log('Something went wrong in the password comperision');
            throw error
        }
    }



}

module.exports=UserService;
