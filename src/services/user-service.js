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



}

module.exports=UserService;
