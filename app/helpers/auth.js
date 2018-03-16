import jwtDecode from 'jwt-decode'

export function saveToken(token) {
    return localStorage.setItem('token', token)
}

export function getToken() {
    return localStorage.getItem('token')
}

export function decodeToken() {
    const token = localStorage.getItem('token')
    if (!token) return false

    // Check for a valid token
    let decodedToken
    try {
        decodedToken = jwtDecode(token)
    } catch (err) {
        localStorage.removeItem('token')
        return false
    }

    // Check if token has expired
    if (decodedToken.exp < Date.now() / 1000) {
        localStorage.removeItem('token')
        return false
    }

    return decodedToken
}

export function removeToken() {
    return localStorage.removeItem('token')
}
