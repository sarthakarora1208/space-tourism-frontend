import React from 'react'
import { BsTwitter, BsFacebook, BsInstagram, BsLinkedin } from 'react-icons/bs'
import { FaMedium } from 'react-icons/fa'
//import Logo from "../../assets/images/Logo/logo-200px.png";

export const Footer = () => {
  return (
    <footer
      className='relative bottom-0 left-0 right-0 w-full bg-[#000000] pt-16 pb-6 '
      // style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}
    >
      <div className='container mx-auto mb-6 px-4'>
        <div className='flex flex-wrap'>
          <div className='w-full px-4 lg:w-6/12'>
            {/* <img
              alt=""
              src={Logo}
              className="mb-3 w-28 rounded-lg bg-slate-50 px-3 py-2 align-middle"
            /> */}
            <h4 className='1text-white mb-4 text-3xl font-semibold text-gray-50'>
              Let&apos;s keep in touch!
            </h4>
            <h5 className='mt-0 mb-2 text-lg text-gray-50'>
              Find us on any of these platforms.
            </h5>
            <div className='mt-6'>
              <a
                href=''
                target='_blank'
                rel='noopener noreferrer'
                className='align-center mr-2 h-10 w-10 items-center justify-center rounded-full bg-blue-400 p-3 font-normal text-white shadow-lg outline-none focus:outline-none'
                type='button'
              >
                <BsTwitter />
              </a>
              <a
                href=''
                target='_blank'
                rel='noopener noreferrer'
                className='align-center mr-2 h-10 w-10 items-center justify-center rounded-full bg-blue-600 p-3 font-normal text-white shadow-lg outline-none focus:outline-none'
                type='button'
              >
                <BsFacebook />
              </a>
              <a
                href=''
                target='_blank'
                rel='noopener noreferrer'
                className='align-center mr-2 h-10 w-10 items-center justify-center rounded-full bg-pink-400 p-3 font-normal text-white shadow-lg outline-none focus:outline-none'
                type='button'
              >
                <BsInstagram />
              </a>
              <a
                href=''
                target='_blank'
                rel='noopener noreferrer'
                className='align-center mr-2 h-10 w-10 items-center justify-center rounded-full bg-gray-900 p-3 font-normal text-white shadow-lg outline-none focus:outline-none'
                type='button'
              >
                <BsLinkedin />
              </a>
              <a
                href=''
                target='_blank'
                rel='noopener noreferrer'
                className='align-center mr-2 h-10 w-10 items-center justify-center rounded-full bg-white p-3 font-normal text-gray-900 shadow-lg outline-none focus:outline-none'
                type='button'
              >
                <FaMedium />
              </a>
            </div>
          </div>
          <div className='lg-mt-2 mt-8 w-full lg:w-6/12 '>
            <div className='items-top mb-6 flex flex-wrap'>
              <div className='ml-auto w-full px-4 lg:w-4/12'>
                <span className='mb-2 block text-base font-bold uppercase text-slate-50'>
                  Useful Links
                </span>
                <ul className='list-unstyled'>
                  <li>
                    <a
                      className='block pb-2 text-sm font-semibold text-slate-50 underline hover:text-slate-100'
                      href='/'
                    >
                      Home
                    </a>
                  </li>

                  <li>
                    <a
                      className='block pb-2 text-sm font-semibold text-slate-50 underline hover:text-slate-100'
                      href='/about-us'
                    >
                      About Us
                    </a>
                  </li>
                  <li>
                    <a
                      className='block pb-2 text-sm font-semibold text-slate-50 underline hover:text-slate-100'
                      href='/faq'
                    >
                      FAQ
                    </a>
                  </li>
                  <li>
                    <a
                      className='block pb-2 text-sm font-semibold text-slate-50 underline  only:hover:text-slate-100'
                      href='/contact-us'
                    >
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
