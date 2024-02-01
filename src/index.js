const express =require('express');
const {PORT}=require('./config/serverConfig')
const app=express();
const bodyParser=require('body-parser');
const apiRoutes=require('./routes/index')

const prepareAndStartServer =() =>{

    app.listen(PORT,()=>{
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended:true}));

        app.use('/api',apiRoutes);

        console.log(`Server Started at port ${PORT}`);

    })

}

prepareAndStartServer();