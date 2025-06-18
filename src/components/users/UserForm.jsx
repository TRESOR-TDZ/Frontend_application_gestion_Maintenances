import { useState, useEffect } from 'react';
import { User as UserIcon, Mail, Lock, ChevronDown, X } from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

const roleOptions = [
  { value: 'user', label: 'Utilisateur Standard' },
//   { value: 'technician', label: 'Technicien' },
  { value: 'admin', label: 'Administrateur' },
  { value: 'super_admin', label: 'Super Admin' }
]

const statusOptions = [
  { value: 'active', label: 'Actif' },
  { value: 'inactive', label: 'Inactif' },
  { value: 'pending', label: 'En attente' }
]

const UserFormModal = ({ user, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user',
    status: 'active',
    password: '',
    password_confirmation: ''
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        role: user.role || 'user',
        status: user.status || 'active',
        password: '',
        password_confirmation: ''
      })
    } else {
      // Reset form when creating new user
      setFormData({
        name: '',
        email: '',
        role: 'user',
        status: 'active',
        password: '',
        password_confirmation: ''
      })
    }
    setErrors({})
  }, [user, isOpen])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})

    try {
      await onSave(formData)
      onClose()
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors)
      } else {
        setErrors({ general: err.message || 'Une erreur est survenue' })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={user ? 'Modifier utilisateur' : 'Créer un utilisateur'}>
      {errors.general && (
        <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 rounded-md">
          {errors.general}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nom complet
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange}
                className={`block w-full pl-10 pr-3 py-2 border ${errors.name ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
              />
            </div>
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange}
                className={`block w-full pl-10 pr-3 py-2 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
                disabled={!!user} // Disable email field when editing
              />
            </div>
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700"> Rôle </label>
              <div className="mt-1 relative">
                <select id="role" name="role" value={formData.role} onChange={handleChange}
                  className={`appearance-none block w-full pl-3 pr-10 py-2 border ${errors.role ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
                >
                  {roleOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              {errors.role && <p className="mt-1 text-sm text-red-600">{errors.role}</p>}
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Statut
              </label>
              <div className="mt-1 relative">
                <select id="status" name="status" value={formData.status} onChange={handleChange}
                  className={`appearance-none block w-full pl-3 pr-10 py-2 border ${errors.status ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
                >
                  {statusOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status}</p>}
            </div>
          </div>

          {!user && (
            <>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700"> Mot de passe </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input type="password" id="password" name="password" required value={formData.password} onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-2 border ${errors.password ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
                  />
                </div>
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
              </div>

              <div>
                <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
                  Confirmation du mot de passe
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input type="password" id="password_confirmation" name="password_confirmation" required value={formData.password_confirmation} onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-2 border ${errors.password_confirmation ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
                  />
                </div>
                {errors.password_confirmation && (
                  <p className="mt-1 text-sm text-red-600">{errors.password_confirmation}</p>
                )}
              </div>
            </>
          )}
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <Button type="button" variant="secondary" onClick={onClose}>
            Annuler
          </Button>
          <Button type="submit" isLoading={isLoading}>
            {user ? 'Mettre à jour' : 'Créer'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default UserFormModal;