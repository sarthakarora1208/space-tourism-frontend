import React from 'react'

import {
  IoBagCheckOutline,
  IoPersonCircleOutline,
  IoLayersOutline,
} from 'react-icons/io5'
import {
  VENDOR_PROFILE,
  VENDOR_SERVICES,
  VENDOR_ORDERS,
} from '../../../constants/routes'

export const vendorRoutes = [
  {
    id: 'Vendor',

    children: [
      {
        id: 'Orders',
        route: VENDOR_ORDERS,
        icon: <IoBagCheckOutline fontSize={24} />,
      },
      {
        id: 'Services Offered',
        route: VENDOR_SERVICES,
        icon: <IoLayersOutline fontSize={24} />,
      },
      {
        id: 'Profile',
        route: VENDOR_PROFILE,
        icon: <IoPersonCircleOutline fontSize={24} />,
      },
    ],
  },
]
