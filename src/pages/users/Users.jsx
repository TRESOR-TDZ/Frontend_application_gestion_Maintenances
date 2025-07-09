import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../config/axios';
import { Plus, Search } from 'lucide-react';
import UserTable from '../../components/users/UserTable';
import InviteUserModal from '../../components/users/InviteUserModal';
import UserFormModal from '../../components/users/UserForm';
import Button from '../../components/ui/Button';
import Pagination from '../../components/ui/Pagination';
import UserStats from '../../components/users/UserStats';
import UserExportControls from '../../components/users/UserExportControls';
import UserDetailsModal from '../../components/users/UserDetailsModal';

const UsersPage = () => {
  const { user: currentUser, inviteUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
      const response = await api.get('/users');
      //  console.log('Données utilisateurs:', response.data);
      const usersData = response.data.data;
      if (Array.isArray(usersData)) {
        setUsers(usersData);
        setStats(calculateStats(usersData));
      } else {

        setUsers([]); 
        console.warn("API returned unexpected data format within 'data' property:", response.data);
      }

    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors du chargement des utilisateurs.');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

    fetchUsers();
  }, []); 
  
  const calculateStats = (users) => {
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'active').length;
  const admins = users.filter(u => u.role === 'admin').length;
  const lastWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const newUsers = users.filter(u => new Date(u.created_at) > lastWeek).length;
  
  return {
    total: totalUsers,
    active: activeUsers,
    admins: admins,
    new: newUsers
  };
};
  const handleInvite = async (email, role) => {
  try {
    // 1. Envoyer l'invitation
    const response = await api.post('/invite', { email, role });

    // 2. Recharger les utilisateurs après succès
    const usersResponse = await api.get('/users');
    const usersData = usersResponse.data.data;

    if (Array.isArray(usersData)) {
      setUsers(usersData);
    } else {
      setUsers([]);
      console.warn("Format inattendu dans response.data.data :", usersResponse.data);
    }

    return response.data; // Si besoin de récupérer la réponse initiale
  } catch (error) {
    const message = error.response?.data?.message || 'Une erreur est survenue.';
    setError(message);
    throw new Error(message);
  }
};

// console.log('User data:', users[0]); // pour voir la structure d'un utilisateur
  

  const handleDelete = async (userId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      try {
        await api.delete(`/users/${userId}`);
        // Ici, users est déjà un tableau grâce à l'initialisation et la vérification ci-dessus
        setUsers(users.filter(u => u.id !== userId));
      } catch (err) {
        setError(err.response?.data?.message || 'Erreur lors de la suppression.');
      }
    }
  };

  // Le filtrage se fait sur 'users', qui est maintenant garanti d'être un tableau
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Rendus conditionnels pour chargement et erreur
  if (loading) return <div>Chargement des utilisateurs...</div>;
  if (error) return <div className="text-red-600 p-4">{error}</div>;

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center mb-6">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Gestion des utilisateurs</h1>
          <p className="mt-2 text-sm text-gray-700">
            Liste complète des utilisateurs avec leurs rôles et statuts
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Button onClick={() => setIsInviteModalOpen(true)}>
            <Plus className="h-5 w-5 mr-2" />
            Inviter un utilisateur
          </Button>
        </div>
      </div>

    {/* Statistiques */}
  {stats && (
    <UserStats stats={stats} />
  )}

      <div className="flex justify-between mb-6">
        <div className="relative max-w-xs">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input type="text" placeholder="Rechercher utilisateurs..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
          />
        </div>
        {/* Section d'exportation */}
        <UserExportControls users={users} />
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        {/* Passer currentUsers à UserTable, qui peut être vide si aucun résultat */}
        <UserTable 
          users={currentUsers} 
          onEdit={(user) => { setSelectedUser(user); setIsEditModalOpen(true); }}
          onDelete={handleDelete}
          currentUserId={currentUser?.id}
        />
        {/* Message si aucun utilisateur filtré */}
        {filteredUsers.length === 0 && !loading && !error && (
            <div className="p-4 text-center text-gray-500">
                Aucun utilisateur ne correspond à votre recherche.
            </div>
        )}
        <Pagination currentPage={currentPage} totalItems={filteredUsers.length} itemsPerPage={usersPerPage} onPageChange={setCurrentPage} className="px-6 py-4 border-t border-gray-200"/>
      </div>

      <InviteUserModal isOpen={isInviteModalOpen} onClose={() => setIsInviteModalOpen(false)} onInvite={handleInvite} />

      <UserFormModal 
        user={selectedUser} 
        isOpen={isEditModalOpen} 
        onClose={() => { setIsEditModalOpen(false); setSelectedUser(null); }}
        onSave={(updatedUser) => {
          setUsers(prevUsers => prevUsers.map(u => u.id === updatedUser.id ? updatedUser : u));
          setSelectedUser(null); // Réinitialiser le selectedUser après sauvegarde
        }}
      />
    </div>
  );
};

export default UsersPage;

// il y;a encore le champs departement a ajouter pour pour les utilisateurs
