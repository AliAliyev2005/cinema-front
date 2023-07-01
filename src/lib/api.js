import axios from "axios";

const api_base = "http://localhost/cinema/api";

async function send(url, data = null) {
    return await axios.post(`${api_base}${url}`, data).then(
        (response) => {
            const res = response.data;
            if (res.code != 0) {
                error(res?.code, res?.message);
                return;
            }

            return res.data;
        },
        (error) => {
            error(error?.code, error?.message);
        }
    );
}

function error(code, message) {
    alert(message);
}

export default send;
