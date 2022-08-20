import React, { ReactElement } from 'react'
import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material'
import { Bookmark, Chat, Feed, HelpCenter, People, PlayCircleFilled, School, Work } from '@mui/icons-material'
import { NavLink as RouterLink, NavLinkProps as RouterLinkProps, useLocation } from 'react-router-dom'

interface DrawerItemType {
    title: string;
    icon: ReactElement;
    link: string;
}

const drawerItemList: Array<DrawerItemType> = [
    {
        title: "Feed",
        icon: <Feed />,
        link: 'feed'
    },
    {
        title: "Chat",
        icon: <Chat />,
        link: 'chat'
    },
    {
        title: "Videos",
        icon: <PlayCircleFilled />,
        link: 'videos'
    },
    {
        title: "Groups",
        icon: <People />,
        link: 'groups'
    },
    {
        title: "Bookmarks",
        icon: <Bookmark />,
        link: 'bookmarks'
    },
    {
        title: "Questions",
        icon: <HelpCenter />,
        link: 'questions'
    },
    {
        title: "Jobs",
        icon: <Work />,
        link: 'jobs'
    },
    {
        title: "Courses",
        icon: <School />,
        link: 'courses'
    },
]



const ListItemLink = (props: DrawerItemType & {currentLocation: string}) => {
    const { title, icon, link, currentLocation } = props
    const renderLink = React.useMemo(
        () =>
            React.forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, 'to'>>(function Link(
                itemProps,
                ref,
            ) {
                return <RouterLink to={link} ref={ref} {...itemProps} role={undefined} />;
            }),
        [link],
    );
    return (
        <ListItem button component={renderLink} sx={{
            borderRadius: theme => theme.spacing(theme.clickerShape.smallBorderRadius),
            my: theme => theme.spacing(1),
            ...(currentLocation === link && {
                backgroundColor: '#A9A9A938'
            })
        }}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText>{title}</ListItemText>
        </ListItem>
    )
}
function RightDrawer() {
    const location = useLocation()
    const pathArray = location.pathname.split('/')
    const currentLocation = pathArray[pathArray.length - 1]
    return (
        <Box sx={{ overflow: 'auto' }}>
            <List sx={{
                p: 2,
            }}>
                {drawerItemList.map((item) => (
                    <ListItemLink key={item.title} title={item.title} icon={item.icon} link={item.link} currentLocation={currentLocation}/>
                ))}
            </List>
            <Divider />
        </Box>
    )
}

export default RightDrawer