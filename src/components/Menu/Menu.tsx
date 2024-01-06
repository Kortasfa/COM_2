import styles from './Menu.module.css'
import React from 'react'
import { Figures } from '../../types/types'
import { useAppDispatch, useAppSelector } from '../../store/store'
import {
  addSlide,
  deleteSlide,
  addText,
  addPrimitive,
  deleteObject,
  changeBackgroundColor,
} from '../../store/slide/slideActions'
import { getSelectedObjectId, getSelectedSlideId } from '../../store/slide/selector'
import { addNewText } from '../../hooks/menu/objectsManager/useAddText'
import addSlideImage from '../../images/circle-plus-fill.svg'
import deleteSlideImage from '../../images/circle-minus-fill.svg'
import { Fonts } from './Fonts/Fonts'
import rectangleImage from '../../images/square.svg'
import circleImage from '../../images/circle.svg'
import triangleImage from '../../images/triangle-up.svg'
import textImage from '../../images/text.svg'
import deleteObjectImage from '../../images/trash-bin.svg'
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
        <img className={styles.menuButton} onClick={handleAddSlide} src={addSlideImage} />
        <img className={styles.menuButton} onClick={handleDeleteSlide} src={deleteSlideImage} />
        <img
          src={textImage}
          className={styles.menuButton}
          onClick={() => {
            handleAddText()
          }}
        />
        <img
          src={rectangleImage}
          className={styles.menuButton}
          onClick={() => {
            handleAddPrimitive(Figures.RECTANGLE)
          }}
          alt={'primitive'}
        />
        <img
          src={circleImage}
          className={styles.menuButton}
          onClick={() => {
            handleAddPrimitive(Figures.CIRCLE)
          }}
          alt={'primitive'}
        />
        <img
          src={triangleImage}
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
