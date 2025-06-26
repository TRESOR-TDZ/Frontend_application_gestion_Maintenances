function EmptyState({ icon, title, description, action }) {
  return (
    <div className="text-center bg-white rounded-lg shadow p-12">
      <div className="mx-auto h-12 w-12 text-gray-400">
        {icon}
      </div>
      <h3 className="mt-2 text-lg font-medium text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
      <div className="mt-6">
        {action}
      </div>
    </div>
  )
}

export default EmptyState