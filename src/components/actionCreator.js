import axios from "axios";

function isAuthenticated() {
    axios({
        method: "GET",
        headers: {
            "x-access-token": localStorage.getItem("token")
        },
        withCredentials: true,
        url: "http://localhost:4000/api/user/supervisor/isUserAuth",
    }).then((res) => console.log(res));
}

export { isAuthenticated }