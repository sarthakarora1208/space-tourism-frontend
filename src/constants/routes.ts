export const HOME = '/'
export const ABOUT_US = '/about-us'
export const CONTACT_US = '/contact-us'
export const FAQ = '/faq'

export const BASE_ROUTE = '/api/v1'
export const DASHBOARD_ROUTE = '/dashboard'
export const AUTH_ROUTE = '/auth'
export const BUSINESS_ROUTE = '/business'
export const ORDER_ROUTE = '/order'
export const CUSTOMER_ROUTE = '/customer'
export const VENDOR_ROUTE = '/vendor'
export const REVIEW_ROUTE = '/review'
export const REPLY_ROUTE = '/reply'
export const S3_ROUTE = '/s3'
export const SPACE_SERVICE_ROUTE = '/space-service'

export const LOGIN = `${AUTH_ROUTE}/login`
export const VENDOR_REGISTER = `${AUTH_ROUTE}${VENDOR_ROUTE}/register`
export const CUSTOMER_REGISTER = `${AUTH_ROUTE}${CUSTOMER_ROUTE}/register`
export const REGISTER = `${AUTH_ROUTE}/register`
export const CONFIRM_USER = `${AUTH_ROUTE}/confirm-user`
export const LOGOUT = `${AUTH_ROUTE}/login`
export const GET_ME = `${AUTH_ROUTE}/me`
export const UPDATE_PASSWORD = `${AUTH_ROUTE}/update-password`
export const FORGOT_PASSWORD = `${AUTH_ROUTE}/forgot-password`
export const resetPasssword = (resetToken = ':resetToken') => {
  return `${AUTH_ROUTE}/${resetToken}/reset-password`
}
export const MANAGE_ACCOUNT = `${AUTH_ROUTE}/manage-account`

export const USER_ID = ':userId'
export const BUSINESS_ID = ':businessId'
export const ORDER_ID = ':orderId'

export const CUSTOMER_DASHBOARD = `${CUSTOMER_ROUTE}${DASHBOARD_ROUTE}`
export const CUSTOMER_ORDERS = `${CUSTOMER_DASHBOARD}${ORDER_ROUTE}`

export const VENDOR_DASHBOARD = `${VENDOR_ROUTE}${DASHBOARD_ROUTE}`
export const VENDOR_PROFILE = `${VENDOR_DASHBOARD}/profile`
export const VENDOR_SERVICES = `${VENDOR_DASHBOARD}/services`
export const VENDOR_ORDERS = `${VENDOR_DASHBOARD}${ORDER_ROUTE}`
export const ADD_SERVICE = `${VENDOR_ROUTE}/add`
export const EDIT_SERVICE = `${VENDOR_ROUTE}/:serviceId/edit`

export const editService = (serviceId = ':serviceId') => {
  return `${VENDOR_ROUTE}/${serviceId}/edit`
}

export const CUSTOMER_PROFILE = `${CUSTOMER_DASHBOARD}/profile`
export const CUSTOMER_SERVICES = `${CUSTOMER_DASHBOARD}/services`
export const EDIT_VENDOR_PROFILE = `${VENDOR_DASHBOARD}/edit-profile`
export const EDIT_CUSTOMER_PROFILE = `${CUSTOMER_DASHBOARD}/edit-profile`
