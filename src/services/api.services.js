import axios from 'axios'

function makeNetworkCall(req) {
    return new Promise((resolve, reject) => {
        axios(req)
            .then(response => resolve(response.data))
            .catch(error => {
                console.error(error)
                reject(error)
            })
    })
}

function getHeader() {
    return {}
}

function execute(method = 'OPTIONS', url = '', params = {}, data = null) {
    const req = {
        method,
        url,
        params,
        data,
        headers: getHeader(),
    }

    return makeNetworkCall(req)
}


class RestApiService {
    get (url, params, data) {
        return execute('GET', url, params, data)    
    }

    post (url, params, data) {
        return execute('POST', url, params, data)
    }

    put (url, params, body) {

    }

    delete (url, params, body) {

    }
}

export default new RestApiService()
