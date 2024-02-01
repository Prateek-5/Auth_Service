const express =require('express');
const {PORT}=require('./config/serverConfig')
const app=express();
const bodyParser=require('body-parser');
const apiRoutes=require('./routes/index')
const UserRepository=require('./repository/user-repository')

const  prepareAndStartServer = () =>{

    app.listen(PORT,async ()=>{
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended:true}));

        app.use('/api',apiRoutes);
        // const userrepository=new UserRepository();
        // const response=await userrepository.getById(2);
        // console.log(response);



        console.log(`Server Started at port ${PORT}`);

    })

}

prepareAndStartServer();