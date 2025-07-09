import {  Home,  Users,  MapPin,  Building2,  AlertCircle} from 'lucide-react'

const RoomStats = ({ rooms }) => {
  const totalRooms = rooms.length
  const roomsWithEquipment = rooms.filter(r => r.equipments?.length > 0).length
  const roomsWithUsers = rooms.filter(r => r.users?.length > 0).length
  const roomsWithIssues = rooms.filter(r => r.equipments?.some(e => e.status === 'maintenance')).length

  const stats = [
    {
      title: 'Total des salles',
      value: totalRooms,
      icon: <Home className="h-6 w-6" />,
      color: 'bg-primary-500'
    },
    {
      title: 'Salles avec équipements',
      value: roomsWithEquipment,
      icon: <Building2 className="h-6 w-6" />,
      color: 'bg-green-500'
    },
    {
      title: 'Salles avec utilisateurs',
      value: roomsWithUsers,
      icon: <Users className="h-6 w-6" />,
      color: 'bg-blue-500'
    },
    {
      title: 'Salles avec problèmes',
      value: roomsWithIssues,
      icon: <AlertCircle className="h-6 w-6" />,
      color: 'bg-red-500'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div 
          key={index}
          className="bg-white p-4 rounded-lg shadow border-l-4 border-transparent hover:border-l-8 transition-all duration-300"
        >
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
            <div 
              className={`h-1 bg-${stat.color.split('-')[0]}-500 rounded-full`}
              style={{ width: `${(stat.value / totalRooms) * 100}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default RoomStats