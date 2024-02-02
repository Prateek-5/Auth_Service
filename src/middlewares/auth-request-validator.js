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
const validateIsAdminRequest = (req, res, next) => {
    if(!req.body.id) {
        return res.status(400).json({
            success: false,
            data: {},
            err: 'User id not given',
            message: 'Something went wrong'
        })
    }
    next();
}

module.exports={
    validateAuth,
    validateIsAdminRequest

};