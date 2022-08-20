import React from 'react'
import { Avatar, ButtonBase, Menu, MenuItem } from '@mui/material'
import { useUserLogout } from '../../../Apis/AuthApi';

function ProfileMenu() {
    const logout = useUserLogout()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (event: any) => {
        console.log(event);
        
        setAnchorEl(null);
    };

    return (
        <>
            <ButtonBase onClick={handleClick}>
                <Avatar />
            </ButtonBase>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
        </>
    )
}

export default ProfileMenu