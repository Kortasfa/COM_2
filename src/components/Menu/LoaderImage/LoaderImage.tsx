import styles from '../Menu.module.css'
import React, { useRef, useState } from 'react'
import addImageSrc from '../../../images/addImage.png'

interface LoaderImageProps {
  addImageObject: (base64Data: string) => void
  setSelectedObjectId?: (data: string) => void
}

const LoaderImage = ({ addImageObject, setSelectedObjectId }: LoaderImageProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [showPopup, setShowPopup] = useState(false) // State to control the popup visibility
  const [imageUrl, setImageUrl] = useState('none')

  const handleFileLoader = () => {
    if (fileInputRef.current) {
      const selectedFile = fileInputRef.current.files?.[0]

      if (selectedFile) {
        const reader = new FileReader()

        reader.onloadend = () => {
          const base64Data = reader.result as string
          if (selectedFile.type.includes('image')) {
            addImageObject(base64Data)
          }
        }
        reader.readAsDataURL(selectedFile)
      }
    }
  }

  const handleClick = () => {
    setShowPopup(true) // Show the popup when the image is clicked
    if (setSelectedObjectId) {
      setSelectedObjectId('')
    }
  }

  const handleImageUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(event.target.value)
  }

  const handleImageUrlUpload = () => {
    addImageObject(imageUrl)

    setShowPopup(false)
    setImageUrl('')
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleImageUrlUpload()
    }
  }

  const handleFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
    setShowPopup(false)
  }

  return (
    <div className={styles.loaderImage}>
      <input className={styles.image} type="file" ref={fileInputRef} onChange={handleFileLoader} accept=".png" />
      <img src={addImageSrc} className={styles.menuButton} onClick={handleClick} />

      {showPopup && (
        <div className={styles.popup}>
          <input
            type="text"
            placeholder="Введите URL"
            value={imageUrl}
            onChange={handleImageUrlChange}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleFileUpload}>Загрузить с файла</button>
          <button onClick={() => setShowPopup(false)}>Отменить</button>

          {showPopup && (
            <div>
              <button onClick={handleImageUrlUpload}>Загрузить как объект</button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export { LoaderImage }
