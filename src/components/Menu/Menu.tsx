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
import { useChangeFont } from '../../hooks/menu/objectsManager/useChangeFontFamily'
import { Fonts } from './Fonts/Fonts'
import primitiveImage from '../../images/primitive.png'
import textImage from '../../images/text.png'

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
  const changeFont = useChangeFont(presentationData, updatePresentationData, selectedObjectId, selectedSlideId)
  const { error, handleFileChange } = useImportFileHandler(updatePresentationData)
  const { name } = presentationData

  useEffect(() => {
    document.title = name
  }, [name])

  return (
    <div>
      <h4>New Presentation</h4>
      <div className={styles.menu}>
        <button className={styles.menuButton} onClick={addSlide}>
          +
        </button>
        <button className={styles.menuButton} onClick={deleteSlide}>
          -
        </button>
        <img
          src={textImage}
          className={styles.menuButton}
          onClick={() => {
            if (setSelectedObjectId) {
              setSelectedObjectId('')
            }
            addText()
          }}
        />
        <img
          src={primitiveImage}
          className={styles.menuButton}
          onClick={() => {
            if (setSelectedObjectId) {
              setSelectedObjectId('')
            }
            addPrimitive(Figures.RECTANGLE)
          }}
          alt={'primitive'}
        />
        <button className={styles.menuButton} onClick={deleteObject}>
          Удалить объект
        </button>
        <LoaderImage addImage={addImage} setSelectedObjectId={setSelectedObjectId} />
        <Fonts changeFont={changeFont} />
        <Loader handleFileChange={handleFileChange} error={error} presentationData={presentationData} />
        <button onClick={() => changeColor('green')}>🟢</button>
        <button onClick={() => changeColor('red')}>🔴</button>
        <button onClick={() => changeColor('yellow')}>🟡</button>
      </div>
    </div>
  )
}

export { Menu }
