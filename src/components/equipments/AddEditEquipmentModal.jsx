// components/equipments/AddEditEquipmentModal.js
import { X, HardDrive, Save } from 'lucide-react'
import { useState, useEffect } from 'react'
import api from '../../config/axios'

const AddEditEquipmentModal = ({ 
  isOpen, 
  onClose, 
  equipment,
  onSuccess 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    serialNumber: '',
    category: '',
    status: 'operational'
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (equipment) {
      setFormData({
        name: equipment.name,
        serialNumber: equipment.serialNumber || '',
        category: equipment.category || '',
        status: equipment.status
      })
    } else {
      setFormData({
        name: '',
        serialNumber: '',
        category: '',
        status: 'operational'
      })
    }
  }, [equipment])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (equipment) {
        // Mise à jour
        await api.put(`/equipments/${equipment.id}`, formData)
      } else {
        // Création
        await api.post('/equipments', formData)
      }
      onSuccess()
      onClose()
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la sauvegarde')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <HardDrive className="h-6 w-6 text-primary mr-2" />
              {equipment ? 'Modifier' : 'Ajouter'} un équipement
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
                <input  type="text"  className="w-full px-3 py-2 border border-gray-300 rounded-md"  value={formData.name}  onChange={(e) => setFormData({...formData, name: e.target.value})}  required/>
              </div>

              {/* Ajoutez les autres champs de formulaire ici */}

              {error && (
                <div className="text-red-600 text-sm">{error}</div>
              )}

              <div className="flex justify-end space-x-3 pt-4">
                <button  type="button"  onClick={onClose}  className="btn-secondary">
                  Annuler
                </button>
                <button  type="submit"  className="btn-primary flex items-center"  disabled={loading}>
                  {loading ? 'En cours...' : (
                    <>
                      <Save className="h-5 w-5 mr-2" />
                      Sauvegarder
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddEditEquipmentModal