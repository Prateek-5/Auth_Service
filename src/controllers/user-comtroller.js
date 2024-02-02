const { response } = require('express');
const UserService = require('../services/user-service');

const userService = new UserService();

const create = async (req, res) => {
    try {
        const response = await userService.create({
            email: req.body.email,
            password: req.body.password
        });
        return res.status(201).json({
            success: true,
            message: 'Successfully created a new user',
            data: response,
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            success: false,
            err: error
        });
    }
}
const signIn=async (req,res)=>{
    try {
        const responce=await userService.signIn(req.body.email,req.body.password);
        res.status(200).json({
            success:true,
            error:{},
            Message:"Signin success",
            data:{responce},
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            success: false,
            err: error
        });
    }
}
const isAuthenticated =async(req,res)=>{
        try {
            const token=await req.headers['x-access-token']
            const responce=await userService.isAuthenticated(token);
            return res.status(200).json({
                message:'User is authenticated and token is valid',
                success:true,
                error:{},
                data:responce,
            })


        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Something went wrong',
                data: {},
                success: false,
                err: error
            });
        }
}

module.exports = {
    create,
    signIn,
    isAuthenticated
}