import { BaseBrother } from "../components/Brother"

export const login = (user:BaseBrother) => ({
    type: 'LOGIN',
    user
})

export const logout = () => ({
    type: 'LOGOUT'
})