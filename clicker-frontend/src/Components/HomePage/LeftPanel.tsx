import React from 'react'
import { Avatar, Box, Card, Stack, Typography } from '@mui/material'

function LeftPanel() {
  return (
    <Box sx={{
        p:2
    }}>
        <Card>
            <Stack>
                <Box sx={{
                    height: 100,
                    width: 100,
                    backgroundColor: 'red',
                    borderRadius: '100%',
                    margin: 'auto',
                }}/>
                <Typography>Shivam Kahar</Typography>
                <Typography>Baroda</Typography>
                <Typography>Gujarat</Typography>
            </Stack>
        </Card>
    </Box>
  )
}

export default LeftPanel