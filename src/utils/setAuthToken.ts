// tslint: disable

import API from '../api/api'

export const setAuthToken = async (token?: string) => {
  if (token) {
    // Apply to every request
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`
    localStorage.setItem('token', token)
    //console.log(axios.defaults.headers.common['Authorization']);
  } else {
    // Delete auth header
    delete API.defaults.headers.common['Authorization']
    localStorage.removeItem('token')
  }
}
