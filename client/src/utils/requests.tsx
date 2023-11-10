import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL

const setAuthToken = (token: string) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        localStorage.setItem("authToken", token)
    } else {
        delete axios.defaults.headers.common["Authorization"];
        localStorage.removeItem("authToken")
    }
}

const getAuthToken = () => {
    return localStorage.getItem("authToken")
}

interface RequestConfig {
        headers?: {
            Authorization: string;
        };
    }

type ErrorHandler = (error: Error) => void;

const makeRequest = async(method: string, url: string, data = null, errorHandler: ErrorHandler | null = null) => {
    try {
            const token = getAuthToken()
            const config: RequestConfig = {}
            if (token) {
                config.headers = {
                    'Authorization': `Bearer ${token}`
                }
            }

        const response = await axios({
            method,
            url: `${baseURL}${url}`,
            data,
            ...config
        })

        return response.data
    } catch (error: unknown) {
        if (errorHandler && error instanceof Error) {
            errorHandler(error)
        }
        console.error("Unexpected error: ", error)
        return null
    }
}

const getRequest = async(url: string, errorHandler: ErrorHandler | null = null) => {
    return makeRequest("GET", url, null, errorHandler)
}

const postRequest = async(url: string, data = null, errorHandler: ErrorHandler | null = null) => {
    return makeRequest("POST", url, data, errorHandler)
}

const updateRequest = async(url: string, data = null, errorHandler: ErrorHandler | null = null) => {
    return makeRequest("PUT", url, data, errorHandler)
}

const deleteRequest = async(url: string, errorHandler: ErrorHandler | null = null) => {
    return makeRequest("DELETE", url, null, errorHandler)
}

export {getRequest, postRequest, updateRequest, deleteRequest, setAuthToken}