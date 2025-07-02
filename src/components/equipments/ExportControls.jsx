import { Download } from 'lucide-react';
import { exportToExcel, exportToPDF } from '../../utils/exportUtils'
import  Button  from '../ui/Button';

const ExportControls = ({ equipments }) => {
  const handleExportPDF = async () => {
    try {
      await exportToPDF({
        data: equipments,
        columns: [
          { header: 'ID', key: 'id' },
          { header: 'Nom', key: 'name' },
          { header: 'N° Série', key: 'serialNumber' },
          { header: 'Statut', key: 'status' },
          { header: 'Local', key: 'room.name' },
          { header: 'Utilisateur', key: 'user.name' }
        ],
        fileName: `equipements_${new Date().toISOString().slice(0,10)}`
      })
    } catch (error) {
      console.error('Erreur export PDF:', error)
    }
  }

  const handleExportExcel = async () => {
    try {
      await exportToExcel({
        data: equipments,
        columns: [
          { header: 'ID', key: 'id' },
          { header: 'Nom', key: 'name' },
          { header: 'N° Série', key: 'serialNumber' },
          { header: 'Statut', key: 'status' },
          { header: 'Local', key: 'room.name' },
          { header: 'Utilisateur', key: 'user.name' }
        ],
        fileName: `equipements_${new Date().toISOString().slice(0,10)}`
      })
    } catch (error) {
      console.error('Erreur export Excel:', error)
    }
  }

  const exportToCSV = () => {
    const headers = ['ID', 'Nom', 'N° Série', 'Catégorie', 'Statut', 'Local', 'Utilisateur']
    const csvContent = [
      headers.join(','),
      ...equipments.map(eq => [
        eq.id,
        `"${eq.name}"`,
        eq.serialNumber || '',
        eq.category,
        eq.status,
        eq.room?.name || '',
        eq.user?.name || ''
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `equipements_${new Date().toISOString().slice(0,10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Exporter les données</h2>
      <div className="flex flex-wrap gap-3">
        <Button   variant="outline"  onClick={exportToCSV}  className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          CSV
        </Button>
        
        <Button   variant="outline"  onClick={handleExportExcel}  className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Excel
        </Button>

        <Button   variant="outline"  onClick={handleExportPDF}  className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          PDF
        </Button>
      </div>
    </div>
  )
}

export default ExportControls;