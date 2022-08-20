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