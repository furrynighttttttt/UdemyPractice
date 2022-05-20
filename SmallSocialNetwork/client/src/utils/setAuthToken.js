import axios from 'axios'

const setAuthToken = token => {
    if(token){
        axios.defaults.headers.common['authorization'] = `Bearer ${token}`
    } else {
        console.log('token 2')
        delete axios.defaults.headers.common['authorization']
    }
}

export default setAuthToken