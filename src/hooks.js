import { useState } from "react"

const AUTH_LINK = import.meta.env.VITE_AUTH_API_URL;

function axiosAuthConfig(method, token, url, body){
    return {
        method:method,
        url:url,
        data:body,
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}

export function useRetryCall(method){
    const [loading,setLoading] = useState(false);
    async function call(url,body) {
        setLoading(true);
        try {
            const accessToken = localStorage.getItem('accessToken');
            return await axios.request(axiosAuthConfig(method, accessToken, url, body));
        } catch(err) {
            const errorMsg = err?.response?.data?.error;
            if(errorMsg !== 'jwt expired')
                throw err;
            const refreshToken = localStorage.getItem('refreshToken');
            const res = await axios.post(`${AUTH_LINK}/auth/token`, {token: refreshToken})
        }
    }
}