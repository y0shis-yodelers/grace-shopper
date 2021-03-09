import React, {useMemo, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useTable, useSortBy} from 'react-table'
import {PRODUCT_COLUMNS} from './table_columns/product_columns'
import {fetchAdminAllProducts} from '../store/products'

export const AdminAllProducts = () => {
  // useDispatch gives us access to dispatch
  const dispatch = useDispatch()

  // useSelector is the equivalent of mapStateToProps
  const products = useSelector(state => state.products)

  // useEffect asks us to define a side-effect fn
  // and invoke it immediately in the first arg, which
  // is a callback; the second arg is the dataType, which
  // in this case is an array
  useEffect(() => {
    const getProducts = () => dispatch(fetchAdminAllProducts())
    getProducts()
  }, [])

  // Returns imported columns. Recommended practice by useTable hook
  // since this ensures that the data is not pulled on every render
  // and would reperform logic which would affect performance
  const columns = useMemo(() => PRODUCT_COLUMNS, [])

  // Destructure functions/arrays from table instance
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable(
    {
      columns,
      data: products
    },
    useSortBy
  )

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup, headerIdx) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={headerIdx}>
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                key={column.id}
              >
                {column.render('Header')}
                <span>
                  {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                </span>
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
              {row.cells.map((cell, cellIdx) => {
                return (
                  <td {...cell.getCellProps()} key={cellIdx}>
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

export default AdminAllProducts
