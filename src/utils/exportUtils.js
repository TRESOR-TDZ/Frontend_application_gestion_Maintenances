// utils/exportUtils.js
import { jsPDF } from 'jspdf'
import { autoTable } from 'jspdf-autotable';
import * as XLSX from 'xlsx'

export const exportToPDF = async ({ data, columns, fileName }) => {
  const doc = new jsPDF()
  
  // Prepare data for PDF
  const pdfData = data.map(item => 
    columns.map(col => {
      const keys = col.key.split('.')
      let value = item
      keys.forEach(key => value = value?.[key])
      return value || '-'
    })
  )

  autoTable(doc,{
    head: [columns.map(col => col.header)],
    body: pdfData,
    styles: { fontSize: 8 },
    margin: { top: 20 }
  })

  doc.save(`${fileName}.pdf`)
}

export const exportToExcel = ({ data, columns, fileName }) => {
  const excelData = data.map(item => {
    const row = {}
    columns.forEach(col => {
      const keys = col.key.split('.')
      let value = item
      keys.forEach(key => value = value?.[key])
      row[col.header] = value || '-'
    })
    return row
  })

  const worksheet = XLSX.utils.json_to_sheet(excelData)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Equipements')
  XLSX.writeFile(workbook, `${fileName}.xlsx`)
}