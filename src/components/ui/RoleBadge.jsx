import { User as UserIcon } from 'lucide-react';

const RoleBadge = ({ role }) => {
  const roleClasses = {
    super_admin: 'bg-purple-100 text-purple-800',
    admin: 'bg-blue-100 text-blue-800',
    user: 'bg-green-100 text-green-800',
    technician: 'bg-yellow-100 text-yellow-800'
  };

  const roleName = {
    super_admin: 'Super Admin',
    admin: 'Administrateur',
    user: 'Utilisateur',
    technician: 'Technicien'
  };

  return (
    <span className={`px-2 py-1 inline-flex items-center rounded-full ${roleClasses[role] || 'bg-gray-100 text-gray-800'}`}>
      <UserIcon className="h-3 w-3 mr-1" />
      {roleName[role] || role}
    </span>
  );
};

export default RoleBadge;