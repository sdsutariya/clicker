import React, { useEffect } from 'react'
import { Box, Toolbar, Typography } from '@mui/material'
import { Outlet, useNavigate } from 'react-router-dom'
import NavBar from './Navbar/NavBar'
import RightDrawer from './RightDrawer'
import LeftPanel from './LeftPanel'
import { useIsLoggedIn, USER_COOKIE } from '../../Apis/AuthApi'
import { getCookie } from 'typescript-cookie'

function HomePage() {
    const navigate = useNavigate()
    useEffect(() => {
        const user_id = getCookie(USER_COOKIE)
        if (!user_id) {
            navigate('/signin', { replace: true })
        }
    }, [])
    return (
        <Box sx={{
            backgroundColor: theme => theme.clickerColors.background
        }}>
            <NavBar />
            <Toolbar />
            <Box sx={{
                display: 'flex',
            }}>
                <Box sx={{
                    flex: 2,
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <RightDrawer />
                </Box>
                <Box sx={{
                    flex: 5
                }}>
                    <Outlet />
                </Box>
                <Box sx={{
                    flex: 2
                }}>
                    <LeftPanel />
                </Box>
            </Box>
        </Box>
    )
}

export default HomePage