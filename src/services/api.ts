import axios from "axios";

const api = axios.create({
    baseURL: 'http://remindmebff-prod.us-east-2.elasticbeanstalk.com/Medicaments',
});

export default api;