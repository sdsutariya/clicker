import React from 'react'
import { Box, ButtonBase, Typography } from '@mui/material'
import { Forest } from '@mui/icons-material'

function Logo({ size, variant }: { size: 'small' | 'large', variant: 'button' | 'container'}) {
  return (
    <ButtonBase disabled={variant === 'container'} sx={{
        display: variant === 'button' ? 'flex' : 'block',
        gap: 1,
        p: 1,
        borderRadius: theme => theme.spacing(theme.clickerShape.smallBorderRadius)
    }}>
        <Forest sx={{
            fontSize: size === 'small' ? 24 : 62
        }}/>
        <Typography variant={variant === 'button' ? 'h5' : 'h3'}>Clicker</Typography>
    </ButtonBase>
  )
}

export default Logo