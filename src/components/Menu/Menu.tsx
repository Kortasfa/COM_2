import styles from './Menu.module.css'
import React, { useEffect } from 'react'
import { Figures, Presentation } from '../../types/types'
import { useImportFileHandler } from '../../hooks/menu/presentationManager/useImportFileHandler'
import useDeleteSlide from '../../hooks/menu/slideManager/useDeleteSlide'
import { useAddSlide } from '../../hooks/menu/slideManager/useAddButton'
import { useAddImage } from '../../hooks/menu/objectsManager/useAddImage'
import { useAddText } from '../../hooks/menu/objectsManager/useAddText'
import { useDeleteObject } from '../../hooks/menu/objectsManager/useDeleteObject'
import { useAddPrimitive } from '../../hooks/menu/objectsManager/useAddPrimitive'
import { Loader } from './Loader/Loader'
import { LoaderImage } from './LoaderImage/LoaderImage'
import { useChangeColor } from '../../hooks/menu/slideManager/useChangeColor'

interface Menu {
  selectedObjectId?: string
  selectedSlideId?: string
  setSelectedSlideId?: (data: string) => void
  setSelectedObjectId?: (data: string) => void
  presentationData: Presentation
  updatePresentationData: (data: Presentation) => void
}

const Menu = ({
  selectedObjectId,
  selectedSlideId,
  setSelectedSlideId,
  setSelectedObjectId,
  presentationData,
  updatePresentationData,
}: Menu) => {
  const deleteSlide = useDeleteSlide(presentationData, updatePresentationData, setSelectedSlideId, selectedSlideId)
  const addSlide = useAddSlide(presentationData, updatePresentationData)
  const addImage = useAddImage(presentationData, updatePresentationData, selectedSlideId)
  const addText = useAddText(presentationData, updatePresentationData, selectedSlideId)
  const addPrimitive = useAddPrimitive(presentationData, updatePresentationData, selectedSlideId)
  const deleteObject = useDeleteObject(presentationData, updatePresentationData, selectedObjectId)
  const changeColor = useChangeColor(presentationData, updatePresentationData, selectedSlideId)
  const { error, handleFileChange } = useImportFileHandler(updatePresentationData)
  const { name } = presentationData

  useEffect(() => {
    document.title = name
  }, [name])

  return (
    <div className={styles.menu}>
      <button className={styles.menuButton} onClick={addSlide}>
        Добавить слайд
      </button>
      <button className={styles.menuButton} onClick={deleteSlide}>
        Удалить слайд
      </button>
      <button
        className={styles.menuButton}
        onClick={() => {
          if (setSelectedObjectId) {
            setSelectedObjectId('')
          }
          addText('text', { x: 10, y: 30 }, { width: 100, height: 100 })
        }}
      >
        Добавить текст
      </button>
      <button
        className={styles.menuButton}
        onClick={() => {
          if (setSelectedObjectId) {
            setSelectedObjectId('')
          }
          addPrimitive(Figures.RECTANGLE, { x: 30, y: 50 }, { width: 100, height: 100 })
        }}
      >
        Добавить примитив
      </button>
      <LoaderImage addImage={addImage} setSelectedObjectId={setSelectedObjectId} />
      <button className={styles.menuButton} onClick={deleteObject}>
        Удалить объект
      </button>
      <Loader handleFileChange={handleFileChange} error={error} presentationData={presentationData} />
      <button onClick={() => changeColor('green')}>🟢</button>
      <button onClick={() => changeColor('red')}>🔴</button>
      <button onClick={() => changeColor('yellow')}>🟡</button>
    </div>
  )
}

export { Menu }
