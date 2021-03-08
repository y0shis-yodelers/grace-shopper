import React, {useMemo, useEffect} from 'react'
import {connect, useDispatch, useSelector} from 'react-redux'
import {useTable} from 'react-table'
import {COLUMNS} from './columns'
import {fetchAllUsers} from '../store/users'

export const AllUsers = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)
  useEffect(() => dispatch(fetchAllUsers()), [])

  // Returns imported columns. Recommended practice by useTable hook
  // since this ensures that the data is not pulled on every render
  // and would reperform logic which would affect performance

  const columns = useMemo(() => COLUMNS, [])

  const tableInstance = useTable({
    columns,
    data: users
  })

  // Destructure functions/arrays from table instance
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = tableInstance

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()} key={column.id}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()} key={row.id}>
              {row.cells.map(cell => {
                return (
                  <td {...cell.getCellProps()} key={cell.id}>
                    {cell.render('Cell')}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default connect()(AllUsers)
