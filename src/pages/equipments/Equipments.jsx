import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../config/axios';
import EquipmentTable from '../../components/equipments/EquipmentTable';
import EquipmentDetailsModal from '../../components/equipments/EquipmentDetailsModal';
import AssignEquipmentForm from '../../components/equipments/AssignEquipmentForm';
import ExportControls from '../../components/equipments/ExportControls';
import { Plus, Search, Filter,HardDrive } from 'lucide-react';
import Button from '../../components/ui/Button';
import AddEditEquipmentModal from '../../components/equipments/AddEditEquipmentModal';

function EquipmentsPage() {
  const { user } = useAuth()
  const [equipments, setEquipments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedEquipment, setSelectedEquipment] = useState(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [equipmentToEdit, setEquipmentToEdit] = useState(null)
 


  const handleAddEquipment = () => {
    setShowAddModal(true)
  }

  const handleEdit = (equipment) => {
  setEquipmentToEdit(equipment)
  setShowAddModal(true)
}

const handleDelete = async (id) => {
  if (window.confirm('Confirmer la suppression de cet équipement ?')) {
    try {
      await api.delete(`/equipment/${id}`)
      setEquipments(prev => prev.filter(e => e.id !== id))
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur de suppression')
    }
  }
}

    // Fonction pour rafraîchir les équipements
  const fetchEquipments = async () => {
    try {
      const { data } = await api.get('/equipment?include=location,user')
      setEquipments(data.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur de chargement')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEquipments()
  }, [])

  if (loading) return <div className="p-4">Chargement...</div>
  if (error) return <div className="p-4 text-red-500">{error}</div>

  return (
    <div className="p-6">
      
      <div className="flex justify-between items-center mb-6">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-bold text-gray-900">Gestion des équipements</h1>
          <p className="mt-1 text-sm text-gray-600">  Liste complète des locaux equipements </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Button onClick={handleAddEquipment}>
            <Plus className="h-5 w-5 mr-2" />
            Ajouter un Equipement
          </Button>
        </div>
      </div>

      {/* Ajoutez ceci dans EquipmentsPage.js avant la section AssignEquipmentForm */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {/* Total Équipements  */}
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-primary">
          <div className="text-gray-500 text-sm font-medium">Total Équipements</div>
          <div className="text-2xl font-bold mt-2">
            {equipments.length}
          </div>
          <HardDrive className="h-6 w-6 text-primary mt-2" />
        </div>
        
        {/* Opérationnels */}
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
          <div className="text-gray-500 text-sm font-medium">Opérationnels</div>
            <div className="text-2xl font-bold mt-2">
              {equipments.filter(e => e.status === 'operational').length}
          </div>
          <div className="h-1 w-full bg-green-100 mt-2">
              <div 
                className="h-1 bg-green-500" 
                style={{ width: `${(equipments.filter(e => e.status === 'operational').length / equipments.length) * 100}%` }}
              ></div>
          </div>
        </div>

        {/* En Maintenance  */}
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-secondary">
          <div className="text-gray-500 text-sm font-medium">En Maintenance</div>
          <div className="text-2xl font-bold mt-2">
            {equipments.filter(e => e.status === 'maintenance').length}
          </div>
          <div className="h-1 w-full bg-secondary mt-2">
            <div 
              className="h-1 bg-secondary" 
              style={{ width: `${(equipments.filter(e => e.status === 'maintenance').length / equipments.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Hors Service  */}
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-red-500">
          <div className="text-gray-500 text-sm font-medium">Hors Service</div>
          <div className="text-2xl font-bold mt-2">
            {equipments.filter(e => e.status === 'out_of_service').length}
          </div>
          <div className="h-1 w-full bg-red-100 mt-2">
            <div className="h-1 bg-red-500" 
              style={{ width: `${(equipments.filter(e => e.status === 'out_of_service').length / equipments.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Section d'assignation */}
      <AssignEquipmentForm 
        equipments={equipments}
        // onAssignSuccess={() => window.location.reload()} 
        onAssignSuccess={fetchEquipments}
      />

      {/* Barre de recherche et filtres */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input type="text" placeholder="Rechercher équipements..." className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
          </div>
          <button className="btn-secondary">
            <Filter className="h-5 w-5 mr-2" />
            Filtres avancés
          </button>
        </div>
      </div>

      {/* Tableau des équipements */}
      <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
        <EquipmentTable 
          equipments={equipments.filter(eq => 
            eq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            eq.serialNumber?.toLowerCase().includes(searchTerm.toLowerCase())
          )}
          onViewDetails={(equipment) => {
            setSelectedEquipment(equipment)
            setShowDetailsModal(true)
          }}
          onEdit={handleEdit}
          onDelete={handleDelete}
          currentUser={user}
        />
      </div>

      {/* Section d'exportation */}
      <ExportControls equipments={equipments} />

      {/* Modal de détails */}
      <EquipmentDetailsModal
        equipment={selectedEquipment}
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
      />

      <AddEditEquipmentModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        equipment={equipmentToEdit}
        onSuccess={fetchEquipments}
      />
    </div>
  )
}

export default EquipmentsPage;