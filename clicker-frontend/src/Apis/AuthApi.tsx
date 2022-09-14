import { RestRequest } from "./ApiService";
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useNavigate } from "react-router";
import { User } from "./ApiTypes";
import { getCookie, setCookie, removeCookie } from "typescript-cookie";
import { useCallback, useEffect, useState } from "react";

export const USER_COOKIE = 'user_id'

export interface RegistrationReq {
    username: string,
    email: string,
    password: string
}
interface RegistrationRes {
    username: string,
    email: string,
    password: string
}
export interface LoginReq {
    email: string,
    password: string
}

function userRegistration(userData: RegistrationReq): Promise<RegistrationRes> {
    return new Promise((resolve, reject) => {
        RestRequest<RegistrationReq, RegistrationRes>('/auth/signup', userData, 'POST').then(data => {
            resolve(data)
        }).catch(error => {
            toast.error(String(error))
            reject(error)
        })
    })
}

export function useRegistration() {
    const navigate = useNavigate()
    const mutation = useMutation(userRegistration, {
        onSuccess: (data) => {
            toast.success('Registration Successfull!')
            navigate('/signin', { replace: true })
        }
    })
    return mutation
}

function userLogin(userData: LoginReq): Promise<User> {
    return new Promise((resolve, reject) => {
        RestRequest<LoginReq, User>('/auth/signin', userData, 'POST').then(data => {
            resolve(data)
        }).catch(error => {
            toast.error(String(error))
            reject(error)
        })
    })
}

export function useLogin() {
    const navigate = useNavigate()
    const mutation = useMutation(userLogin, {
        onSuccess: (data: User) => {
            toast.success('Login Successful!')
            setCookie(USER_COOKIE, data._id)
            navigate('/home', { replace: true })
        }
    })
    return mutation
}

export function useIsLoggedIn() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    useEffect(() => {
        const userId = getCookie(USER_COOKIE)
        console.log(userId)
        if (userId) {
            setIsLoggedIn(true)
        }
    }, [])

    return { isLoggedIn }
}

export const useUserLogout = () => {
    const navigate = useNavigate()

    const logout = useCallback(() => {
        removeCookie(USER_COOKIE)
        navigate('/signin', { replace: true })
    }, [],)

    return logout
}