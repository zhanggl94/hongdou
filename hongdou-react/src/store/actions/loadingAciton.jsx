import { LOADING } from '../actTypes';

const spinLoading = isLoading => {
    return {
        type: LOADING,
        isLoading
    };
};

export default spinLoading;