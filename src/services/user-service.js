const { JWT_KEY } = require('../config/serverConfig');
const jwt=require('jsonwebtoken');
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



}

module.exports=UserService;
