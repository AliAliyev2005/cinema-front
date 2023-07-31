import axios from "axios";

async function send(url, data = null) {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}${url}`, data);
        const res = response.data;

        if (res.code !== 0) {
            // showError(res.code, res.message);
            return res;
        }

        return res.data;
    } catch (error) {
        showError(error.code, error.message);
        return null;
    }
}

function showError(code, message) {
    alert(message);
}

export default send;
