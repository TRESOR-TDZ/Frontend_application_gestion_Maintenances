import { useEffect, useState } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'

const Table = ({ columns, data, className = '', onRowClick, sortable = true }) => {
  const [sortedData, setSortedData] = useState(data)
  const [sortConfig, setSortConfig] = useState(null)

  useEffect(() => {
    setSortedData(data)
  }, [data])

  const handleSort = (key) => {
    if (!sortable) return

    let direction = 'ascending'
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }

    const sorted = [...data].sort((a, b) => {
      // Handle nested objects if needed
      const aValue = typeof a[key] === 'object' ? a[key]?.toString() : a[key]
      const bValue = typeof b[key] === 'object' ? b[key]?.toString() : b[key]

      if (aValue < bValue) {
        return direction === 'ascending' ? -1 : 1
      }
      if (aValue > bValue) {
        return direction === 'ascending' ? 1 : -1
      }
      return 0
    })

    setSortedData(sorted)
    setSortConfig({ key, direction })
  }

  const getSortIcon = (key) => {
    if (!sortable || !sortConfig || sortConfig.key !== key) return null
    return sortConfig.direction === 'ascending' ? (
      <ChevronUp className="ml-1 h-4 w-4 inline" />
    ) : (
      <ChevronDown className="ml-1 h-4 w-4 inline" />
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className={`min-w-full divide-y divide-gray-200 ${className}`}>
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th key={column.accessor} scope="col" className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                sortable ? 'cursor-pointer hover:bg-gray-100' : ''
                }`}
                onClick={() => sortable && handleSort(column.accessor)}
              >
                <div className="flex items-center">
                  {column.header}
                  {getSortIcon(column.accessor)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedData.length > 0 ? (
            sortedData.map((row, rowIndex) => (
              <tr key={rowIndex} className={onRowClick ? 'hover:bg-gray-50 cursor-pointer' : ''} onClick={() => onRowClick && onRowClick(row)}>
                {columns.map((column) => (
                  <td key={`${rowIndex}-${column.accessor}`} className="px-6 py-4 whitespace-nowrap">
                    {column.render ? column.render(row) : row[column.accessor]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="px-6 py-4 text-center text-gray-500">
                Aucune donnée disponible
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Table