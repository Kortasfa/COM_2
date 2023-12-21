import styles from './Loader.module.css'
import React from 'react'
import { exportPresentation } from '../../../hooks/menu/presentationManager/exportPresentation'
import { Presentation } from '../../../types/types'
import importImage from '../../../images/import.svg'
import exportImage from '../../../images/export.svg'

interface LoaderProps {
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  error: string | null
  presentationData: Presentation
}
const Loader = ({ handleFileChange, error, presentationData }: LoaderProps) => {
    const handleImportButton = () => {
        document.getElementById('fileInputImport')?.click()
    }
    return (
        <div className={styles.loader}>
            <input className={styles.fileLoader} id="fileInputImport" type="file" onChange={handleFileChange} />
            <button className={styles.button} onClick={handleImportButton}>
                <img src={importImage} alt="Import" className={styles.importImage} />
            </button>
            <button className={styles.button} onClick={() => exportPresentation(presentationData)}>
                <img src={exportImage} alt="Export" className={styles.exportImage} />
            </button>
            <span className={styles.error}>{error}</span>
        </div>
    )
}

export { Loader }
