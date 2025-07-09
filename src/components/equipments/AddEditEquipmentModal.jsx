import { X, HardDrive, Save, Calendar } from 'lucide-react'
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
    serial_number: '',
    category: '',
    status: 'in_use',
    description: '',
    purchase_date: ''
  })

  const categories = [
  'Informatique',
  'Bureau',
  'Électronique',
  'Laboratoire',
  'Maintenance',
  'Autre'
]
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (equipment) {
      setFormData({
        name: equipment.name,
        serial_number: equipment.serial_number || '',
        category: equipment.category || '',
        status: equipment.status,
        description: equipment.description || '',
        // purchase_date: equipment.purchase_date ? format(new Date(equipment.purchase_date), 'yyyy-MM-dd') : ''
        purchase_date: equipment.purchase_date ? new Date(equipment.purchase_date).toISOString().split('T')[0] : ''
      })
    } else {
      setFormData({
        name: '',
        serial_number: '',
        category: '',
        status: 'operational',
        description: '',
        purchase_date: ''
      })
    }
  }, [equipment])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const dataToSend = {
        name: formData.name,
        serial_number: formData.serial_number,
        category: formData.category,
        status: formData.status,
        description: formData.description,
        purchase_date: formData.purchase_date
      }

      if (equipment) {
        await api.put(`/equipment/${equipment.id}`, dataToSend)
      } else {
        await api.post('/equipment', dataToSend)
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
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <HardDrive className="h-6 w-6 text-primary mr-2" />
              {equipment ? 'Modifier' : 'Ajouter'} un équipement
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Section principale */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                    value={formData.name} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">N° Série</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                    value={formData.serial_number} 
                    onChange={(e) => setFormData({...formData, serial_number: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie *</label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    required
                  >
                    <option value="">Sélectionnez une catégorie</option>
                    {categories.map((cat, index) => (
                      <option key={index} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Statut *</label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    required
                  >
                    <option value="in_use">in_use</option>
                    <option value="maintenance">maintenance</option>
                    <option value="available"> available</option>
                    <option value="decommissioned">decommissioned</option>
                    <option value="broken">broken</option>

                  </select>
                </div>
              </div>

              {/* Section Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md h-24 focus:ring-primary focus:border-primary"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                ></textarea>
              </div>

              {/* Section Date */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date d'achat</label>
                  <input 
                    type="date" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                    value={formData.purchase_date}
                    onChange={(e) => setFormData({...formData, purchase_date: e.target.value})}
                  />
                </div>
              </div>

              {/* Messages d'erreur */}
              {error && (
                <div className="text-red-600 text-sm p-2 rounded bg-red-50">
                  {error}
                </div>
              )}

              {/* Boutons */}
              <div className="flex justify-end space-x-3 pt-4">
                <button 
                  type="button" 
                  onClick={onClose} 
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-600 flex items-center"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center">
                      <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      En cours...
                    </div>
                  ) : (
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

export default AddEditEquipmentModal;