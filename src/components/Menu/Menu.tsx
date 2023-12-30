import styles from './Menu.module.css'
import React, { useEffect } from 'react'
import { Color, Figures } from '../../types/types'
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
  changeFont,
} from '../../store/slide/slideActions'
import {
  getPresentationData,
  // getPresentationName,
  getSelectedObjectId,
  getSelectedSlideId,
} from '../../store/slide/selector'
import { addNewText } from '../../hooks/menu/objectsManager/useAddText'
// import { useChangeColor } from '../../hooks/menu/slideManager/useChangeColor'
// import { useChangeFont } from '../../hooks/menu/objectsManager/useChangeFontFamily'
import { Fonts } from './Fonts/Fonts'
import primitiveImage from '../../images/primitive.png'
import textImage from '../../images/text.png'
import deleteObjectImage from '../../images/deleteObject.png'
import { addNewPrimitive } from '../../hooks/menu/objectsManager/useAddPrimitive'
import { LoaderImage } from './LoaderImage/LoaderImage'
import { Loader } from './Loader/Loader'
import { useImportFileHandler } from '../../hooks/menu/presentationManager/useImportFileHandler'

const Menu = () => {
  const dispatch = useAppDispatch()
  const selectedObjectId = useAppSelector(getSelectedObjectId)
  const selectedSlideId = useAppSelector(getSelectedSlideId)
  const { error, handleFileChange } = useImportFileHandler()
  // const presentationName = useAppSelector(getPresentationName)

  // useEffect(() => {
  //   document.title = presentationName
  // }, [presentationName])

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
            handleAddText()
          }}
        />
        <img
          src={primitiveImage}
          className={styles.menuButton}
          onClick={() => {
            handleAddPrimitive(Figures.RECTANGLE)
          }}
          alt={'primitive'}
        />
        <img
          src={primitiveImage}
          className={styles.menuButton}
          onClick={() => {
            handleAddPrimitive(Figures.CIRCLE)
          }}
          alt={'primitive'}
        />
        <img
          src={primitiveImage}
          className={styles.menuButton}
          onClick={() => {
            handleAddPrimitive(Figures.TRIANGLE)
          }}
          alt={'primitive'}
        />
        <LoaderImage />
        <img src={deleteObjectImage} className={styles.menuButton} onClick={handleDeleteObject} alt={'delete'} />
        <Fonts />
        <Loader handleFileChange={handleFileChange} error={error} />
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
