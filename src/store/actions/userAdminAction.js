import { ADD_NEW_USER, EDIT_USER } from "../types/userAdminType"



export const addUserAction = (data) => {
    return {
        type: ADD_NEW_USER,
        payload: data,
    }
}
export const editUserAction = (data) => {
    return {
        type: EDIT_USER,
        payload: data,
    }
}