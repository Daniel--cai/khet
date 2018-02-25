import createStore from 'redux-zero'

const initialState = {
    username: '',
    guid: '',
    loading: false
};

const store = createStore(initialState);

export default store;