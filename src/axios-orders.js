import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-6485d.firebaseio.com/'
});

export default instance;