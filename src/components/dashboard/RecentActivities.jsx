import { Clock, User, Wrench, HardDrive, Home } from 'lucide-react';

function RecentActivities() {
// function RecentActivities({ activities }) {

  // Données temporaires
  const activities = [
    {
      id: 1,
      type: 'maintenance',
      description: 'Nouvelle maintenance créée pour',
      target: 'PC-024',
      time: 'Il y a 5 min'
    },
    {
      id: 2,
      type: 'user',
      description: 'Nouvel utilisateur',
      target: 'Jean Dupont',
      time: 'Il y a 1h'
    },
    {
      id: 3,
      type: 'equipment',
      description: 'Équipement ajouté',
      target: 'Projecteur EPSON',
      time: 'Hier'
    }
  ]

  //   const getActivityIcon = (type) => {
  const getIcon = (type) => {
    switch(type) {
      case 'user': return <User className="h-5 w-5 text-gray-400" />
      case 'equipment': return <HardDrive className="h-5 w-5 text-gray-400" />
      case 'room': return <Home className="h-5 w-5 text-gray-400" />
      case 'maintenance': return <Wrench className="h-5 w-5 text-gray-400" />
      default: return <Clock className="h-5 w-5 text-gray-400" />
    }
  }

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {activities.map((activity, idx) => (
          <li key={activity.id}>
            <div className="relative pb-8">
              {idx !== activities.length - 1 && (
                <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" />
              )}
              <div className="relative flex space-x-3">
                <div>
                  <span className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center ring-8 ring-white">
                    {getIcon(activity.type)}
                  </span>
                </div>
                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                  <div>
                    <p className="text-sm text-gray-800">
                      {activity.description}{' '}
                      <span className="font-medium text-gray-900">{activity.target}</span>
                    </p>
                  </div>
                  <div className="text-right text-sm whitespace-nowrap text-gray-500">
                    <span>{activity.time}</span>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivities;