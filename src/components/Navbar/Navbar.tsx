import * as React from 'react'
import { useDispatch } from 'react-redux'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { Stack } from '@mui/material'
import { Link } from 'react-router-dom'

//import Logo from "../../assets/images/Logo/logo-200px.png";
import { CUSTOMER_REGISTER, VENDOR_REGISTER } from '../../constants/routes'

export const Navbar = () => {
  const dispatch = useDispatch()
  // For Mobile view
  const [anchorNav, setAnchorNav] = React.useState<null | HTMLElement>(null)
  const [anchorService, setAnchorService] = React.useState<null | HTMLElement>(
    null
  )
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorNav(null)
  }

  const handleOpenAnchorService = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorService(event.currentTarget)
  }

  const handleCloseAnchorService = () => {
    setAnchorService(null)
  }

  // For sign up

  const handleSignUpClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleSignUpClose = () => {
    setAnchorEl(null)
  }

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Box sx={{ ml: 5, display: { xs: 'none', md: 'flex' } }}>
            {/* <Link to='/'>
              <img src={Logo} alt='logo' className='mt-4 h-16 w-16 p-2' />
            </Link> */}
          </Box>

          {/* <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mt: 2, ml: 5, display: { xs: "none", md: "flex" } }}
            color="black"
          >
            LOGO
          </Typography> */}

          <Box
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            style={{
              fontFamily: "'Baloo 2', sans-serif",
            }}
          >
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='primary'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to='/'>
                  <Typography textAlign='center' color='primary'>
                    Home
                  </Typography>
                </Link>
              </MenuItem>

              <MenuItem>
                <Typography
                  textAlign='center'
                  id='basic-button'
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup='true'
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleSignUpClick}
                  color='primary'
                >
                  Sign up
                </Typography>
                <Menu
                  id='basic-menu'
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleSignUpClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <Link to={VENDOR_REGISTER}>
                    <MenuItem
                      onClick={() => {
                        handleSignUpClose()
                        handleCloseNavMenu()
                      }}
                    >
                      Vendor
                    </MenuItem>
                  </Link>

                  <Link to={CUSTOMER_REGISTER}>
                    <MenuItem
                      onClick={() => {
                        handleSignUpClose()
                        handleCloseNavMenu()
                      }}
                    >
                      Parent
                    </MenuItem>
                  </Link>
                </Menu>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to='/auth/login'>
                  <Typography textAlign='center' color='secondary.main'>
                    Login
                  </Typography>
                </Link>
              </MenuItem>
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            {/* <Link to='/'>
              <img src={Logo} alt='logo' className='mt-4 mr-8 h-16 w-16 p-2' />
            </Link> */}
          </Box>
          <Stack
            flexGrow={1}
            direction='row'
            justifyContent='space-between'
            alignItems='center'
            sx={{
              display: { xs: 'none', md: 'flex' },
              ml: 4,
            }}
          >
            <Stack
              direction='row'
              alignItems='center'
              spacing={2}
              sx={{
                display: { xs: 'none', md: 'flex' },
                flexGrow: 1,
                '&:hover': { cursor: 'pointer' },
                '& > *': {
                  display: 'block',
                  color: 'primary.main',
                  fontWeight: '500',
                },
              }}
            >
              <Link to='/'>
                <Typography fontWeight='600'>Home</Typography>
              </Link>
            </Stack>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                flexGrow: 1,
                gap: 2,
              }}
            >
              <Button
                variant='text'
                id='basic-button'
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
                onClick={handleSignUpClick}
                endIcon={<ArrowDropDownIcon />}
              >
                Sign up
              </Button>

              <div>
                <Link to='/auth/login'>
                  <Button
                    variant='contained'
                    sx={{
                      backgroundColor: '#000000',
                    }}
                  >
                    Login
                  </Button>
                </Link>
              </div>
            </Box>
          </Stack>

          <Menu
            id='basic-menu'
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleSignUpClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <Link to={VENDOR_REGISTER}>
              <MenuItem onClick={handleSignUpClose}>Space Vendor</MenuItem>
            </Link>
            <Link to={CUSTOMER_REGISTER}>
              <MenuItem onClick={handleSignUpClose}>Customer</MenuItem>
            </Link>
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
