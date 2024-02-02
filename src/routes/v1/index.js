const express=require('express');

const UserController=require('../../controllers/user-comtroller');
const {AuthRequestValidator}=require('../../middlewares/index')

const router=express.Router();

router.post('/signup',AuthRequestValidator.validateAuth,UserController.create);
router.post('/signin',AuthRequestValidator.validateAuth,UserController.signIn);
router.get('/isAuthenticated',UserController.isAuthenticated);
router.get(
    '/isAdmin',
    AuthRequestValidator.validateIsAdminRequest,
    UserController.isAdmin
);

module.exports=router;
