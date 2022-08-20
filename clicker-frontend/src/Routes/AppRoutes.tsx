import React, { useState } from "react";
import { Routes, Route, Navigate } from 'react-router-dom'
import App from "../App";
import LoginPage from "../Components/LoginPage/LoginPage";
import SignIn from '../Components/LoginPage/SignIn'
import SignUp from '../Components/LoginPage/SignUp'
import Home from '../Components/HomePage/HomePage'
import { Bookmarks, Chat, Courses, Feed, Groups, Jobs, Questions, Videos } from '../Components/Menus/index'

const AppRoutes = () => {
    const [isLoggedin, setLoggedIn] = useState(false);
    return (
        <Routes>
            <Route path="/" element={<App />}>
                {/* {isLoggedin ? (
                    <> */}
                        <Route index element={<Navigate to={'/home'} />} />
                        <Route path="home" element={<Home />}>
                            <Route index element={<Navigate to={'feed'} />} />
                            <Route path="feed" element={<Feed />} />
                            <Route path="bookmarks" element={<Bookmarks />} />
                            <Route path="courses" element={<Courses />} />
                            <Route path="groups" element={<Groups />} />
                            <Route path="jobs" element={<Jobs />} />
                            <Route path="questions" element={<Questions />} />
                            <Route path="videos" element={<Videos />} />
                            <Route path="chat" element={<Chat />} />
                        </Route>
                    {/* </>
                ) : (
                    <> */}
                        <Route path="" element={<LoginPage />}>
                            <Route index element={<Navigate to={'/signin'} />} />
                            <Route path='signin' element={<SignIn />} />
                            <Route path='signup' element={<SignUp />} />
                        </Route>
                    {/* </>
                )} */}
            </Route>
            <Route path="*" element={'404 Not found'} />
        </Routes>
    )
}

export default AppRoutes