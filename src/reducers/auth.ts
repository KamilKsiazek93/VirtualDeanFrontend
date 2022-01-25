export const authReducer = (state = {}, action:any) => {
    switch(action.type) {
        case 'LOGIN':
            return {
                user: action.user
            };
        case 'LOGOUT':
            return {};
        default:
            return state;
    }
};