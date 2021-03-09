import {format} from 'phone-fns'

export const COLUMNS = [
  {
    Header: 'Id',
    accessor: 'id'
  },
  {
    Header: 'Name',
    accessor: 'name'
  },
  {
    Header: 'Email Address',
    accessor: 'email'
  },
  {
    Header: 'Phone Number',
    accessor: 'phoneNumber',
    Cell: ({value}) => {
      return format('(NNN) NNN-NNNN', value)
    }
  }
]
