import styles from './Menu.module.css'
import React, { useEffect } from 'react'
import { Figures } from '../../types/types'
// import { useImportFileHandler } from '../../hooks/menu/presentationManager/useImportFileHandler'
// import { Loader } from './Loader/Loader'
import { useAppDispatch, useAppSelector } from '../../store/store'
import {
  addSlide,
  deleteSlide,
  addText,
  addPrimitive,
  addImage,
  deleteObject,
  changeBackgroundColor,
} from '../../store/slide/slideActions'
import { getPresentationName, selectSelectedObjectId, selectSelectedSlideId } from '../../store/slide/selector'
import { addNewText } from '../../hooks/menu/objectsManager/useAddText'
// import { useChangeColor } from '../../hooks/menu/slideManager/useChangeColor'
// import { useChangeFont } from '../../hooks/menu/objectsManager/useChangeFontFamily'
import { Fonts } from './Fonts/Fonts'
import primitiveImage from '../../images/primitive.png'
import textImage from '../../images/text.png'
import deleteObjectImage from '../../images/deleteObject.png'
import { addNewPrimitive } from '../../hooks/menu/objectsManager/useAddPrimitive'

const Menu: React.FC = () => {
  const dispatch = useAppDispatch()
  const selectedObjectId = useAppSelector(selectSelectedObjectId)
  const selectedSlideId = useAppSelector(selectSelectedSlideId)
  // const { error, handleFileChange } = useImportFileHandler()
  const presentationName = useAppSelector(getPresentationName)

  useEffect(() => {
    document.title = presentationName
  }, [presentationName])

  const handleAddSlide = () => {
    dispatch(addSlide())
  }

  const handleDeleteSlide = () => {
    dispatch(deleteSlide(selectedSlideId))
  }

  const handleAddText = () => {
    const newText = addNewText()
    dispatch(addText(selectedSlideId, newText))
  }

  const handleAddPrimitive = (primitiveType: Figures) => {
    const newPrimitive = addNewPrimitive(primitiveType)
    dispatch(addPrimitive(selectedSlideId, newPrimitive))
  }

  const handleAddImage = () => {
    dispatch(addImage(selectedSlideId, 'image'))
  }

  const handleDeleteObject = () => {
    dispatch(deleteObject(selectedSlideId, selectedObjectId))
  }

  const changeColor = (color: string) => {
    dispatch(changeBackgroundColor(selectedSlideId, color))
  }

  return (
    <div>
      {/*<input value={title} type={'text'} className={styles.title} onChange={handleInputChange} />*/}
      <div className={styles.menu}>
        <button className={styles.menuButton} onClick={handleAddSlide}>
          +
        </button>
        <button className={styles.menuButton} onClick={handleDeleteSlide}>
          -
        </button>
        <img
          src={textImage}
          className={styles.menuButton}
          onClick={() => {
            // if (setSelectedObjectId) {
            //   setSelectedObjectId('')
            // }
            handleAddText()
          }}
        />
        <img
          src={primitiveImage}
          className={styles.menuButton}
          onClick={() => {
            // if (setSelectedObjectId) {
            //   setSelectedObjectId('')
            // }
            handleAddPrimitive(Figures.RECTANGLE)
          }}
          alt={'primitive'}
        />
        <img
          src={primitiveImage}
          className={styles.menuButton}
          onClick={() => {
            // if (setSelectedObjectId) {
            //   setSelectedObjectId('')
            // }
            handleAddPrimitive(Figures.CIRCLE)
          }}
          alt={'primitive'}
        />
        <img
          src={primitiveImage}
          className={styles.menuButton}
          onClick={() => {
            // if (setSelectedObjectId) {
            //   setSelectedObjectId('')
            // }
            handleAddPrimitive(Figures.TRIANGLE)
          }}
          alt={'primitive'}
        />
        {/*<LoaderImage addImage={addImage} setSelectedObjectId={setSelectedObjectId} />*/}
        {/*<img src={deleteObjectImage} className={styles.menuButton} onClick={deleteObject} />*/}
        {/*<Fonts changeFont={changeFont} />*/}
        {/*<Loader handleFileChange={handleFileChange} error={error} presentationData={presentationData} />*/}
        <button className={styles.menuButton} onClick={() => changeColor('green')}>
          🟢
        </button>
        <button className={styles.menuButton} onClick={() => changeColor('red')}>
          🔴
        </button>
        <button className={styles.menuButton} onClick={() => changeColor('yellow')}>
          🟡
        </button>
      </div>
    </div>
  )
}

export { Menu }
