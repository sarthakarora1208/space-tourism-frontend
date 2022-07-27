import React from 'react'
import { Stack, Typography, Container, Box } from '@mui/material'
import {
  MdEditCalendar,
  MdEmojiPeople,
  MdOutlineListAlt,
  MdPayment,
  MdOutlineFlight,
} from 'react-icons/md'
import { AiFillRocket } from 'react-icons/ai'

const HowItWorks = () => {
  const data = [
    {
      icon: <MdEmojiPeople color='black' size={42} />,
      title: '1. Register',
      description: 'Create an account to look up your service',
    },

    {
      icon: <MdOutlineListAlt color='black' size={42} />,
      title: '2. Find Flight',
      description: 'On out platform you can find or list your space flight',
    },
    {
      icon: <MdEditCalendar color='black' size={42} />,
      title: '3. Lock in a date',
      description: 'Find a date that suits you',
    },
    {
      icon: <MdPayment color='black' size={42} />,
      title: '4. Pay',
      description: 'Pay securely through out platform',
    },

    {
      icon: <AiFillRocket color='black' size={42} />,
      title: '5. Flight',
      description: 'Fly off to space!',
    },
  ]

  return (
    <div className='mx-auto max-w-7xl py-20 px-8'>
      <div className='mb-8 text-center'>
        <h2 className='text-base font-semibold uppercase tracking-wide text-[#32355D]'></h2>
        <p className='mt-2 text-3xl font-bold leading-8 text-[#000000] sm:text-4xl'>
          How it works?
        </p>
        <p className='mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto'>
          Understand how Keyano works and how you can use it to book your trip
          to space
        </p>
      </div>
      <Stack
        m={5}
        direction={['column', 'column', 'row', 'row']}
        gap={3}
        alignItems={['center', 'center', 'flex-start', 'flex-start']}
        justifyContent='space-between'
      >
        {data.map(({ icon, title, description }) => (
          <Stack
            key={title}
            justifyContent='center'
            alignItems='center'
            sx={{
              width: ['100%', '300px', '200px', '200px'],
            }}
          >
            <Box
              sx={{
                backgroundColor: 'secondary.light',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                width: '60px',
                height: '60px',
                padding: '10px',
                marginBottom: '10px',
              }}
            >
              {icon}
            </Box>

            <Typography variant='h6' fontWeight='500' my={1} textAlign='center'>
              {title}
            </Typography>
            <Typography
              color='text.secondary'
              variant='body2'
              textAlign='center'
            >
              {description}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </div>
  )
}

export default HowItWorks
