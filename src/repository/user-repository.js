const { response } = require('express');
const {User}=require('../models/index')

class UserRepository{

    async create(data){
        try {
            const response=await User.create(data);
            return response;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw error;
        }
    }

    async destroy(id){
        try {
            const response=await User.destroy({
                where:id
            })
            return true;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw error;
        }
    }

    async getById(id){
        try {
            const response=await User.findByPk(id,{
                attributes:['email','id']
            })

            return response;


            /*
                attributes:['email','id'] this is similar to select email,id from User 
                without this we were technically doing select * from User 
            
            */


        } catch (error) {
            console.log("Something went wrong in the console layer");
            throw error;
        }
    }

    async getByEmail(userEmail){
        try {
            const responce=User.findOne({
                where:{email:userEmail}
            })
            return responce;

        } catch (error) {
            console.log("Something went wronf in the repository layer");
            throw error;
        }
    }






}

module.exports=UserRepository;