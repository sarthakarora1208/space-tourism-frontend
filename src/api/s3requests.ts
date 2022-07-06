import API from './api'
import { S3_ROUTE } from '../constants/routes'

export async function uploadImageToS3(formData: FormData) {
  try {
    const res = await API.post<{ data: string; success: boolean }>(
      `${S3_ROUTE}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    return res.data.data
  } catch (err) {
    throw err
  }
}
