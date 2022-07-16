import React from 'react'
import {
  IoBagCheckOutline,
  IoPersonCircleOutline,
  IoLayersOutline,
  IoAirplane,
} from 'react-icons/io5'
import {
  CUSTOMER_ORDERS,
  CUSTOMER_SERVICES,
  CUSTOMER_PROFILE,
} from '../../../constants/routes'

export const customerRoutes = [
  {
    id: 'Customer',

    children: [
      {
        id: 'Find Flights',
        route: CUSTOMER_SERVICES,
        icon: <IoAirplane fontSize={24} />,
      },
      {
        id: 'Booked Flights',
        route: CUSTOMER_ORDERS,
        icon: <IoBagCheckOutline fontSize={24} />,
      },
      {
        id: 'Profile',
        route: CUSTOMER_PROFILE,
        icon: <IoPersonCircleOutline fontSize={24} />,
      },
    ],
  },
]
