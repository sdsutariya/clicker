import React from 'react'
import { AppBar, Avatar, Box, TextField, Toolbar, Typography } from '@mui/material'
import Logo from '../../Logo/Logo'
import { Chat, Notifications, Person } from '@mui/icons-material'

function NavBar() {
    return (
        <>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar sx={{
                    justifyContent: 'space-between'
                }}>
                    <Logo size='small' variant='button' />
                    <TextField placeholder='Search...' sx={{ width: '40%'}}></TextField>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2
                    }}>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2
                        }}>
                            <Person />
                            <Chat />
                            <Notifications />
                        </Box>
                        <Avatar />
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default NavBar