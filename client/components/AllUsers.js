import React, {useMemo, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useTable, useSortBy, usePagination} from 'react-table'
import {USER_COLUMNS} from './table_columns/user_columns'
import {fetchAllUsers} from '../store/users'

export const AllUsers = () => {
  // useDispatch gives us access to dispatch
  const dispatch = useDispatch()

  // useSelector is the equivalent of mapStateToProps
  const users = useSelector(state => state.users)
  const isAdmin = useSelector(state => state.user.isAdmin)

  // useEffect asks us to define a side-effect fn
  // and invoke it immediately in the first arg, which
  // is a callback; the second arg is the dataType, which
  // in this case is an array
  useEffect(() => {
    const getUsers = () => dispatch(fetchAllUsers())
    getUsers()
  }, [])

  // Returns imported columns. Recommended practice by useTable hook
  // since this ensures that the data is not pulled on every render
  // and would reperform logic which would affect performance
  const columns = useMemo(() => USER_COLUMNS, [])

  // Destructure functions/arrays from table instance
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    prepareRow
  } = useTable(
    {
      columns,
      data: users
    },
    useSortBy,
    usePagination
  )

  const {pageIndex} = state

  return (
    <div>
      {isAdmin ? (
        <>
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
                        {column.isSorted
                          ? column.isSortedDesc ? ' 🔽' : ' 🔼'
                          : ''}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map(row => {
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
          <div>
            <span>
              Page{' '}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{' '}
            </span>
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
              Previous
            </button>
            <button onClick={() => nextPage()} disabled={!canNextPage}>
              Next
            </button>
          </div>
        </>
      ) : (
        <div className="container403">
          <div className="gandalf">
            <div className="fireball" />
            <div className="skirt" />
            <div className="sleeves" />
            <div className="shoulders">
              <div className="hand left" />
              <div className="hand right" />
            </div>
            <div className="head">
              <div className="hair" />
              <div className="beard" />
            </div>
          </div>
          <div className="message">
            <h1>403 - You Shall Not Pass</h1>
            <p>
              Uh oh, Gandalf is blocking the way!
              <br />
              Maybe you have a typo in the url? Or you meant to go to a
              different location? Like...Hobbiton?
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default AllUsers
