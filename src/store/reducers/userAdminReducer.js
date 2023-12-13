import { ADD_NEW_USER, EDIT_USER } from "../types/userAdminType";


const DEFAULT_STATE = {
    user: null,
}

export const userAdminReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case ADD_NEW_USER:
            state.user = action.payload;

            break;
        case EDIT_USER:
            state.user = action.payload;
            break;
    };
    return { ...state };
}