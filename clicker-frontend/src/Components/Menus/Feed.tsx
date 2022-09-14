import React from 'react'
import { MoreVert } from '@mui/icons-material'
import { Box, Card, Stack, Typography, CardMedia, Avatar, CircularProgress } from '@mui/material'
import PostCreate from './Post/PostCreate'
import { useGetPosts } from '../../Apis/PostApi'
import { Post } from '../../Apis/ApiTypes'
import moment from 'moment'

type props = {
    post: Post
}

const FeedItem = ({ post }: props) => {
    return (
        <Card elevation={4} sx={{ marginTop: 1 }}>
            <Stack sx={{
                p: 1
            }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2
                }}>
                    <Avatar />
                    <Box>
                        <Typography variant='body1'>{'Shivam Kahar'}</Typography>
                        <Typography variant='caption'>{moment(post.createdAt).fromNow()}</Typography>
                    </Box>
                    <MoreVert sx={{
                        marginLeft: 'auto'
                    }} />
                </Box>
            </Stack>
            <Stack sx={{p:1}}>
                <Typography variant='h5'>{post.desc}</Typography>
                <CardMedia component={'img'} src={post.img}>
                </CardMedia>
            </Stack>
        </Card >
    )
}
function Feed() {
    const { posts, isLoading, error } = useGetPosts()
    return (
        <Box sx={{
            p: 2,
            height: '90vh',
            overflow: 'scroll',
            gap: 1
        }}>
            <PostCreate />
            {isLoading ? <CircularProgress sx={{
                margin: '10% 50%'
            }} /> : null}
            {posts ? posts.map(post => (
                <FeedItem post={post} />
            )) : null}
        </Box>
    )
}

export default Feed