import React from 'react'
import { exportPresentation } from '../../../hooks/menu/presentationManager/exportPresentation'
import { Presentation } from '../../../types/types'
import importImage from '../../../images/import.svg'
import exportImage from '../../../images/export.svg'
import styles from '../Menu.module.css'
import { useAppSelector } from '../../../store/store'
import { getPresentationData } from '../../../store/slide/selector'

interface LoaderProps {
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  error: string | null
}
const Loader = ({ handleFileChange, error }: LoaderProps) => {
  const handleImportButton = () => {
    document.getElementById('fileInputImport')?.click()
  }
  const presentationData = useAppSelector(getPresentationData)
  console.log('sdadsadsa', presentationData)
  return (
    <div className={styles.loader}>
      <input className={styles.fileLoader} id="fileInputImport" type="file" onChange={handleFileChange} />
      <button className={styles.menuButton} onClick={handleImportButton}>
        <img src={importImage} alt="Import" className={styles.importImage} />
      </button>
      <button className={styles.menuButton} onClick={() => exportPresentation(presentationData)}>
        <img src={exportImage} alt="Export" className={styles.exportImage} />
      </button>
      <span className={styles.error}>{error}</span>
    </div>
  )
}

export { Loader }
