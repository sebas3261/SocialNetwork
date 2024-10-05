export interface PostProps {
    address: string,
    description: string,
    image: any,
    date: Date,
    username?: string,
    postedBy?: string,
    likes?: number,
    user: string
}

export interface DefaultResponse {
    isSuccess: boolean;
    message: string;
}