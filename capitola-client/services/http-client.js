const API_HOST = "http://localhost:3001"; //TODO: when not in local read from env

export const get = async (url) => {
    try {
        const response = await fetch(`${API_HOST}/${url}`);
        if (!/^2/.test(`${response.status}`)) {
            return Promise.reject({ success: false, status: response.status });
        }
        return response.json();
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
};

const crudType = async (method, path, payload) => {
    try {
        const response = await fetch(`${API_HOST}/${path}`, {
            method: method,
            body: JSON.stringify(payload || {}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response)
        if (!/^2/.test(`${response.status}`)) {
            return Promise.reject({ success: false, status: response.status });
        }
        return response.json();
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
};

export const patch = async (path, payload) => {
    return crudType('PATCH', path, payload)
}

export const post = async (path, payload) =>{
    return crudType('POST', path, payload)
}
