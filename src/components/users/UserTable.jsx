import { Pencil, Trash2, ChevronDown, User as UserIcon, Eye } from 'lucide-react';
import { useState } from 'react';
import StatusBadge from '../ui/StatusBadge';
import UserDetailsModal from './UserDetailsModal';

const UserTable = ({ users, onEdit, onDelete, currentUserId }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' })
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const sortedUsers = [...users].sort((a, b) => {
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

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <SortableHeader label="Nom" sortKey="name" sortConfig={sortConfig} onSort={requestSort} />
            <SortableHeader label="Email" sortKey="email" sortConfig={sortConfig} onSort={requestSort} />
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> Rôle </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> Statut </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> Actions </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedUsers.map(user => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                    <UserIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    {/* <div className="text-sm text-gray-500">{user.department || '-'}</div> */}
                     {/* a ajouter car ce n'est pas encore effectif cote backend  le departement */}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"> {user.email} </td>
              <td className="px-6 py-4 whitespace-nowrap"> <RoleBadge role={user.role} /> </td>
              <td className="px-6 py-4 whitespace-nowrap"> <StatusBadge status={user.status} /> </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-2">
                  <button  onClick={() => {   setSelectedUser(user);   setIsDetailsOpen(true); }}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <Eye className="h-5 w-5 text-secondary" />
                  </button>
                  <button onClick={() => onEdit(user)} className="text-primary hover:text-primary-600">
                    <Pencil className="h-5 w-5" />
                  </button>
                  {user.id !== currentUserId && (
                    <button onClick={() => onDelete(user.id)} className="text-red-600 hover:text-red-900">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <UserDetailsModal 
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        user={selectedUser}
      />
    </div>
  )
};

const SortableHeader = ({ label, sortKey, sortConfig, onSort }) => {
  return (
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => onSort(sortKey)} >
      <div className="flex items-center">
        {label}
        {sortConfig.key === sortKey && (
          <ChevronDown className={`ml-1 h-4 w-4 ${sortConfig.direction === 'desc' ? 'transform rotate-180' : ''}`} />
        )}
      </div>
    </th>
  )
};

const RoleBadge = ({ role }) => {
  const roleClasses = {
    super_admin: 'bg-purple-100 text-purple-800',
    admin: 'bg-blue-100 text-blue-800',
    user: 'bg-green-100 text-green-800',
    technician: 'bg-yellow-100 text-yellow-800'
  }

  return (
    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${roleClasses[role] || 'bg-gray-100 text-gray-800'}`}>
      {role}
    </span>
  )
};

export default UserTable;
