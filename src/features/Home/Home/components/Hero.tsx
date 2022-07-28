import React from 'react'
import { Button } from '@mui/material'

// images
import HeaderImage from '../../../../assets/images/Keyano-logo.png'
import { useNavigate } from 'react-router-dom'
import { LOGIN } from '../../../../constants/routes'

const Hero: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div className='relative mx-auto overflow-hidden bg-white '>
      <div className='mx-auto max-w-7xl'>
        <div className='relative z-10 bg-white pb-8 lg:w-full lg:max-w-2xl lg:py-24 '>
          <svg
            className='absolute inset-y-0 right-0 hidden h-full w-48 translate-x-1/2 transform text-white lg:block'
            fill='currentColor'
            viewBox='0 0 100 100'
            preserveAspectRatio='none'
            aria-hidden='true'
          >
            <polygon points='50,0 100,0 50,100 0,100' />
          </svg>

          <div className='relative px-4 pt-6 sm:px-6 lg:px-0' />

          <main className='mx-auto max-w-7xl px-8 py-10 sm:mt-12 sm:px-8 md:py-4 lg:px-8'>
            <div className='text-center lg:text-left'>
              <h1 className='flex flex-col gap-2 text-4xl  font-extrabold text-gray-900 sm:text-5xl md:text-6xl'>
                <span className='block xl:inline'>Space Travel</span>
                <span className='block text-[grey] xl:inline'>
                  Book your flight
                </span>
              </h1>
              <p className='mt-5 text-sm text-gray-600 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-base md:mt-5 md:text-lg lg:mx-0'>
                Keyano is world's first space travel marketplace
              </p>
              <div className='mt-5 flex justify-center gap-3 sm:mt-8 sm:flex-row lg:justify-start'>
                <div className='mt-3 sm:mt-0'>
                  <Button
                    variant='contained'
                    size='large'
                    onClick={() => {
                      navigate(LOGIN)
                    }}
                  >
                    Book a Flight
                  </Button>
                </div>

                <div className='mt-3 sm:mt-0 sm:ml-3'>
                  <Button
                    variant='outlined'
                    size='large'
                    onClick={() => {
                      navigate(LOGIN)
                    }}
                  >
                    Add a Flight
                  </Button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className='md:block lg:absolute lg:inset-y-0 lg:right-40'>
        <img
          className='h-full w-full object-cover sm:h-72 md:h-96 lg:h-full lg:w-full'
          src={HeaderImage}
          alt=''
        />
      </div>
    </div>
  )
}

export default Hero
