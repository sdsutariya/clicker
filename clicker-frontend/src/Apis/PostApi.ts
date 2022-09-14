import { RestRequest } from "./ApiService";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreatePost, Post } from './ApiTypes'
import { getCookie } from "typescript-cookie";
import { USER_COOKIE } from "./AuthApi";


function createPost(post: CreatePost): Promise<Post> {
    return new Promise((resolve, reject) => {
        RestRequest<CreatePost, Post>('/post/create', post, 'POST').then(data => {
            console.log(data)
            resolve(data)
        }).catch(error => {
            reject(error)
        })
    })
}

export function useCreatePost() {
    const queryClient = useQueryClient()
    const mutation = useMutation(createPost, {
        onSuccess: (data) => {
            queryClient.invalidateQueries(['posts'])
            toast.success('Post created successfully!')
        },
        onError: (error) => {
            toast.error(`${error}`)
        }
    })
    return mutation
}

function getPosts(): Promise<Array<Post>> {
    const userId = getCookie(USER_COOKIE)
    return new Promise((resolve, reject) => {
        RestRequest<{}, Array<Post>>('/post/timeline/all', {}, 'GET', userId).then(data => {
            resolve(data)
        }).catch(error => {
            reject(error)
        })
    })
}

export function useGetPosts() {
    const { data: posts, error, isLoading } = useQuery(['posts'], getPosts)    
    return { posts, isLoading, error }
}