import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { Grid, Container } from '@mui/material'
import { setSpaceServiceImageUrl } from '../../../slices/spaceServiceSlice'
import EnhancedAddOrEditSpaceServiceForm from './EnhancedAddOrEditSpaceServiceForm'

interface IAddOrEditSpaceServiceProps {}

const AddOrEditSpaceService: React.FC<IAddOrEditSpaceServiceProps> = (
  props
) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { pathname } = useLocation()

  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    if (pathname.split('/').includes('edit')) {
      setIsEdit(true)
    }
  }, [])

  useEffect(() => {
    dispatch(setSpaceServiceImageUrl('no-url'))
  }, [])
  return (
    <Container maxWidth='md'>
      <Grid
        container
        direction='row'
        justifyContent='flex-start'
        alignItems='flex-start'
      >
        <Grid item xs={12}>
          <div style={{ padding: '1em' }}>
            <EnhancedAddOrEditSpaceServiceForm
              navigate={navigate}
              isEdit={isEdit}
            />
          </div>
        </Grid>
      </Grid>
    </Container>
  )
}
export default AddOrEditSpaceService
