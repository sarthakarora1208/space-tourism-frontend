import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

// Material UI
import {
  Grid,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Link,
  Stack,
  Typography,
  CircularProgress,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Paper,
  TableRow,
  useMediaQuery,
} from '@mui/material'
import { Auth } from 'aws-amplify'
import { DropzoneDialog } from 'material-ui-dropzone'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import { useNavigate } from 'react-router-dom'
import { MdAdd, MdEdit } from 'react-icons/md'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { format } from 'date-fns'
import {
  ALLOW_MESSAGES,
  CUSTOMER_ADDRESS,
  CUSTOMER_NAME,
  EMAIL,
  PHONE_NUMBER,
  PROFILE_IMAGE,
} from '../../../constants/customerProfileValues'
import styles from '../../../assets/jss/pages/Customer/CustomerProfileStyles'

import { CustomerDetailFields } from './CustomerDetailFields'
import { CustomerStatusFields } from './CustomerStatusFields'
import { PageHeading } from '../../../components/Dashboard/PageHeading'
import { RootState } from '../../../app/rootReducer'
import {
  getCustomerById,
  uploadCustomerProfileImage,
} from '../../../slices/customerSlice'
// mock data

interface ICustomerProfile {}

const CustomerProfile: React.FC<ICustomerProfile> = () => {
  const isMobile = useMediaQuery('(max-width:900px)')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { customer, loading, error } = useSelector(
    (state: RootState) => state!.customer,
    shallowEqual
  )

  const [open, setOpen] = useState(false)

  useEffect(() => {
    ;(async () => {
      if (!customer) {
        const { username } = await Auth.currentUserInfo()
        dispatch(getCustomerById(username))
      }
    })()
    return () => {}
  }, [])

  return (
    <>
      <PageHeading heading='Profile'>
        <Button
          variant='contained'
          onClick={() => navigate('/customer/dashboard/edit-profile')}
          startIcon={<MdEdit />}
        >
          Edit Profile
        </Button>
      </PageHeading>

      <Box sx={styles.container}>
        <Box sx={styles.cardContainer}>
          <Card sx={styles.profileCardContainer}>
            <CardMedia
              component='img'
              height='200'
              alt=''
              image={
                customer &&
                customer!.profileImageUrl &&
                customer!.profileImageUrl !== 'no-url'
                  ? customer?.profileImageUrl
                  : 'http://www.gravatar.com/avatar?s=400'
              }
            />

            <CardContent>
              <Typography
                gutterBottom
                variant='h6'
                component='h6'
                sx={styles.typographyStyle}
              >
                Customer Details
                <Button
                  variant='text'
                  onClick={() => {
                    setOpen(true)
                  }}
                >
                  <AddAPhotoIcon />
                </Button>
              </Typography>
              <DropzoneDialog
                acceptedFiles={['image/*']}
                cancelButtonText='Cancel'
                submitButtonText='Submit'
                maxFileSize={10240000}
                filesLimit={1}
                open={open}
                onClose={() => setOpen(false)}
                onSave={(files) => {
                  if (files.length > 0) {
                    const file = files[0]
                    const formData = new FormData()
                    formData.append('file', file)
                    //    dispatch(uploadVendorProfileImageUrl(formData, navigate));
                    dispatch(uploadCustomerProfileImage(formData, navigate))
                  }
                  setOpen(false)
                }}
                showPreviews
                showFileNamesInPreview
              />
              <CustomerDetailFields
                fieldName={CUSTOMER_NAME}
                value={customer ? customer!.name : 'name'}
              />
              <Stack direction='row' flexWrap='wrap'>
                <Typography
                  variant='body2'
                  mr='4px'
                  fontWeight={500}
                >{`${EMAIL}: `}</Typography>
                <Typography variant='body2'>
                  <Link href={`mailto:${customer ? customer!.email : ''}`}>
                    {customer && customer!.email}
                  </Link>
                </Typography>
              </Stack>
              <Stack direction='row' flexWrap='wrap'>
                <Typography variant='body2' mr='4px' fontWeight={500}>
                  {`${PHONE_NUMBER}: `}
                </Typography>
                <Typography variant='body2'>
                  <Link href={`tel:${customer ? customer!.phone : '-'}`}>
                    {customer!.phone ? customer!.phone : '-'}
                  </Link>
                </Typography>
              </Stack>
              <CustomerDetailFields
                fieldName={CUSTOMER_ADDRESS}
                value={customer!.address ? customer!.address : '-'}
              />
            </CardContent>
          </Card>

          <Box sx={styles.detailContainer}>
            {/* <Card sx={styles.cardStyle}>
              <CardContent>
                <Typography gutterBottom variant="h6" component="h6">
                  Account Details
                </Typography>
                <CustomerStatusFields
                  fieldName={ALLOW_MESSAGES}
                  value="No"
                  isActive
                  buttonOnClick={() => {}}
                  buttonValue="VERIFY"
                />
              </CardContent>
            </Card> */}
          </Box>
        </Box>
      </Box>
    </>
  )
}
export default CustomerProfile
