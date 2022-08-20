import React from 'react'
import { Box, Toolbar, Typography } from '@mui/material'
import { Outlet } from 'react-router-dom'
import NavBar from './Navbar/NavBar'
import RightDrawer from './RightDrawer'
import LeftPanel from './LeftPanel'
import { Navigate } from 'react-router-dom'

function HomePage() {
    if (false) return <Navigate to={'/signin'}/>
    return (
        <Box sx={{
            backgroundColor: theme => theme.clickerColors.background
        }}>
            <NavBar />
            <Toolbar/>
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
                    <Outlet/>
                </Box>
                <Box sx={{
                    flex: 2
                }}>
                    <LeftPanel/>
                </Box>
            </Box>
        </Box>
    )
}

export default HomePage