import { X, HardDrive, Calendar, User, Home, Wrench } from 'lucide-react';

const EquipmentDetailsModal = ({ equipment, isOpen, onClose }) => {
  if (!equipment) return null

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? 'block' : 'hidden'}`}>
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <HardDrive className="h-6 w-6 text-primary mr-2" />
                Détails de l'équipement
              </h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Informations de base</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Nom</p>
                    <p className="text-sm font-medium">{equipment.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Numéro de série</p>
                    <p className="text-sm font-medium">{equipment.serial_number || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Catégorie</p>
                    <p className="text-sm font-medium">{equipment.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Statut</p>
                    <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {equipment.status}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Assignation</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Home className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Local</p>
                      <p className="text-sm font-medium">
                        {equipment.location?.name || 'Non assigné'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <User className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Utilisateur</p>
                      <p className="text-sm font-medium">
                        {equipment.user?.name || 'Non assigné'}
                      </p>
                    </div>
                  </div>
                  {equipment.assigned_at && (
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">Assigné le</p>
                        <p className="text-sm font-medium">
                          {new Date(equipment.assigned_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Maintenance</h3>
              <div className="bg-gray-50 p-3 rounded-lg">
                {equipment.maintenances?.length > 0 ? (
                  <ul className="space-y-2">
                    {equipment.maintenances.map(maint => (
                      <li key={maint.id} className="flex items-start">
                        <Wrench className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">{maint.type} - {maint.status}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(maint.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">Aucune maintenance enregistrée</p>
                )}
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={onClose}
                className="btn-secondary"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EquipmentDetailsModal;