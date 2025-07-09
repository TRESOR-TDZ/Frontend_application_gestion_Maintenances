import { Download } from 'lucide-react'
import { exportToExcel, exportToPDF } from '../../utils/exportUtils'
import Button from '../ui/Button'

const RoomExportControls = ({ rooms }) => {
  const handleExportPDF = async () => {
    try {
      await exportToPDF({
        data: rooms,
        columns: [
          { header: 'ID', key: 'id' },
          { header: 'Nom', key: 'name' },
          { header: 'Description', key: 'description' },
          { header: 'Nombre d\'équipements', key: 'equipments.length' },
          { header: 'Nombre d\'utilisateurs', key: 'users.length' }
        ],
        fileName: `salles_${new Date().toISOString().slice(0,10)}`
      })
    } catch (error) {
      console.error('Erreur export PDF:', error)
    }
  }

  const handleExportExcel = async () => {
    try {
      await exportToExcel({
        data: rooms,
        columns: [
          { header: 'ID', key: 'id' },
          { header: 'Nom', key: 'name' },
          { header: 'Description', key: 'description' },
          { header: 'Nombre d\'équipements', key: 'equipments.length' },
          { header: 'Nombre d\'utilisateurs', key: 'users.length' }
        ],
        fileName: `salles_${new Date().toISOString().slice(0,10)}`
      })
    } catch (error) {
      console.error('Erreur export Excel:', error)
    }
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Exporter les données</h2>
      <div className="flex flex-wrap gap-3">
        <Button 
          variant="outline" 
          onClick={handleExportExcel}  
          className="flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:bg-green-100 hover:text-green-700 border-green-300 text-green-600 hover:border-green-400"
        >
          <Download className="h-4 w-4" />
          Excel
        </Button>

        <Button 
          variant="outline" 
          onClick={handleExportPDF}  
          className="flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:bg-red-100 hover:text-red-700 border-red-300 text-red-600 hover:border-red-400"
        >
          <Download className="h-4 w-4" />
          PDF
        </Button>
      </div>
    </div>
  )
}

export default RoomExportControls