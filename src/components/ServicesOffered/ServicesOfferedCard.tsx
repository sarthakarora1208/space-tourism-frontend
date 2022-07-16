import React, { useEffect } from 'react'
import {
  Box,
  Card,
  Chip,
  IconButton,
  Stack,
  Typography,
  Menu,
  MenuList,
  MenuItem,
  ListItemIcon,
  Button,
  ListItemText,
  useTheme,
  useMediaQuery,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CardMedia,
  FormControl,
  Select,
  CardHeader,
  Avatar,
  CardContent,
} from '@mui/material'
import { v4 as uuidv4 } from 'uuid'
import { useDispatch } from 'react-redux'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'
import { Link, useNavigate } from 'react-router-dom'
import { MdSettings } from 'react-icons/md'
import LanguageIcon from '@mui/icons-material/Language'
import EditIcon from '@mui/icons-material/Edit'
import moment from 'moment'
import Dialog from '../Dialog/Dialog'

import styles from '../../assets/jss/components/serviceCardStyles'
import { SpaceService } from '../../constants/models/SpaceService'

import {
  changeSpaceServiceStatus,
  getSpaceServiceById,
} from '../../slices/spaceServiceSlice'
import { Rate } from '../../constants/models/Rate'

interface IServicesOfferedCardProps {
  service: SpaceService
}

const ServicesOfferedCard: React.FC<IServicesOfferedCardProps> = ({
  service,
}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [availability, setAvailability] = React.useState<any>([])
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleChangeAvailability = () => {
    dispatch(changeSpaceServiceStatus(service.id, !service.isAvailable))
    handleClose()
  }

  useEffect(() => {}, [])

  return (
    <Card sx={styles.card}>
      <Box>
        <IconButton
          aria-label='settings'
          onClick={handleClick}
          sx={styles.iconButton}
          size='small'
        >
          <HiOutlineDotsHorizontal />
        </IconButton>

        <CardMedia
          sx={styles.cardMedia}
          component='img'
          height='200'
          image={service.imageUrl === 'no-url' ? '' : service.imageUrl}
          alt=''
        />

        <CardContent sx={styles.cardContent}>
          <Box sx={styles.serviceName}>
            <Typography variant='h6'>{service.name}</Typography>
          </Box>
          <Box sx={styles.status}>
            <Chip
              size='small'
              color={service.isAvailable ? 'success' : 'error'}
              label={service.isAvailable ? 'Available' : 'Not Available'}
            />
          </Box>
          <Box>
            <Typography variant='body2'>{service.description}</Typography>
          </Box>
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
                defaultValue={`${service.rates[0].amount} ${service.rates[0].currency}`}
              >
                {service.rates.map((rate: Rate, index: number) => {
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
        </CardContent>
      </Box>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem
          onClick={() => {
            dispatch(getSpaceServiceById(service.id, navigate))
            handleClose()
          }}
        >
          <ListItemIcon>
            <EditIcon fontSize='small' />
          </ListItemIcon>

          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleChangeAvailability()}>
          <ListItemIcon>
            <MdSettings fontSize='small' />
          </ListItemIcon>
          <ListItemText>
            {service.isAvailable ? 'Disable' : 'Enable'}
          </ListItemText>
        </MenuItem>
      </Menu>
    </Card>
  )
}

export default ServicesOfferedCard
