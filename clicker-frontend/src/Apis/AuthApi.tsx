import { RestRequest } from "./ApiService";
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

interface RegistrationReq {
    username: string,
    email: string,
    password: string
}
interface RegistrationRes {
    username: string,
    email: string,
    password: string
}


function userRegistration(userData: RegistrationReq) {
    return new Promise((resolve, reject) => {
        RestRequest<RegistrationReq, RegistrationRes>('/auth/signup', userData, 'POST').then(data => {
            // if(data?.error){}
        })
    })
}

export function useRegistration() {
    const mutation = useMutation(userRegistration, {
        onSuccess: () => {
            toast('Registration Successfull')
        },
        onError: () => {
            toast('Error occured!')
        }
    })
    return mutation
}