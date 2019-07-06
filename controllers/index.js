import AuthControllerRouter from '../controllers/auth';
import CarControllerRouter from '../controllers/cars';


const apiPrefix = '/api/v1';

const routes = [
AuthControllerRouter,
CarControllerRouter
];

export default (app) => {
    routes.forEach(route => app.use(apiPrefix, route));
    return app;
  };