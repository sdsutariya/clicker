import React from 'react'
import { TextField, Button, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import Card from '../Common/MediumCard'
import { useRegistration } from '../../Apis/AuthApi'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { RegistrationReq } from '../../Apis/AuthApi'

function SignUp() {
    const { mutate: signIn, isLoading } = useRegistration()
    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object().shape({
            username: Yup.string().required().min(6, 'Username too short'),
            email: Yup.string().required().email(),
            password: Yup.string().required().min(8, 'Password too short')
        }),
        onSubmit: (values) => {
            signIn(values as RegistrationReq)
        }
    })
    return (
        <Card>
            <Stack sx={{
                gap: 2
            }} component='form' onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
                <TextField
                    placeholder='Username'
                    variant='outlined'
                    label='Username'
                    value={formik.values.username}
                    onChange={formik.handleChange('username')}
                    error={formik.errors.username && formik.touched.username ? true : false}
                    helperText={formik.errors.username}
                    onBlur={formik.handleBlur('username')}/>
                <TextField
                    placeholder='Email'
                    variant='outlined'
                    label='Email'
                    value={formik.values.email}
                    onChange={formik.handleChange('email')}
                    error={formik.errors.email && formik.touched.email ? true : false}
                    helperText={formik.errors.email}
                    onBlur={formik.handleBlur('email')} />
                <TextField
                    placeholder='Password'
                    variant='outlined'
                    label='Password'
                    value={formik.values.password}
                    onChange={formik.handleChange('password')}
                    error={formik.errors.password && formik.touched.password ? true : false}
                    helperText={formik.errors.password}
                    onBlur={formik.handleBlur('password')}/>
                <Button variant='contained' onClick={formik.submitForm} disabled={isLoading}>Register</Button>
                <Typography variant='body1'>Already have an account? <RouterLink to={'/signin'}>Log In</RouterLink> </Typography>
            </Stack>
        </Card>
    )
}

export default SignUp