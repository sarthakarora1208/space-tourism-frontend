import React from 'react'
import { Typography, Stack, Button, Box } from '@mui/material'

interface IVendorStatusFieldsProps {
  fieldName: string | undefined
  value: string | undefined
  isActive: boolean
  buttonValue?: string
  buttonOnClick?: any
}

export const VendorStatusFields: React.FC<IVendorStatusFieldsProps> = ({
  fieldName,
  value,
  isActive,
  buttonValue,
  buttonOnClick,
}) => {
  return (
    <Stack
      direction='row'
      display='flex'
      justifyContent='space-between'
      flexWrap='wrap'
      alignItems='center'
    >
      <Stack direction='row'>
        <Typography
          variant='body2'
          mr='4px'
          fontWeight={500}
        >{`${fieldName}: `}</Typography>
        <Typography color={isActive ? '#006400' : 'error'} variant='body2'>
          {value}
        </Typography>
      </Stack>

      <Box justifySelf='end'>
        {!isActive && (
          <>
            <Button
              variant='text'
              sx={{
                padding: '0',
              }}
              color='primary'
              onClick={buttonOnClick}
            >
              {buttonValue}
            </Button>
          </>
        )}
      </Box>
    </Stack>
  )
}

VendorStatusFields.defaultProps = {
  buttonValue: 'Connect',
  buttonOnClick: null,
}
