import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import api from '../../config/axios'
import { Plus, Search, Filter, Home, Edit, Trash2, User } from 'lucide-react'
import Table from '../../components/ui/Table'
import Button from '../../components/ui/Button'
import RoomFormModal from '../../components/rooms/RoomFormModal'
import StatusBadge from '../../components/ui/StatusBadge'
import EmptyState from '../../components/ui/EmptyState'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import Pagination from '../../components/ui/Pagination'
import AssignLocationsModal from '../../components/rooms/AssignLocationsModal'
import AssignedUsers from '../../components/rooms/AssignedUsers'

const RoomsPage = () => {
  const { user } = useAuth()
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const roomsPerPage = 10
  const [selectedRoomForAssignment, setSelectedRoomForAssignment] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await api.get('/locations')
        const roomsData = Array.isArray(response.data) 
        ? response.data 
        : response.data?.rooms || response.data?.data || [];
        setRooms(roomsData)

      } catch (err) {
        console.error('Fetch error:', err)
        setError(err.response?.data?.message || 'Erreur lors du chargement des locaux')
      } finally {
        setLoading(false)
      }
    }

    fetchRooms()
  }, [])

  const filteredRooms = rooms.filter(room => {
    if (!room) return false;

    const term = searchTerm.toLowerCase();
    return (
    (room.name || '').toLowerCase().includes(term) ||
    (room.type || '').toLowerCase().includes(term) ||
    (room.building || '').toLowerCase().includes(term)
    );
});

  const handleDelete = async (roomId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce local ?')) {
      try {
        await api.delete(`/locations/${roomId}`)
        setRooms(rooms.filter(r => r.id !== roomId))
      } catch (err) {
        setError(err.response?.data?.message || 'Erreur lors de la suppression')
      }
    }
  }
  const handleSubmit = async (formData) => {
  try {
    let newRooms;
    if (selectedRoom) {
      const { data } = await api.put(`/locations/${selectedRoom.id}`, formData)
      newRooms = rooms.map(r => r.id === selectedRoom.id ? data : r)
    } else {
      const { data } = await api.post('/locations', formData)
      newRooms = [...rooms, data]
    }
    
    // Forcer le rechargement des données depuis le serveur
    const response = await api.get('/locations')
    const roomsData = Array.isArray(response.data) 
      ? response.data 
      : response.data?.rooms || response.data?.data || [];
    setRooms(roomsData)
    
    setIsModalOpen(false)
      } catch (err) {
        setError(err.response?.data?.message || 'Erreur lors de la sauvegarde')
      }
  }

  const handleRemoveUser = async (roomId, userId) => {
    try {
      await api.delete(`/locations/${roomId}/assign/${userId}`);
      await fetchRooms();
    } catch (error) {
      console.error('Error removing user:', error);
    }
  };

  const columns = [
    { header: 'Nom', accessor: 'name' },
    { header: 'Type', accessor: 'type' },
    { 
      header: 'Localisation', 
      accessor: 'location',
      render: (row) => (
        <div>
          <p className="text-sm">{row.building || 'Non spécifié'}</p>
          <p className="text-xs text-gray-500">{row.floor || ''}</p>
        </div>
      )
    },
    { 
      header: 'Capacité', 
      accessor: 'capacity',
      render: (row) => row.capacity ? `${row.capacity} pers.` : '-'
    },
        {
      header: 'Assignation',
      accessor: 'assignment',
      render: (row) => (
        <div className="flex space-x-2">
          <button
            onClick={() => {
              setSelectedRoomForAssignment(row);
              setShowAssignModal(true);
            }}
            className="text-primary hover:text-secondary"
          >
            <User className="h-5 w-5" />
          </button>
          <AssignedUsers
            users={row.users || []}
            onRemove={(userId) => handleRemoveUser(row.id, userId)}
          />
        </div>
      ),
    },
    {
      header: 'Actions',
      accessor: 'actions',
      render: (row) => (
        <div className="flex space-x-2">
          <button
            onClick={() => {
              setSelectedRoom(row)
              setIsModalOpen(true)
            }}
            className="text-primary hover:text-secondary"
          >
            <Edit className="h-5 w-5" />
          </button>
          <button onClick={() => handleDelete(row.id)} className="text-accent hover:text-red-700">
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      ),
    },
  ]

  // Pagination
  const indexOfLastRoom = currentPage * roomsPerPage
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage
  const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom)

  if (loading) return <div className="flex justify-center py-12"><LoadingSpinner /></div>
  if (error) return <div className="text-center text-accent py-12">{error}</div>

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center mb-6">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-bold text-gray-900">Gestion des locaux</h1>
          <p className="mt-1 text-sm text-gray-600">  Liste complète des locaux disponibles dans l'établissement</p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Button onClick={() => {
            setSelectedRoom(null)
            setIsModalOpen(true)
          }}>
            <Plus className="h-5 w-5 mr-2" />
            Ajouter un local
          </Button>
        </div>
      </div>

      <div className="mb-6 bg-white p-4 rounded-lg shadow">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input type="text" placeholder="Rechercher par nom, type ou bâtiment..." className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
            />
          </div>
          <div className="flex items-center space-x-2">
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary">
              <Filter className="h-5 w-5 mr-2 text-gray-400" />
              Filtres
            </button>
          </div>
        </div>
      </div>

      {currentRooms.length > 0 ? (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <Table columns={columns} data={currentRooms} />
          <div className="px-6 py-4 border-t border-gray-200">
            <Pagination currentPage={currentPage} totalItems={filteredRooms.length} itemsPerPage={roomsPerPage} onPageChange={setCurrentPage} />
          </div>
        </div>
      ) : (
        <EmptyState icon={<Home className="h-12 w-12 text-gray-400" />} title="Aucun local trouvé" description={searchTerm ? "Aucun résultat pour votre recherche" : "Commencez par ajouter votre premier local"} action={
            <Button onClick={() => setIsModalOpen(true)}>
              <Plus className="h-5 w-5 mr-2" />
              Ajouter un local
            </Button>
          }
        />
      )}

      <RoomFormModal room={selectedRoom} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleSubmit}/>
      <AssignLocationsModal
        isOpen={showAssignModal}
        onClose={() => {
          setShowAssignModal(false);
          setSelectedRoomForAssignment(null);
        }}
        roomId={selectedRoomForAssignment?.id}
      />
    </div>
  )
}

export default RoomsPage;




// fonctionnalitee future:
// La visualisation sur une carte
// La gestion des calendriers de réservation