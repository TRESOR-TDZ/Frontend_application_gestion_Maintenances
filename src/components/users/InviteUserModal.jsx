import { useState } from 'react';
import { Mail, X } from 'lucide-react';
import Button from '../ui/Button';
import Modal from '../ui/Modal';

const InviteUserModal = ({ isOpen, onClose, onInvite }) => {
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('user')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    
    try {
      await onInvite(email, role)
      setEmail('')
      onClose()
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-lg font-medium text-gray-900">Inviter un utilisateur</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
          <X className="h-6 w-6" />
        </button>
      </div>
      
      {error && (
        <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input type="email" id="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="email@exemple.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Rôle
            </label>
            <select id="role" value={role} onChange={(e) => setRole(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
            >
              <option value="user">Utilisateur</option>
              <option value="admin">Administrateur</option>
              <option value="technician">Technicien</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <Button type="button" variant="secondary" onClick={onClose}>
            Annuler
          </Button>
          <Button type="submit" isLoading={isLoading}>
            Envoyer l'invitation
          </Button>
        </div>
      </form>
    </Modal>
  )
};

export default InviteUserModal; 
