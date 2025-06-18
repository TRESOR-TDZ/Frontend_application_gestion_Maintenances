const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange, className }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className="text-sm text-gray-700">
        Page <span className="font-medium">{currentPage}</span> sur <span className="font-medium">{totalPages}</span>
      </div>
      <div className="flex space-x-2">
        <button onClick={() => onPageChange(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium disabled:opacity-50">
          Précédent
        </button>
        <button onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium disabled:opacity-50">
          Suivant
        </button>
      </div>
    </div>
  )
}

export default Pagination;