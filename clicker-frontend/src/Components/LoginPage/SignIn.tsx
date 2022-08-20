import React from 'react'
import { Button, Stack, TextField, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import Card from '../Common/MediumCard'
import { Form, useFormik } from 'formik'
import * as Yup from 'yup'

function SignIn() {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().required(),
            password: Yup.string().required()
        }),
        onSubmit: (values) => {
            console.log(values)
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
                    value={formik.values.email}
                    onChange={formik.handleChange('email')}
                    error={formik.errors.email ? true : false}/>
                <TextField
                    placeholder='Email'
                    variant='outlined'
                    label='Password'
                    value={formik.values.password}
                    onChange={formik.handleChange('password')}
                    error={formik.errors.password ? true : false}/>
                <Button variant='contained' onClick={formik.submitForm}>Login</Button>
                <RouterLink to={''}>Forgotten Password?</RouterLink>
                <Typography variant='body1'>Don't have an account? <RouterLink to={'/signup'}>Register Now</RouterLink></Typography>
            </Stack>
        </Card>
    )
}

export default SignIn