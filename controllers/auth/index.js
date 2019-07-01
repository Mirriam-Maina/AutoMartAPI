import express from 'express';
import AuthController from './AuthController';
import AuthValidation from '../../middleware/AuthValidation';

const AuthControllerRouter = express.Router();

AuthControllerRouter.post(
    '/auth/signup',
    AuthValidation.signInValidation,
    AuthController.signup
)


export default AuthControllerRouter;



