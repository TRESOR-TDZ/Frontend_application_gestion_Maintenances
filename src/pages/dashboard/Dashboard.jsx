import { Home, Users, HardDrive, Wrench, AlertCircle } from 'lucide-react';
import StatCard from '../../components/dashboard/StatCard';
import { useAuth } from '../../context/AuthContext';
import MaintenanceChart from '../../components/dashboard/MaintenanceChart';
import RecentActivities from '../../components/dashboard/RecentActivities';


function Dashboard() {
  const { user } = useAuth();
  
  // Données temporaires pour les tests
  const stats = {
    users_count: 42,
    users_trend: 12,
    rooms_count: 18,
    rooms_trend: 5,
    equipments_count: 156,
    equipments_trend: -2,
    maintenances_count: 7,
    maintenances_trend: 25
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
      <p className="mt-1 text-gray-600">Bienvenue, {user?.name}</p>
       {/* <p className="mt-4">Rôle: {user?.role}</p> */}
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Utilisateurs"  value={stats.users_count} icon={<Users className="h-6 w-6 text-primary" />} trend={stats.users_trend} />
        <StatCard title="Locaux" value={stats.rooms_count} icon={<Home className="h-6 w-6 text-secondary" />} trend={stats.rooms_trend} />
        <StatCard title="Équipements" value={stats.equipments_count} icon={<HardDrive className="h-6 w-6 text-accent" />} trend={stats.equipments_trend} />
        <StatCard title="Maintenances" value={stats.maintenances_count} icon={<Wrench className="h-6 w-6 text-gray-600" />} trend={stats.maintenances_trend}/>
      </div>
      
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Maintenances par statut</h2>
            <MaintenanceChart />
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Activités récentes</h2>
            <RecentActivities />
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Alertes</h2>
        <div className="flex items-start text-sm p-3 bg-red-50 rounded-lg">
            <AlertCircle className="h-5 w-5 text-accent mr-3 mt-0.5" />
            <p>3 maintenances en retard nécessitent votre attention</p>
        </div>
      </div>
    </div>

// AlertCircle est un components dont je ne sait paas ou ca sort verifier
    
  );
};

export default Dashboard;