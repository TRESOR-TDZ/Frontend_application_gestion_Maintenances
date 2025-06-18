function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <p className="text-center text-sm text-gray-500">
          © {new Date().getFullYear()} MaintenanceApp - Tous droits réservés
        </p>
      </div>
    </footer>
  )
}

export default Footer