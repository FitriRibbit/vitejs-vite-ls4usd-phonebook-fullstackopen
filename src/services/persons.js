import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/persons';

//"server": "json-server -p5174 --watch db.json"

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const erase = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request;
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
}

const personService = {
  getAll,
  create,
  update,
  erase,
}
export default personService;

