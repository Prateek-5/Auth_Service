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




}

module.exports=UserRepository;