import React, { useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
} from '@mui/material'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import tableStyles from '../../../assets/jss/components/TableStyles/tableStyles'
import { PageHeading } from '../../../components/Dashboard/PageHeading'
import { listPayouts } from '../../../slices/businessSlice'
import { RootState } from '../../../app/rootReducer'
import { StyledTableRow } from '../../../components/StyledTableRow'

interface IVendorRefundsProps {}

export const VendorRefunds: React.FC<IVendorRefundsProps> = ({}) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(listPayouts())
  }, [])

  const { payouts } = useSelector((state: RootState) => {
    return {
      payouts: state.business.payouts,
    }
  }, shallowEqual)
  return (
    <>
      <PageHeading
        heading={'Refunds'}
        subHeading={'List of all the payouts'}
      ></PageHeading>
      <TableContainer>
        <Table stickyHeader aria-label='simple table'>
          <TableHead sx={tableStyles.tableHead}>
            <TableCell sx={tableStyles.tableCellForHead}>S.No.</TableCell>
            <TableCell sx={tableStyles.tableCellForHead}>
              Benificiary Name
            </TableCell>
            <TableCell sx={tableStyles.tableCellForHead}>Amount</TableCell>
            <TableCell sx={tableStyles.tableCellForHead}>Country</TableCell>
            <TableCell sx={tableStyles.tableCellForHead}>Created At</TableCell>
          </TableHead>
          <TableBody>
            {payouts.map((payout, key) => {
              return (
                <StyledTableRow key={payout.id}>
                  <TableCell sx={tableStyles.tableCellForBody}>
                    {key + 1}
                  </TableCell>
                  <TableCell sx={tableStyles.tableCellForBody}>
                    <em>
                      {payout.beneficiary.first_name}{' '}
                      {payout.beneficiary.last_name}
                    </em>
                  </TableCell>

                  <TableCell sx={tableStyles.tableCellForBody}>
                    {payout.amount} &nbsp;
                    {payout.payout_currency}
                  </TableCell>
                  <TableCell sx={tableStyles.tableCellForBody}>
                    <em>{payout.beneficiary.country} </em>
                  </TableCell>

                  <TableCell sx={tableStyles.tableCellForBody}>
                    {new Date(payout.created_at).toLocaleTimeString()}
                    &nbsp;
                    {new Date(payout.created_at).toDateString()}
                  </TableCell>
                </StyledTableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
