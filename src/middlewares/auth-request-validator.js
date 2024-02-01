const validateAuth=(req,res,next)=>{
    if(!req.body.email || !req.body.password){
        res.status(400).json({
            success:false,
            message:"The req body misses email or password",
            error:{},
            resposse:{}
        })
    }

    else{
        next();
    }

}

module.exports={
    validateAuth

};