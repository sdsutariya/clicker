import React from 'react'
import { Box, Stack, Typography, styled } from '@mui/material'
import { Outlet } from 'react-router-dom'

const StyledContainer = styled(Box)(({theme}) => ({
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: theme.clickerColors?.background,
    [theme.breakpoints.up('lg')]: {
        paddingRight: theme.spacing(20),
        paddingLeft: theme.spacing(20)
    },
    [theme.breakpoints.down('lg')]: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
}))
function LoginPage() {
    return (
        <StyledContainer>
            <Stack sx={{
                flex: 1.5,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Box>
                    <Typography variant='h3' color={'primary'}>Welcome to Clicker, Guest!</Typography>
                    <Typography variant='h5'>Connecting People!</Typography>
                </Box>
            </Stack>
            <Stack sx={{
                flex: 1,
                padding: 4,
                justifyContent: 'center',
                minWidth: '300px'
            }}>
                <Outlet />
            </Stack>
        </StyledContainer>
    )
}

export default LoginPage