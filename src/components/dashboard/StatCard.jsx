function StatCard({ title, value, icon, trend }) {
  const isPositive = trend >= 0;

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">{icon}</div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
              <dd>
                <div className="text-lg font-medium text-gray-900">{value}</div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div className={`px-5 py-3 ${isPositive ? 'bg-green-50' : 'bg-red-50'} text-sm`}>
        <div className="flex items-center">
          <span className={`font-medium ${isPositive ? 'text-green-800' : 'text-red-800'}`}>
            {trend}% {isPositive ? 'augmentation' : 'diminution'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;