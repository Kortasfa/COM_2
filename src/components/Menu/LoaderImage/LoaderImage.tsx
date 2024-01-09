import styles from '../Menu.module.css'
import React, { useRef, useState } from 'react'
import addImageSrc from '../../../images/picture.svg'
import { addNewImage } from '../../../hooks/menu/objectsManager/useAddImage'
import { useAppDispatch, useAppSelector } from '../../../store/store'
import { addImage } from '../../../store/slide/slideActions'
import { getSelectedSlideId } from '../../../store/slide/selector'

const LoaderImage = () => {
  const dispatch = useAppDispatch()
  const selectSlideId = useAppSelector(getSelectedSlideId)
  const handleImageLoader = (base64Data: string, width: number, height: number) => {
    const newImage = addNewImage(base64Data, width, height)
    console.log(newImage)
    dispatch(addImage(selectSlideId, newImage))
  }
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
            const image = new Image()
            image.src = base64Data

            image.onload = () => {
              const width = image.width
              const height = image.height
              handleImageLoader(base64Data, width, height)
            }
          }
        }
        reader.readAsDataURL(selectedFile)
      }
    }
  }

  const handleClick = () => {
    setShowPopup(true)
  }

  const handleImageUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(event.target.value)
  }

  const handleImageUrlUpload = () => {
    handleImageLoader(imageUrl, 100, 100)

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
