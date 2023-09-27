// import axios from 'axios'

import axios from '../apiClient'

const getAll = () => {
    const request = axios.get('/persons');
    return request.then(response => response.data);
}

const create = newObject => {
    const request = axios.post('/persons', newObject);
    return request.then(response => response.data);
}

const del = (id, delObject) => {
    const request = axios.delete(`/persons/${id}`, delObject);
    return request.then(response => response.data);
}

const update = (id, newObject) => {
    const request = axios.put(`/persons/${id}`, newObject);
    return request.then(response => response.data);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { 
    getAll,
    create,
    del,
    update 
};
