const StatusBadge = ({ status }) => {
  // console.log('StatusBadge received status:', status);
  
  // Convertir en minuscules pour une meilleure compatibilité
  const normalizedStatus = status?.toLowerCase();
  
  const statusClasses = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-red-100 text-red-800',
    in_use: 'bg-blue-100 text-blue-800',
    pending: 'bg-yellow-100 text-yellow-800',
    maintenance: 'bg-purple-100 text-purple-800',
    available: 'bg-green-100 text-green-800',
    reserved: 'bg-orange-100 text-orange-800',
    broken: 'bg-red-100 text-red-800',
    decommissioned: 'bg-gray-100 text-gray-800',
    unknown: 'bg-gray-100 text-gray-800'
  }

  // Afficher un message dans la console si le statut n'est pas reconnu
  if (!statusClasses[normalizedStatus]) {
    console.log('Status non reconnu:', normalizedStatus);
  }

  return (
    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClasses[normalizedStatus] || 'bg-gray-100 text-gray-800'}`}>
      {status || 'N/A'}
    </span>
  )
}

export default StatusBadge;