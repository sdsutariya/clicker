import { toast } from 'react-toastify'

type RequestType = 'GET' | 'POST' | 'DELETE'
const BASE_URL = '/api'
export async function RestRequest<P, R>(
    path: string,
    params: P = {} as P,
    method: RequestType,
    contentType: string = 'application/json'
) {
    const data = await fetch(BASE_URL + path, {
        method: method,
        body: JSON.stringify(params),
        headers: {
            'Content-Type': contentType
        }
    }).then(res =>  res.json()).catch(err =>  console.log(err))
    console.log(data)
    return data as R
}