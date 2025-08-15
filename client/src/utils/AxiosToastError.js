// src/utils/AxiosToastError.js
import toast from "react-hot-toast"

const AxiosToastError = (error)=>{
    toast.error(error?.response?.data?.message || "An unexpected error occurred.");
}

export default AxiosToastError;