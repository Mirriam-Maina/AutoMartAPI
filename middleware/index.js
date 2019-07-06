import Authenticate from './authenticate';
import AuthValidation from './AuthValidation';
import CarsValidation from './CarsValidation';


const middleware = {
    Authenticate,
    AuthValidation,
    CarsValidation
};

export default middleware;