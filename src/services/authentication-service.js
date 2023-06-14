import { API_AUTH } from './axios-http-caller';

class AuthenticationService {

    login = async ( data ) => {
        return await API_AUTH.post( '', data );
    }
}

export default new AuthenticationService();