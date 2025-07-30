import axios from "axios";

const ApiInstance = axios.create({
    baseURL: 'deployedUrl'
});

export default ApiInstance;