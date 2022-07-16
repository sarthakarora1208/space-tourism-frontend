import React, { useState, useEffect } from 'react'

// Material UI
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Link,
  Stack,
  Typography,
  useMediaQuery,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Paper,
  TableRow,
} from '@mui/material'
import { Auth } from 'aws-amplify'
import { DropzoneDialog } from 'material-ui-dropzone'
import { format } from 'date-fns'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { MdEdit } from 'react-icons/md'
// React Router
import { useNavigate } from 'react-router-dom'
import { RootState } from '../../../app/rootReducer'

import {
  BUSINESS_ADDRESS,
  EMAIL,
  OWNER_NAME,
  PHONE_NUMBER,
  PROFILE_IMAGE,
  USER_NAME,
} from '../../../constants/vendorProfileValues'

import { VendorDetailFields } from './VendorDetailFields'
import { VendorStatusFields } from './VendorStatusFields'
import { PageHeading } from '../../../components/Dashboard/PageHeading'

import styles from '../../../assets/jss/pages/Vendor/VendorProfileStyles'

import {
  getVendorById,
  uploadVendorProfileImageUrl,
} from '../../../slices/vendorSlice'

import { EDIT_VENDOR_PROFILE } from '../../../constants/routes'
import { verifyIdentity } from '../../../slices/businessSlice'
import { UploadImage } from '../../../components/UploadImage'

interface IVendorProfile {}

const VendorProfile: React.FC<IVendorProfile> = () => {
  const isMobile = useMediaQuery('(max-width:900px)')

  const { vendor, loading, error } = useSelector(
    (state: RootState) => state.vendor,
    shallowEqual
  )

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [open, setOpen] = useState(false)

  const isActive = false

  return (
    <Box sx={styles.root}>
      <PageHeading heading='My Profile' subHeading='Manage your profile'>
        <Button
          variant='contained'
          onClick={() => navigate(EDIT_VENDOR_PROFILE)}
          startIcon={<MdEdit />}
        >
          Edit Profile
        </Button>
        <Button variant='text' onClick={() => navigate(`/v/${vendor!.id}`)}>
          View Public Profile
        </Button>
      </PageHeading>

      <Box sx={styles.container}>
        <Box sx={styles.cardContainer}>
          <Card sx={styles.profileCardContainer}>
            <Box sx={styles.cardMedia}>
              {/* <img src="https://via.placeholder.com/1000x200" alt="" /> */}
            </Box>
            <CardContent>
              <Box
                sx={{
                  width: '150px',
                  height: '150px',
                  borderRadius: '50%',
                  position: 'absolute',
                  aspectRatio: '1/1',
                  border: '4px solid #fff',
                  top: '120px',
                  left: '16px',
                }}
              >
                <img
                  style={{
                    borderRadius: '50%',
                    backgroundPosition: 'center',
                    objectFit: 'fill',
                  }}
                  src={
                    vendor &&
                    vendor!.profileImageUrl &&
                    vendor!.profileImageUrl !== 'no-url'
                      ? vendor?.profileImageUrl
                      : 'http://www.gravatar.com/avatar'
                  }
                  width='100%'
                  height='100%'
                  alt={PROFILE_IMAGE}
                />
              </Box>

              <Box sx={{ marginTop: '5rem' }}>
                <Typography
                  gutterBottom
                  variant='h5'
                  component='h5'
                  sx={styles.typographyStyle}
                >
                  {vendor?.business?.businessName}

                  <Button
                    variant='text'
                    onClick={() => {
                      setOpen(true)
                    }}
                  >
                    <AddAPhotoIcon />
                  </Button>
                </Typography>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: ['1fr', '1fr', '1fr 1fr', '1fr 1fr'],
                  }}
                >
                  <VendorDetailFields
                    fieldName={OWNER_NAME}
                    value={vendor?.name}
                  />
                  <VendorDetailFields
                    fieldName={USER_NAME}
                    value={vendor?.username}
                  />
                  <Stack direction='row' flexWrap='wrap'>
                    <Typography
                      variant='body2'
                      mr='4px'
                      fontWeight={500}
                    >{`${EMAIL}: `}</Typography>
                    <Typography variant='body2'>
                      <Link href={`mailto:${vendor?.email}`}>
                        {vendor?.email}
                      </Link>
                    </Typography>
                  </Stack>
                  <Stack direction='row' flexWrap='wrap'>
                    <Typography
                      variant='body2'
                      mr='4px'
                      fontWeight={500}
                    >{`${PHONE_NUMBER}: `}</Typography>
                    <Typography variant='body2'>
                      <Link href={`tel:${vendor?.phone}`}>{vendor?.phone}</Link>
                    </Typography>
                  </Stack>
                  <VendorDetailFields
                    fieldName={BUSINESS_ADDRESS}
                    value={`${vendor?.business?.address}`}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
          <Box sx={styles.detailContainer}>
            <Card sx={styles.cardStyle}>
              <CardContent>
                <Typography gutterBottom variant='h6' component='h6'>
                  Account Details
                </Typography>
                <VendorStatusFields
                  fieldName={'RAPYD VERIFIED'}
                  value={vendor!.business!.isVerified ? 'Linked' : 'Not linked'}
                  isActive={vendor!.business!.isVerified ? false : false}
                  buttonOnClick={() => {
                    if (vendor && vendor.business) {
                      dispatch(verifyIdentity(vendor!.business!.id))
                    }
                  }}
                  buttonValue={'verify'}
                />
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
      <UploadImage isOpen={open} handleClose={() => setOpen(false)} />
    </Box>
  )
}
export default VendorProfile
