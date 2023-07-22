import axios from "axios";

const apiBase = "http://cinema/api";

async function send(url, data = null) {
    try {
        const response = await axios.post(`${apiBase}${url}`, data);
        const res = response.data;

        if (res.code !== 0) {
            showError(res.code, res.message);
            return null;
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
