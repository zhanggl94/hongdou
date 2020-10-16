import { LOADING } from '../actTypes';

const initState = false;

const loadingStatus = (state = initState, action) => {
    console.log('reducer',action)
    switch (action.type) {
        case LOADING:
            return action.isLoading;
        default:
            return state;
    }
};

export default loadingStatus;