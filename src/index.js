const express =require('express');
const {PORT}=require('./config/serverConfig')
const app=express();
const bodyParser=require('body-parser');
const apiRoutes=require('./routes/index')
const userService=require('./services/user-service');
const UserRepository=require('./repository/user-repository');
const db=require('./models/index');

const  prepareAndStartServer = () =>{

    app.listen(PORT,async ()=>{
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended:true}));

        app.use('/api',apiRoutes);
        
        // const userrepos=new UserRepository();

        // const repose=await userrepos.destroy(3);
        // console.log(repose);

        if(process.env.DB_SYNC) {
            db.sequelize.sync({alter: true});
        }



        console.log(`Server Started at port ${PORT}`);

    })

}

prepareAndStartServer();