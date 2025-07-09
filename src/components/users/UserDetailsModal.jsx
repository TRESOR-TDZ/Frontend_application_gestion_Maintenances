// components/users/UserDetailsModal.jsx
import { X, User as UserIcon } from 'lucide-react';
import RoleBadge from '../ui/RoleBadge';
import StatusBadge from '../ui/StatusBadge';

const UserDetailsModal = ({ isOpen, onClose, user }) => {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Détails utilisateur</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 rounded-full bg-primary-100 flex items-center justify-center">
              <UserIcon className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">{user.name}</h3>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Informations de base</h4>
              <div className="mt-2 space-y-2">
                <div>
                  <span className="text-gray-500">Rôle:</span> 
                  <span className="font-medium ml-2">
                    <RoleBadge role={user.role} />
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Département:</span> 
                  <span className="font-medium ml-2">{user.department}</span>
                </div>
                <div>
                  <span className="text-gray-500">Statut:</span> 
                  <span className="font-medium ml-2">
                    <StatusBadge status={user.status} />
                  </span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Informations supplémentaires</h4>
              <div className="mt-2 space-y-2">
                <div>
                  <span className="text-gray-500">Date de création:</span> 
                  <span className="font-medium ml-2">{new Date(user.created_at).toLocaleDateString()}</span>
                </div>
                <div>
                  <span className="text-gray-500">Dernière connexion:</span> 
                  <span className="font-medium ml-2">{user.last_login ? new Date(user.last_login).toLocaleDateString() : 'Jamais'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;