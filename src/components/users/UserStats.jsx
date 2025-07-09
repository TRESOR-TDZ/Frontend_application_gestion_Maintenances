// components/users/UserStats.jsx
import { Users, UserCheck, UserPlus, UserCog } from 'lucide-react';

const UserStats = ({ stats }) => {
  const statsData = [
    {
      title: 'Total des utilisateurs',
      value: stats.total,
      icon: <Users className="h-6 w-6" />,
      color: 'bg-primary-500'
    },
    {
      title: 'Utilisateurs actifs',
      value: stats.active,
      icon: <UserCheck className="h-6 w-6" />,
      color: 'bg-green-500'
    },
    {
      title: 'Admins',
      value: stats.admins,
      icon: <UserCog className="h-6 w-6" />,
      color: 'bg-blue-500'
    },
    {
      title: 'Nouveaux utilisateurs',
      value: stats.new,
      icon: <UserPlus className="h-6 w-6" />,
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {statsData.map((stat, index) => (
        <div   key={index}  className="bg-white p-4 rounded-lg shadow border-l-4 border-transparent hover:border-l-8 transition-all duration-300">
          <div className={`flex items-center justify-between mb-2`}>
            <div className={`p-2 rounded-full ${stat.color}`}>
              {stat.icon}
            </div>
            <span className="text-sm text-gray-500">{stat.title}</span>
          </div>
          <div className="text-3xl font-bold">
            {stat.value}
          </div>
          <div className="w-full h-1 bg-gray-200 rounded-full mt-2">
            <div   className={`h-1 bg-${stat.color.split('-')[0]}-500 rounded-full`}  style={{ width: `${(stat.value / stats.total) * 100}%` }}></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserStats;