import React, { ReactNode } from 'react'
import { Card, styled } from '@mui/material'

const StyledCard = styled(Card)(({ theme }) => ({
    padding: theme.spacing(3),
    borderRadius: theme.spacing(theme.clickerShape.smallBorderRadius)
}))
function MediumCard({ children }: { children: ReactNode }) {
  return (
    <StyledCard>
        {children}
    </StyledCard>
  )
}

export default MediumCard