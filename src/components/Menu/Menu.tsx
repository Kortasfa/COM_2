import styles from './Menu.module.css'
import React, { useEffect } from 'react'
import { Figures, Presentation } from '../../types/types'
import { exportPresentation } from '../../hooks/menu/presentationManager/exportPresentation'
import { useImportFileHandler } from '../../hooks/menu/presentationManager/useImportFileHandler'
import useDeleteSlide from '../../hooks/menu/slideManager/useDeleteSlide'
import { useAddSlide } from '../../hooks/menu/slideManager/useAddButton'
import { useAddImage } from '../../hooks/menu/objectsManager/useAddImage'
import { useAddText } from '../../hooks/menu/objectsManager/useAddText'
import { useDeleteObject } from '../../hooks/menu/objectsManager/useDeleteObject'
import { useAddPrimitive } from '../../hooks/menu/objectsManager/useAddPrimitive'

interface Menu {
  selectedObjectId?: string
  selectedSlideId?: string
  setSelectedSlideId?: (data: string) => void
  presentationData: Presentation
  updatePresentationData: (data: Presentation) => void
}

const Menu = ({
  selectedObjectId,
  selectedSlideId,
  setSelectedSlideId,
  presentationData,
  updatePresentationData,
}: Menu) => {
  const deleteSlide = useDeleteSlide(presentationData, updatePresentationData, setSelectedSlideId, selectedSlideId)
  const addSlide = useAddSlide(presentationData, updatePresentationData)
  const addImage = useAddImage(presentationData, updatePresentationData, selectedSlideId)
  const addText = useAddText(presentationData, updatePresentationData, selectedSlideId)
  const addPrimitive = useAddPrimitive(presentationData, updatePresentationData, selectedSlideId)
  const deleteObject = useDeleteObject(presentationData, updatePresentationData, selectedObjectId)
  const { error, handleFileChange } = useImportFileHandler(updatePresentationData)
  const { name } = presentationData

  useEffect(() => {
    document.title = name
  }, [name])

  return (
    <div className={styles.menu}>
      <button onClick={() => document.getElementById('fileInput')?.click()}>Импорт</button>
      <button onClick={() => exportPresentation(presentationData)}>Экспорт</button>
      <button onClick={addSlide}>Добавить</button>
      <button onClick={deleteSlide}>Удалить</button>
      <button onClick={() => addImage('sad')}>Картинка</button>
      <button onClick={() => addText('text', { x: 10, y: 30 }, { width: 40, height: 40 })}>Текст</button>
      <button onClick={() => addPrimitive(Figures.RECTANGLE, { x: 30, y: 50 }, { width: 20, height: 40 })}>
        Примитив
      </button>
      <button onClick={deleteObject}>Удалить объект</button>
      <div>{error}</div>
      <input id="fileInput" type="file" style={{ display: 'none' }} onChange={handleFileChange} />
    </div>
  )
}

export { Menu }
