import React from 'react'
import { TextField, Button, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import Card from '../Common/MediumCard'
import { useRegistration } from '../../Apis/AuthApi'
import { toast } from 'react-toastify'

function SignUp() {
    const { mutate, error, data, isLoading } = useRegistration()
    return (
        <Card>
            <Stack sx={{
                gap: 2
            }}>
                <TextField placeholder='Username' required />
                <TextField placeholder='Email' required />
                <TextField placeholder='Password' required />
                <Button variant='contained' onClick={() => {
                    mutate({ email: 'test', username: 'test', password: 'test'})
                }}>Register</Button>
                <Typography variant='body1'>Already have an account? <RouterLink to={'/signin'}>Log In</RouterLink> </Typography>
            </Stack>
        </Card>
    )
}

export default SignUp