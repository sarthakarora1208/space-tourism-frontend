import React from 'react'
import {
  Toolbar,
  IconButton,
  Typography,
  Box,
  Link,
  Avatar,
  MenuItem,
  Menu,
  ListItemIcon,
  useScrollTrigger,
  useTheme,
  useMediaQuery,
  Slide,
} from '@mui/material'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { IoSettingsOutline, IoLogOutOutline } from 'react-icons/io5'
import { AppBar } from './StyledAppBar'
import styles from '../../assets/jss/components/DashboardLayoutStyles/HeaderStyles'
import { RootState } from '../../app/rootReducer'
import { logout } from '../../slices/authSlice'
import { USER_ROLE } from '../../constants/userRoles'
import { CUSTOMER_PROFILE, VENDOR_PROFILE } from '../../constants/routes'

interface IHeaderProps {
  handleDrawerOpen: () => void
  open: boolean
}

export const Header: React.FC<IHeaderProps> = ({ handleDrawerOpen, open }) => {
  const theme = useTheme()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const matches = useMediaQuery(theme.breakpoints.up('md'))
  const trigger = useScrollTrigger()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const avatarMenuOpen = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleLogout = () => {
    dispatch(logout(navigate))
    setAnchorEl(null)
  }

  const handleSettings = (user: number) => {
    if (user === USER_ROLE.CUSTOMER) {
      navigate(`${CUSTOMER_PROFILE}`)
    } else if (user === USER_ROLE.VENDOR) {
      navigate(`${VENDOR_PROFILE}`)
    }
  }

  const slideIn = matches || !trigger

  const { name, user } = useSelector((state: RootState) => {
    return {
      name: state.auth.name,
      user: state.auth.role,
    }
  }, shallowEqual)

  return (
    <Slide in={slideIn}>
      <AppBar position='fixed' open={open}>
        <Toolbar
          sx={{
            ...styles.nav,
            ...(open && styles.navOpen),
            ...(trigger && styles.navTrigger),
          }}
        >
          <Typography sx={styles.heading} noWrap component='h6'>
            Keyano
          </Typography>
          <Box sx={styles.navLinks}>
            <IconButton
              sx={{
                borderRadius: 1,
              }}
              id='basic-button'
              aria-controls={avatarMenuOpen ? 'basic-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={avatarMenuOpen ? 'true' : undefined}
              onClick={handleClick}
            >
              <Typography
                variant='body2'
                sx={{
                  color: 'primary.main',
                }}
              >
                {name}
              </Typography>
              <Avatar sx={styles.avatar}>{name[0]}</Avatar>
            </IconButton>

            <Menu
              id='basic-menu'
              anchorEl={anchorEl}
              open={avatarMenuOpen}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem
                onClick={() => {
                  handleClose()
                  handleSettings(user)
                }}
              >
                <ListItemIcon>
                  <IoSettingsOutline fontSize={20} />
                </ListItemIcon>
                Settings
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleLogout()
                  handleClose()
                }}
              >
                <ListItemIcon>
                  <IoLogOutOutline fontSize={24} />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Slide>
  )
}
