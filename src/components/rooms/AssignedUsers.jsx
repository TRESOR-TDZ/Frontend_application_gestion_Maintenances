import { User, Trash2 } from 'lucide-react';

function AssignedUsers({ users, onRemove }) {
  return (
    <div className="mt-4">
      <h3 className="text-sm font-medium text-gray-700 mb-2">Utilisateurs assignés</h3>
      {users.length > 0 ? (
        <div className="space-y-2">
          {users.map(user => (
            <div key={user.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </div>
              <button
                onClick={() => onRemove(user.id)}
                className="text-accent hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">Aucun utilisateur assigné</p>
      )}
    </div>
  );
}

export default AssignedUsers;