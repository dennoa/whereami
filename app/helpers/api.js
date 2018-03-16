import Axios from 'axios'
import _ from 'lodash'
import { removeToken } from './auth'

// const endpoint = process.env.ENDPOINT || 'http://localhost:3000'
const endpoint = process.env.ENDPOINT || 'http://api.thorr.io/v1'

Axios.interceptors.request.use((conf) => {
    const updatedConfig = _.assign({}, conf)
    const token = localStorage.getItem('token')
    if (token && !conf.skipAuth) {
        updatedConfig.headers.Authorization = `Bearer ${token}`
    }
    return updatedConfig
})

// Kick out any 401 requests
Axios.interceptors.response.use(response => response, (error) => {
    if (error.response.status === 401) {
        removeToken()
        // redirect to login page
        console.log('ERROR 401, REDIRECT TO LOGIN')
    }
    return Promise.reject(error)
})

const Api = {
    getProduct: () => Axios.get(`${endpoint}/provider`),
    clearProviderCache: () => Axios.put(`${endpoint}/provider/clearCache`),
    getPolicy: id => Axios.get(`${endpoint}/secure/policy/${id}`),
    addPaymentSource: data => Axios.post(`${endpoint}/stripe/source`, data),

    // Distributor
    getThor: () => Axios.get(`${endpoint}/public/distributor/thor`),

    login: data => Axios.post('http://user-api-test.thorr.io/auth/login', data),
    register: data => Axios.post('http://user-api-test.thorr.io/distributor-registration', data),
    forgotPassword: data => Axios.post('http://user-api-test.thorr.io/public/user/reset-password', data),
    changePassword: data => Axios.post('http://user-api-test.thorr.io/secure/user/change-password', data),
    verify: data => Axios.post('http://user-api-test.thorr.io/distributor-registration/activation', data),
    getUsers: data => Axios.post('http://user-api-test.thorr.io/admin/user/find', data),
    // getDistributor: () => Axios.get('http://user-api-test.thorr.io/admin/distributor'),
    getDistributor: () => Axios.get('http://user-api-test.thorr.io/admin/distributor'),
    updateDistributor: payload => Axios.put('http://user-api-test.thorr.io/admin/distributor', payload),
    switchDistributor: namespace => Axios.get(`http://user-api-test.thorr.io/admin/user/distributor-jwt/${namespace}`),
    getUser: () => Axios.get('http://user-api-test.thorr.io/secure/user'),
    updateUser: data => Axios.put('http://user-api-test.thorr.io/secure/user', data),

    stripeConnectURL: () => Axios.get(`${endpoint}/admin/distributor/stripe/auth`),
    stripeCallback: payload => Axios.post(`${endpoint}/admin/distributor/stripe/connect`, payload),
    getFonts: () => Axios.get('https://www.googleapis.com/webfonts/v1/webfonts?sort=popularity&key=AIzaSyDbYWYCLlrSw5qjzbDAqnY3wWyqqiKIFFI'),
}

export default Api
