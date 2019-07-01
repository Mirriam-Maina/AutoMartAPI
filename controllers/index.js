import AuthControllerRouter from '../controllers/auth/index';


const apiPrefix = '/api/v1';

const routes = [
AuthControllerRouter
];

export default (app) => {
    routes.forEach(route => app.use(apiPrefix, route));
    return app;
  };