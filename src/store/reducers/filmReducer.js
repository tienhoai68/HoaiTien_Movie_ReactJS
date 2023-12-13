import { ADD_NEW } from "../types/filmType"


const DEFAULT_STATE = {

}

export const filmsReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case ADD_NEW:
            state = action.payload;

            break;

    }
    return { ...state };
}