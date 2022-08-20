import React from 'react'
import { MoreVert } from '@mui/icons-material'
import { Box, Card, Stack, Typography, CardMedia, Avatar } from '@mui/material'

const FeedItem = () => {
    return (
        <Card elevation={4} sx={{ marginTop: 1}}>
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
                        <Typography variant='body1'>Shivam Kahar</Typography>
                        <Typography variant='caption'>5 mins ago</Typography>
                    </Box>
                    <MoreVert sx={{
                        marginLeft: 'auto'
                    }} />
                </Box>
            </Stack>
            <CardMedia component={'img'} src={'https://picsum.photos/1000/600'}>

            </CardMedia>
        </Card>
    )
}
function Feed() {
    return (
        <Box sx={{
            p: 2,
            height: '90vh',
            overflow: 'scroll',
            gap: 1
        }}>
            <FeedItem />
            <FeedItem />
            <FeedItem />
        </Box>
    )
}

export default Feed