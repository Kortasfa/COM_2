import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { IMG_HEIGHT, IMG_WIDTH } from './size'

export const exportToPdf = async () => {
  const slideViewElement = document.getElementById('slide-view')

  if (slideViewElement) {
    slideViewElement.style.display = 'none'
  }

  const pdfElement = document.getElementById('pdf-export')
  if (pdfElement) {
    const pdfChildren = pdfElement.children
    const pdf = new jsPDF('landscape', 'px', 'b7')

    for (let i = 0; i < pdfChildren.length; i++) {
      if (i > 0) {
        pdf.addPage()
      }

      const canvas = await html2canvas(pdfChildren[i] as HTMLElement)
      const imgData = canvas.toDataURL('image/png', 1.0)
      const imgWidth: number = IMG_WIDTH
      const imgHeight: number = IMG_HEIGHT

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)

      if (i === pdfChildren.length - 1) {
        pdf.save('presentation.pdf')
      }
    }
  }

  if (slideViewElement) {
    slideViewElement.style.display = 'block'
  }
}
