import axios from "axios"
import { server } from "./app/globals"

export const signup = async (employeeForm) => {

    if (!employeeForm) return

    const { status } = await axios.post(`${server}/api/auth/signup`, employeeForm)

    return status

}


export const signin = async (employeeForm) => {

    if (!employeeForm) return

    const { data } = await axios.post(`${server}/api/auth/signin`, employeeForm)
    
    return data

}

export const getEmployeesWorkingData = async (employeeId) => {

    if (!employeeId) return

    const { data } = await axios.post(`${server}/api/data/get-employee-data`, { employeeId })

    return data

}

export const updateEmployeesWorkingData = async (employeeId, update) => {
    
    if (!employeeId) return

    const { data } = await axios.post(`${server}/api/data/update-employee-data`, { employeeId, update })

    return data

}