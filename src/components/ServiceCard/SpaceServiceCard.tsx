import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  IconButton,
  CardActions,
  Button,
  Avatar,
  Stack,
  Rating,
  CardMedia,
  Chip,
  CardHeader,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'
import { v4 as uuidv4 } from 'uuid'
import { useDispatch } from 'react-redux'
import VerifiedIcon from '@mui/icons-material/Verified'

// styles
import styles from '../../assets/jss/components/serviceCardStyles'

import { SPACE_SERVICE_ROUTE } from '../../constants/routes'
import { getSpaceServiceByIdForOrder } from '../../slices/spaceServiceSlice'
import { Rate } from '../../constants/models/Rate'

interface ISpaceServiceCardProps {
  name: string
  vendorName: string
  imageUrl: string
  description: string
  rates: Rate[]
  location: string
  averageRating: number
  reviewCount: number
  serviceId: string
  isVerified: boolean
}

const SpaceServiceCard: React.FC<ISpaceServiceCardProps> = ({
  imageUrl,
  location,
  name,
  vendorName,
  description,
  rates,
  averageRating,
  reviewCount,
  serviceId,
  isVerified,
}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  return (
    <Card sx={styles.card}>
      <Box>
        <CardHeader
          avatar={<Avatar aria-label='recipe'>{vendorName[0]}</Avatar>}
          action={isVerified && <VerifiedIcon style={{ color: 'green' }} />}
          title={`${vendorName}`}
          subheader={
            location
              ? location.length > 30
                ? `${location.slice(0, 30)}...`
                : location
              : null
          }
        />

        <Box
          sx={{
            height: '200px',
            overflow: 'hidden',
          }}
        >
          <CardMedia
            component='img'
            height='200'
            image={
              imageUrl === 'no-url' || imageUrl === ''
                ? 'http://www.gravatar.com/avatar'
                : imageUrl
            }
            alt={name}
          />
        </Box>

        <CardContent sx={styles.cardContent}>
          <Box sx={styles.serviceName}>
            <Typography variant='h6'>{name}</Typography>
            <Stack
              spacing={1}
              display='flex'
              direction='row'
              alignItems='center'
            >
              <Rating
                size='small'
                name='read-only'
                value={averageRating}
                readOnly
              />
              <Typography variant='caption' color='text.secondary'>
                {reviewCount}
              </Typography>
            </Stack>
          </Box>

          <Typography variant='body2' color='text.secondary'>
            {description.length > 35
              ? `${description.substring(0, 35)}...`
              : description}
          </Typography>
          <Box sx={styles.chargeContainer}>
            <Typography variant='body2' fontWeight='500'>
              Rates:
            </Typography>
            <FormControl fullWidth>
              <Select
                sx={styles.chargesSelect}
                labelId='charge-select-label'
                id='charge-select'
                placeholder='Select a rate'
                defaultValue={
                  rates.length > 0
                    ? `${rates[0].amount} ${rates[0].currency}`
                    : `0 USD`
                }
              >
                {rates.map((rate: Rate, index: number) => {
                  if (rate.amount > 0) {
                    return (
                      <MenuItem
                        key={uuidv4()}
                        sx={styles.chargeItem}
                        value={`${rate.amount} ${rate.currency}`}
                      >
                        {rate.amount} {rate.currency}
                      </MenuItem>
                    )
                  }
                  return null
                })}
              </Select>
            </FormControl>
          </Box>

          <Box sx={styles.actionContainer}>
            <Button size='small'>
              <Link to={`${SPACE_SERVICE_ROUTE}/${serviceId}`}>Learn More</Link>
            </Button>
            <Button
              size='small'
              variant='contained'
              onClick={() => {
                dispatch(getSpaceServiceByIdForOrder(serviceId, navigate))
              }}
            >
              Buy Now
            </Button>
          </Box>
        </CardContent>
      </Box>
    </Card>
  )
}

export default SpaceServiceCard
