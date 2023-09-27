import axios from 'axios'  // Directly import axios, we don't need the customized client anymore

const baseUrl = '/api/persons' // This will be the common base for all your API calls

const getAll = () => {
    return axios.get(baseUrl).then(response => response.data)
}

const create = newObject => {
    return axios.post(baseUrl, newObject).then(response => response.data)
}

const del = (id, delObject) => {
    return axios.delete(`${baseUrl}/${id}`, delObject).then(response => response.data)
}

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject).then(response => response.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { 
    getAll,
    create,
    del,
    update 
}
