import isEmpty from 'lodash/isEmpty';
import { SETUSER } from "../actTypes"

const initState = {
    isAuth: false,
    user: {}
}

const auth = (state = initState, action) => {
    switch (action.type) {
        case SETUSER:
            return {
                isAuth: !isEmpty(action.user),
                user: action.user
            }
        default:
            return state;
    }
}

export default auth;