import axios from 'axios'
const setUserToken = (token) => {
    if (token) {
        axios.defaults.headers.common['x-auth-header'] = token;
    }
    else delete axios.defaults.headers.common['x-auth-header']
}
export default setUserToken;