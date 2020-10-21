import { SETUSER } from '../actTypes';

const setUser = user => {
    return {
        type: SETUSER,
        user
    };
}

export default setUser;