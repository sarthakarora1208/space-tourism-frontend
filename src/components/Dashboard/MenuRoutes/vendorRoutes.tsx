import React from 'react'

import {
  IoBagCheckOutline,
  IoPersonCircleOutline,
  IoLayersOutline,
  IoAlbums,
  IoAirplane,
} from 'react-icons/io5'
import { RiRefund2Fill } from 'react-icons/ri'

import {
  VENDOR_PROFILE,
  VENDOR_SERVICES,
  VENDOR_ORDERS,
  VENDOR_VIRTUAL_ACCOUNTS,
  VENDOR_REFUNDS,
} from '../../../constants/routes'

export const vendorRoutes = [
  {
    id: 'Vendor',

    children: [
      {
        id: 'Flights',
        route: VENDOR_SERVICES,
        icon: <IoAirplane fontSize={24} />,
      },
      {
        id: 'Flight Bookings',
        route: VENDOR_ORDERS,
        icon: <IoBagCheckOutline fontSize={24} />,
      },
      {
        id: 'Virtual Accounts',
        route: VENDOR_VIRTUAL_ACCOUNTS,
        icon: <IoAlbums fontSize={24} />,
      },
      {
        id: 'Refunds',
        route: VENDOR_REFUNDS,
        icon: <RiRefund2Fill fontSize={24} />,
      },
      {
        id: 'Profile',
        route: VENDOR_PROFILE,
        icon: <IoPersonCircleOutline fontSize={24} />,
      },
    ],
  },
]
