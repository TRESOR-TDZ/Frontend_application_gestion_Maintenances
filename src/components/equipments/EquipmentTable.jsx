import { Eye, Edit, Trash2, HardDrive, ChevronDown } from 'lucide-react';
import StatusBadge from '../ui/StatusBadge';
import { useState } from 'react';
import Pagination from '../ui/Pagination';

const statusClasses = {
  operational: 'bg-green-100 text-green-800',
  maintenance: 'bg-yellow-100 text-yellow-800',
  out_of_service: 'bg-red-100 text-red-800'
}

const EquipmentTable = ({ equipments, onViewDetails, currentUser }) => {


  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' })
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const sortedEquipments = [...equipments].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1
    }
    return 0
  })

  const requestSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }))
  }
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedEquipments = sortedEquipments.slice(startIndex, endIndex)


  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">

        {/* entete du tableau  */}
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('name')}>
              <div className="flex items-center">
                Nom
                <ChevronDown className={`ml-1 h-4 w-4 ${sortConfig.key === 'name' && sortConfig.direction === 'desc' ? 'transform rotate-180' : ''}`} />
              </div>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">N° Série</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Local</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Utilisateur</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {/* {equipments.map((equipment) => ( */}
          {paginatedEquipments.map((equipment) => (
            <tr key={equipment.id} className="hover:bg-gray-50">

              {/* colonne du nom et des categories des equipements  */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                    <HardDrive className="h-5 w-5 text-primary" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{equipment.name}</div>
                    <div className="text-sm text-gray-500">{equipment.category}</div>
                  </div>
                </div>
              </td>

              {/* colonne des numero de serie des equipements */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {equipment.serial_number || '-'}
              </td>
              
              {/* colonne des status des equipement  */}
              <td className="px-6 py-4 whitespace-nowrap">
                <StatusBadge status={equipment.status} statusClasses={statusClasses} />
              </td>

              {/* colonne du local a qui on assigne un equipement  */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {equipment.location?.name || equipment.locations?.name || '-'}
              </td>

              {/* colonne de l'utilisateur a qui on assigne un equipement  */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {equipment.user?.name || '-'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-2">
                  <button  onClick={() => onViewDetails(equipment)}  className="text-primary hover:text-primary-600"  title="Voir détails">
                    <Eye className="h-5 w-5" />
                  </button>
                  <button  className="text-gray-600 hover:text-gray-900"  title="Modifier">
                    <Edit className="h-5 w-5" />
                  </button>
                  {(currentUser.role === 'admin' || currentUser.role === 'super_admin') && (
                    <button
                      // onClick={() => onDelete(equipment.id)}
                      className="text-red-600 hover:text-red-900"
                      title="Supprimer"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination 
        currentPage={currentPage}
        totalItems={equipments.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        className="mt-4"
    />
    </div>
  )
}

export default EquipmentTable;