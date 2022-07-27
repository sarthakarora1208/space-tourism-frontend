import React from 'react'
import {
  HiAnnotation as AnnotationIcon,
  HiGlobeAlt as GlobeAltIcon,
  HiOutlineLightningBolt as LightningBoltIcon,
  HiCurrencyDollar as PaymentIcon,
} from 'react-icons/hi'

const features = [
  {
    name: 'Accept payments from across the world',
    description:
      'Virtual accounts help you accept payments in multiple currencies. You can accept payments in multiple currencies and easily convert them to your local currency.',
    icon: GlobeAltIcon,
  },
  {
    name: 'Payment methods',
    description:
      'Get instant access to your customers preferred payment methods.',
    icon: PaymentIcon,
  },
  {
    name: 'Lightning fast refunds',
    description: 'Automatically manage your refunds with our refund system.',
    icon: LightningBoltIcon,
  },
  {
    name: 'Customer support',
    description: 'Manage all your customers from a single unified dashboard.',
    icon: AnnotationIcon,
  },
]

const Features: React.FC = () => {
  return (
    <div className='bg-slate-50 py-20'>
      <div className='mx-auto max-w-7xl px-8 sm:px-8 lg:px-8'>
        <div className='lg:text-center'>
          <h2 className='text-base font-semibold uppercase tracking-wide text-grey-500'>
            Features
          </h2>
          <p className='mt-2 text-3xl font-bold leading-8 text-[black] sm:text-4xl'>
            Why register as a Space Vendor?
          </p>
          <p className='mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto'>
            Keyano offers best in class service to help you manage customers,
            sell tickets and issue refunds.
          </p>
        </div>

        <div className='mt-10'>
          <dl className='space-y-10 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 md:space-y-0'>
            {features.map((feature) => (
              <div key={feature.name} className='relative'>
                <dt>
                  <div className='absolute flex h-12 w-12 items-center justify-center rounded-md bg-[#000000] text-white'>
                    <feature.icon className='h-6 w-6' aria-hidden='true' />
                  </div>
                  <p className='ml-16 text-lg font-medium leading-6 text-gray-900'>
                    {feature.name}
                  </p>
                </dt>
                <dd className='mt-2 ml-16 text-base text-gray-500'>
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
export default Features
