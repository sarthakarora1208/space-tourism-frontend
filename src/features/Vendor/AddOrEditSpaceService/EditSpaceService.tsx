import React, { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { Grid, Container } from '@mui/material'
import { setSpaceServiceImageUrl } from '../../../slices/spaceServiceSlice'
import EnhancedAddOrEditSpaceServiceForm from './EnhancedAddOrEditSpaceServiceForm'
import { RootState } from '../../../app/rootReducer'

interface IAddOrEditSpaceServiceProps {}

const AddOrEditSpaceService: React.FC<IAddOrEditSpaceServiceProps> = (
  props
) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { pathname } = useLocation()

  const [isEdit, setIsEdit] = useState(false)

  const { spaceService } = useSelector((state: RootState) => {
    return {
      spaceService: state.spaceService.spaceService,
    }
  }, shallowEqual)

  useEffect(() => {
    if (pathname.split('/').includes('edit')) {
      setIsEdit(true)
    }
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
              name={spaceService!.name}
              description={spaceService!.description}
              seats={spaceService!.seats}
              startTime={spaceService!.startTime}
              endTime={spaceService!.endTime}
              id={spaceService!.id}
              isEdit={isEdit}
              navigate={navigate}
            />
          </div>
        </Grid>
      </Grid>
    </Container>
  )
}
export default AddOrEditSpaceService
