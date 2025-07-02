import { useEffect, useState } from 'react';
import { Check, X } from 'lucide-react';
import api from '../../config/axios';

const AssignEquipmentForm = ({ equipments, onAssignSuccess }) => {
  const [formData, setFormData] = useState({
    equipmentId: '',
    roomId: '',
    userId: '',
    assignmentDate: new Date().toISOString().split('T')[0]
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [rooms, setRooms] = useState([])
  const [users, setUsers] = useState([])

  useEffect(() => {
    console.log('Equipements mis à jour:', equipments)
  }, [equipments])

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const [locationsRes, usersRes] = await Promise.all([
          api.get('/locations'),
          api.get('/users')
        ])
        setRooms(locationsRes.data.data)
        setUsers(usersRes.data.data)

      } catch (err) {
        console.error('Erreur de chargement:', err)
      }
    }
    fetchResources()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Préparer les données à envoyer
    const dataToSend = {
        locations_id: formData.roomId || null, // Si vide, on envoie null pour désassigner
        user_id: formData.userId || null,    // Si vide, on envoie null pour désassigner
        assigned_at: formData.assignmentDate
    }

    console.log('Données à envoyer:', dataToSend)

    try {
      const response = await api.post(`/equipment/${formData.equipmentId}/assign`, dataToSend)
      console.log('Réponse du serveur:', response)

    console.log('Réponse brute:', response.data)// Réinitialiser le formulaire
    setFormData({
      equipmentId: '',
      roomId: '',
      userId: '',
      assignmentDate: new Date().toISOString().split('T')[0]
    })
      onAssignSuccess()
    } catch (err) {
      console.error('Erreur détaillée:', err)
      console.error('Réponse du serveur:', err.response?.data)
      setError(err.response?.data?.message || err.message || 'Erreur lors de l\'assignation')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Assigner un équipement</h2>
      
      {error && (
        <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">

        {/* champs de selectionner l'equipement a assigner*/}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Équipement</label>
          <select  value={formData.equipmentId}  onChange={(e) => setFormData({...formData, equipmentId: e.target.value})}  className="w-full border border-gray-300 rounded-md p-2"  required>
            <option value="">Sélectionner</option>
            {equipments.map(eq => (
              <option key={eq.id} value={eq.id}>
                {eq.name} ({eq.serialNumber})
              </option>
            ))}
          </select>
        </div>

        {/* champs de selectionner pour assigner un local ou non */}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Local</label>
          <select  value={formData.roomId}  onChange={(e) => setFormData({...formData, roomId: e.target.value})}  className="w-full border border-gray-300 rounded-md p-2">
            <option value="">Non assigné</option>
            {rooms.map(location => (
              <option key={location.id} value={location.id}>{location.name}</option>
            ))}
          </select>
        </div>

        {/* champs de selectionner pour assigner un utilisater ou non */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Utilisateur</label>
          <select  value={formData.userId}  onChange={(e) => setFormData({...formData, userId: e.target.value})}  className="w-full border border-gray-300 rounded-md p-2">
            <option value="">Non assigné</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </div>

        {/* bouton assigner  */}
        <div className="flex items-end">
          <button  type="submit"  disabled={loading}  className="btn-primary flex items-center justify-center w-full">
            {loading ? '...' : (
              <>
                <Check className="h-5 w-5 mr-2" />
                Assigner
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AssignEquipmentForm