import {
  Typography,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableBody,
} from '@mui/material'
import React from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../../../app/rootReducer'
import { PageHeading } from '../../../components/Dashboard/PageHeading'
import tableStyles from '../../../assets/jss/components/TableStyles/tableStyles'
import { StyledTableRow } from '../../../components/StyledTableRow'

interface IViewVirtualAccountTransactionsProps {}

const ViewVirtualAccountTransactions: React.FC<
  IViewVirtualAccountTransactionsProps
> = () => {
  const { issueBankAccountId } = useParams()

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { bankAccount, transactions, currency } = useSelector(
    (state: RootState) => {
      return {
        bankAccount: state.business.bankAccount,
        transactions: state.business.transactions,
        currency: state.business.currency,
      }
    },
    shallowEqual
  )

  return (
    <>
      <PageHeading
        heading={'Bank Account Transactions'}
        subHeading={bankAccount?.beneficiary_name}
      >
        <Box sx={{ paddingLeft: '1rem' }}>
          <Typography variant='body2' my={2}>
            <strong>Beneficiary Name</strong> &nbsp;
            <em>{bankAccount?.beneficiary_name}</em>
          </Typography>
          <Typography variant='body2' my={2}>
            <strong>Address</strong> &nbsp;
            <em>{bankAccount?.address}</em>
          </Typography>
          <Typography variant='body2' my={2}>
            <strong>Account Number </strong> &nbsp;
            <em>
              {bankAccount?.account_number
                ? bankAccount.account_number
                : bankAccount!.iban}
            </em>
          </Typography>
          <Typography variant='body2' my={2}>
            <strong>Country ISO</strong> &nbsp;
            <em>{bankAccount?.country_iso}</em>
          </Typography>
          <Typography variant='body2' my={2} color='green'>
            <strong>Balance</strong> &nbsp;
            <em>
              {transactions.length > 0
                ? transactions
                    .map((transaction) => transaction.amount)
                    .reduce((accumulator, curr) => accumulator + curr)
                : 0}
              &nbsp;
              {currency}
            </em>
          </Typography>
        </Box>
      </PageHeading>
      <TableContainer>
        <Table stickyHeader aria-label='simple table'>
          <TableHead sx={tableStyles.tableHead}>
            <TableCell sx={tableStyles.tableCellForHead}>S.No.</TableCell>
            <TableCell sx={tableStyles.tableCellForHead}>ID</TableCell>
            <TableCell sx={tableStyles.tableCellForHead}>Amount</TableCell>
            <TableCell sx={tableStyles.tableCellForHead}>Currency</TableCell>
            <TableCell sx={tableStyles.tableCellForHead}>Created At</TableCell>
          </TableHead>
          <TableBody>
            {transactions.length === 0 && (
              <StyledTableRow>
                <TableCell sx={tableStyles.tableCellForBody}></TableCell>
                <TableCell sx={tableStyles.tableCellForBody}></TableCell>
                <TableCell sx={tableStyles.tableCellForBody}>
                  No transaction found
                </TableCell>
                <TableCell sx={tableStyles.tableCellForBody}></TableCell>
                <TableCell sx={tableStyles.tableCellForBody}></TableCell>
              </StyledTableRow>
            )}
            {transactions.map((transaction, key) => {
              return (
                <StyledTableRow key={transaction.id}>
                  <TableCell sx={tableStyles.tableCellForBody}>
                    {key + 1}
                  </TableCell>
                  <TableCell sx={tableStyles.tableCellForBody}>
                    <em>{transaction.id}</em>
                  </TableCell>

                  <TableCell sx={tableStyles.tableCellForBody}>
                    {transaction.amount}
                  </TableCell>
                  <TableCell sx={tableStyles.tableCellForBody}>
                    {transaction.currency}
                  </TableCell>
                  <TableCell sx={tableStyles.tableCellForBody}>
                    {new Date(transaction.created_at).toLocaleTimeString()}
                    &nbsp;
                    {new Date(transaction.created_at).toDateString()}
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

export default ViewVirtualAccountTransactions
