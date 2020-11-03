import Axios from 'axios'

// eslint-disable-next-line import/prefer-default-export
async function TwitterSignin(email, pwd)  {
        const res = await Axios.post("http://localhost:3000/api/login", {email, pwd});
        const {data} = await res;
        if (data.error) {
            return data.error
        }else{
            localStorage.setItem("token", data.token)
            localStorage.setItem("refreshToken", data.refreshToken);
            return true
        }
    }

async function check() {
    const token = localStorage.getItem("token")
    try {
        const res = await Axios.post("/api/checkTokenExpire", {}, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
        const {data} = await res;
        return data.success
    } catch {
        console.log("Here catch ")
        const refresh_token = localStorage.getItem("refreshToken")
        if (!refresh_token) {
            localStorage.removeItem("token")
            return false;
        }
        Axios.post("api/refreshToken", {}, {
            headers: {
                Authorization: `Bearer ${refresh_token}`
            }
        }).then(res => {
            localStorage.setItem("token", res.data.token)
        })
        return true;
    }
}

export {TwitterSignin, check};
