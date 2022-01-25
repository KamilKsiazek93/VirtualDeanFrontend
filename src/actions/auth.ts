export const login = (id:number) => ({
    type: 'LOGIN',
    id
})

export const logout = () => ({
    type: 'LOGOUT'
})