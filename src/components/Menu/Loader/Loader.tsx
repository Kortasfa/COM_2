import React from 'react'
import { exportPresentation } from '../../../hooks/menu/presentationManager/exportPresentation'
import importImage from '../../../images/arrow-down-to-square.svg'
import exportImage from '../../../images/arrow-up-from-square.svg'
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
  return (
    <div className={styles.loader}>
      <input className={styles.fileLoader} id="fileInputImport" type="file" onChange={handleFileChange} />
      <img src={importImage} alt="Import" className={styles.menuButton} onClick={handleImportButton} />
      <img
        src={exportImage}
        alt="Export"
        className={styles.menuButton}
        onClick={() => exportPresentation(presentationData)}
      />
      <span className={styles.error}>{error}</span>
    </div>
  )
}

export { Loader }
