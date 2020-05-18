import api from './server'

export default {
    get (endpoint) {
        return api.get(`${endpoint}`)
    },

    post (endpoint,data,headers={'Content-Type': 'application/json'}) {
        return api.post(endpoint, data,{
            headers: headers
        })
    },

    put(endpoint,data) {
        return api.put(endpoint, data)
    },

    delete(endpoint) {
        return api.delete(endpoint)
    }
}

