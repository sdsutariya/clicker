export type ApiResponse = {
    success: boolean;
    data: any;
    error: string | null
}

export type User = {
    _id: string;
    username: string;
    email: string;
    password: string;
    profilePicture: string;
    coverPicture: string;
    followers: Array<any>;
    followings: Array<any>;
    isAdmin: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CreatePost {
    userId: string,
    desc: string,
    img: string
}

export interface Post extends CreatePost {
    likes?: Array<any>,
    createdAt: string,
    updatedAt: string,
    _id: string
}