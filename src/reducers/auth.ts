export const authReducer = (state = {}, action:any) => {
    switch(action.type) {
        case 'LOGIN':
            return {
                id: action.id
            };
        case 'LOGOUT':
            return {};
        default:
            return state;
    }
};