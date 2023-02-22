import React, { useMemo } from 'react'
import { useTable } from 'react-table'

import { COLUMNS } from './columns'
import MOCK_DATA from './MOCK_DATA.json'
import './table.css'

export const BasicTable = (props) => {
    const columns = useMemo(() => { return COLUMNS }, [])
    const d =  props.info || MOCK_DATA;
    //console.log(props.info.length,props, d)
    const data = useMemo(() => { return d }, [d])

    const tableInstance = useTable({ columns, data });
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;
    return (
        <table {...getTableProps()}>
            <thead>
                {
                    headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getFooterGroupProps()}>
                            {
                                headerGroup.headers.map(column => (
                                    <th{...column.getHeaderProps()}>
                                        {column.render('Header')}
                                    </th>
                                ))
                            }
                        </tr>
                    ))
                }
            </thead>

            <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()}>
                                    {cell.render('Cell')}
                                </td>
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}
