import express from 'express';
import AuthController from './AuthController';
import middleware from '../../middleware';

const { AuthValidation } = middleware;
const AuthControllerRouter = express.Router();

AuthControllerRouter.post(
    '/auth/signup',
    AuthValidation.signUpValidation,
    AuthController.signup
)

AuthControllerRouter.post(
    '/auth/login',
    AuthValidation.signInValidation,
    AuthController.signin
)


export default AuthControllerRouter;



