import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Users, Home, Wrench, HardDrive} from 'lucide-react';
import Logo from '../components/ui/Logo';

function Sidebar() {
  const { user } = useAuth()
  const location = useLocation()

//   element de navigation de la navbar
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, current: location.pathname === '/dashboard' },
    { name: 'Utilisateurs', href: '/users', icon: Users, current: location.pathname.startsWith('/users'), allowedRoles: ['super_admin', 'admin'] },
    { name: 'Locaux', href: '/rooms', icon: Home, current: location.pathname.startsWith('/rooms') },
    { name: 'Équipements', href: '/equipments', icon: HardDrive, current: location.pathname.startsWith('/equipments') },
    { name: 'Maintenances', href: '/maintenances', icon: Wrench, current: location.pathname.startsWith('/maintenances') },
  ]

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <Logo />
          </div>
          <nav className="mt-5 flex-1 px-2 bg-white space-y-1">
            {navigation.map((item) => (
              (!item.allowedRoles || item.allowedRoles.includes(user?.role)) && (
                <Link key={item.name} to={item.href} className={`${item.current ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'} group flex items-center px-2 py-2 text-sm font-medium rounded-md`}>
                  <item.icon className={`${item.current ? 'text-white' : 'text-gray-400 group-hover:text-gray-500'} mr-3 flex-shrink-0 h-6 w-6`} />
                  {item.name}
                </Link>
              )
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Sidebar