import { useState, useEffect } from 'react';
import { Home, MapPin, ClipboardList, X } from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

const roomTypes = [ 'Salle de classe', 'Bureau', 'Laboratoire', 'Salle de réunion', 'Atelier', 'Bibliothèque', 'Amphithéâtre', 'Sanitaire', 'Autre']

function RoomFormModal({ room, isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({name: '',type: 'Salle de classe',description: '',capacity: '',building: '',floor: ''})
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (room) {
      setFormData({
        name: room.name || '',
        type: room.type || 'Salle de classe',
        description: room.description || '',
        capacity: room.capacity || '',
        building: room.building || '',
        floor: room.floor || ''
      })
    } else {
      setFormData({
        name: '',
        type: 'Salle de classe',
        description: '',
        capacity: '',
        building: '',
        floor: ''
      })
    }
    setErrors({})
  }, [room, isOpen])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validateForm()
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(formData)
    } else {
      setErrors(validationErrors)
    }
  }

  const validateForm = () => {
    const errors = {}
    if (!formData.name.trim()) errors.name = 'Le nom est requis'
    if (formData.capacity) {
    const capacityNum = Number(formData.capacity)
    if (isNaN(capacityNum)) errors.capacity = 'Doit être un nombre'
    else formData.capacity = capacityNum // Convertir en nombre
   }
    // if (formData.capacity && isNaN(formData.capacity)) errors.capacity = 'Doit être un nombre'
    return errors
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={room ? 'Modifier un local' : 'Ajouter un local'}>
      <form onSubmit={handleSubmit} className="space-y-4">
         {/* Nom du local */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">  Nom du local</label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Home className="h-5 w-5 text-gray-400" />
            </div>
            <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange}
              className={`block w-full pl-10 pr-3 py-2 border ${errors.name ? 'border-accent' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
              placeholder="Ex: Salle 101"
            />
          </div>
          {errors.name && <p className="mt-1 text-sm text-accent">{errors.name}</p>}
        </div>
         
         {/* Type de local */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">  Type de local</label>
            <select id="type" name="type" value={formData.type} onChange={handleChange}
              className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            >
              {roomTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Capacité */}
          <div>
            <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-1">
              Capacité (personnes)
            </label>
            <input type="number" id="capacity" name="capacity" min="1" value={formData.capacity} onChange={handleChange}
              className={`block w-full px-3 py-2 border ${errors.capacity ? 'border-accent' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
              placeholder="Optionnel"
            />
            {errors.capacity && <p className="mt-1 text-sm text-accent">{errors.capacity}</p>}
          </div>
        </div>

        {/* batiment  */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="building" className="block text-sm font-medium text-gray-700 mb-1">   Bâtiment </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <input type="text" id="building" name="building" value={formData.building} onChange={handleChange}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Ex: Bâtiment A"
              />
            </div>
          </div>

          {/* etage */}
          <div>
            <label htmlFor="floor" className="block text-sm font-medium text-gray-700 mb-1">  Étage</label>
            <input type="text" id="floor" name="floor" value={formData.floor} onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Ex: RDC, 1er étage"
            />
          </div>
        </div>

        {/* description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">  Description</label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 pt-3 pointer-events-none">
              <ClipboardList className="h-5 w-5 text-gray-400" />
            </div>
            <textarea  id="description"  name="description"  rows={3}  value={formData.description}  onChange={handleChange}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Informations supplémentaires..."
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Button type="button" variant="secondary" onClick={onClose}>
            Annuler
          </Button>
          <Button type="submit">
            {room ? 'Mettre à jour' : 'Créer'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default RoomFormModal;