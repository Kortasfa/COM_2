import styles from './LoaderImage.module.css'
import React, { useRef } from 'react'

interface LoaderImageProps {
  addImage: (base64Data: string) => void
  setSelectedObjectId?: (data: string) => void
}

const LoaderImage = ({ addImage, setSelectedObjectId }: LoaderImageProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const handleFileLoader = () => {
    if (fileInputRef.current) {
      const selectedFile = fileInputRef.current.files?.[0]

      if (selectedFile) {
        const reader = new FileReader()

        reader.onloadend = () => {
          const base64Data = reader.result as string
          if (selectedFile.type.includes('image')) {
            addImage(base64Data)
          }
        }
        reader.readAsDataURL(selectedFile)
      }
    }
  }
  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
    if (setSelectedObjectId) {
      setSelectedObjectId('')
    }
  }
  return (
    <div className={styles.loaderImage}>
      <input className={styles.image} type="file" ref={fileInputRef} onChange={handleFileLoader} accept=".png" />
      <button className={styles.button} onClick={() => handleClick()}>
        Добавить картинку
      </button>
    </div>
  )
}

export { LoaderImage }
