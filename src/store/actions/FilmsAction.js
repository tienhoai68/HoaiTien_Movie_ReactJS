import { ADD_NEW } from "../types/filmType"



export const addNewFilmAction = (data) => {
    return {
        type: ADD_NEW,
        payload: data,
    }
}