// src/components/rooms/assign/AssignLocationsModal.jsx
import { useState, useEffect } from 'react';
import { X, Check, XCircle } from 'lucide-react';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import api from '../../config/axios'; // Adjust the import path as necessary

function AssignLocationsModal({ isOpen, onClose, roomId }) {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/users');
        console.log('Fetched users:', response.data);
        setUsers(response.data.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    if (isOpen) {
      fetchUsers();
    }
  }, [isOpen]);

  const handleSelectUser = (userId) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSubmit = async () => {
    try {
        setLoading(true);
        console.log('Room ID:', roomId);
        console.log('Selected Users:', selectedUsers);
        
        if (!roomId) {
        throw new Error('Room ID is required');
        }
        if (selectedUsers.length === 0) {
        throw new Error('Please select at least one user');
        }
        
        const response = await api.post(`/auth/locations/${roomId}/assign`, { user_ids: selectedUsers });
        console.log('API Response:', response.data);
        onClose();
    } catch (error) {
        console.error('Error assigning users:', error);
        alert('Erreur lors de l\'assignation des utilisateurs: ' + error.message);
    } finally {
        setLoading(false);
    }
};
//   const handleSubmit = async () => {
//     try {
//       setLoading(true);
//       await api.post(`/locations/${roomId}/assign`, { user_ids: selectedUsers });
//       onClose();
//     } catch (error) {
//       console.error('Error assigning users:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Assigner des utilisateurs">
      <div className="space-y-4">
        <div className="max-h-[500px] overflow-y-auto">
          {users.map(user => (
            <div key={user.id} className="flex items-center justify-between p-3 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user.id)}
                  onChange={() => handleSelectUser(user.id)}
                  className="rounded"
                />
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {selectedUsers.includes(user.id) ? (
                  <Check className="h-4 w-4 text-primary" />
                ) : (
                  <XCircle className="h-4 w-4 text-gray-400" />
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end space-x-3">
          <Button type="button" variant="secondary" onClick={onClose}>
            Annuler
          </Button>
          <Button type="button" onClick={handleSubmit} loading={loading}>
            Assigner
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default AssignLocationsModal;