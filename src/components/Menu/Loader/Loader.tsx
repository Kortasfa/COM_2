import React from 'react'
import { exportPresentation } from '../../../hooks/menu/presentationManager/exportPresentation'
import importImage from '../../../images/arrow-down-to-square.svg'
import exportImage from '../../../images/arrow-up-from-square.svg'
import importImageDark from '../../../images/darkTheme/arrow-down-to-square.svg'
import exportImageDark from '../../../images/darkTheme/arrow-up-from-square.svg'
import styles from '../Menu.module.css'
import { useAppSelector } from '../../../store/store'
import { getPresentationData, getPresentationTheme } from '../../../store/slide/selector'

interface LoaderProps {
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  error: string | null
}

const Loader = ({ handleFileChange, error }: LoaderProps) => {
  const handleImportButton = () => {
    document.getElementById('fileInputImport')?.click()
  }
  const presentationData = useAppSelector(getPresentationData)
  const presentationTheme = useAppSelector(getPresentationTheme)
  return (
    <div className={styles.loader}>
      <input className={styles.fileLoader} id="fileInputImport" type="file" onChange={handleFileChange} />
      <img
        src={presentationTheme === 'light' ? importImage : importImageDark}
        alt="Import"
        className={styles.menuButton}
        onClick={handleImportButton}
      />
      <img
        src={presentationTheme === 'light' ? exportImage : exportImageDark}
        alt="Export"
        className={styles.menuButton}
        onClick={() => exportPresentation(presentationData)}
      />
      <span className={styles.error}>{error}</span>
    </div>
  )
}

export { Loader }
