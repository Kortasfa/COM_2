import styles from './Menu.module.css'
import React from 'react'
import { Figures } from '../../types/types'
import { useAppDispatch, useAppSelector } from '../../store/store'
import {
  addSlide,
  addText,
  addPrimitive,
  deleteObject,
  removeSlide,
  changeTheme,
  undoAction,
  redoAction,
} from '../../store/slide/slideActions'
import { getSelectedObjectId, getSelectedSlideId, getPresentationTheme } from '../../store/slide/selector'
import { addNewText } from '../../hooks/menu/objectsManager/useAddText'
import { Fonts } from './Fonts/Fonts'
import addSlideImage from '../../images/circle-plus-fill.svg'
import deleteSlideImage from '../../images/circle-minus-fill.svg'
import rectangleImage from '../../images/square.svg'
import circleImage from '../../images/circle.svg'
import triangleImage from '../../images/triangle-up.svg'
import textImage from '../../images/text.svg'
import undo from '../../images/arrow-uturn-ccw-left.svg'
import redo from '../../images/arrow-uturn-cw-right.svg'
import undoDark from '../../images/darkTheme/arrow-uturn-ccw-left.svg'
import redoDark from '../../images/darkTheme/arrow-uturn-cw-right.svg'
import deleteObjectImage from '../../images/trash-bin.svg'
import addSlideImageDark from '../../images/darkTheme/circle-plus-fill.svg'
import deleteSlideImageDark from '../../images/darkTheme/circle-minus-fill.svg'
import rectangleImageDark from '../../images/darkTheme/square.svg'
import circleImageDark from '../../images/darkTheme/circle.svg'
import triangleImageDark from '../../images/darkTheme/triangle-up.svg'
import textImageDark from '../../images/darkTheme/text.svg'
import deleteObjectImageDark from '../../images/darkTheme/trash-bin.svg'
import { addNewPrimitive } from '../../hooks/menu/objectsManager/useAddPrimitive'
import { LoaderImage } from './LoaderImage/LoaderImage'
import { Loader } from './Loader/Loader'
import { useImportFileHandler } from '../../hooks/menu/presentationManager/useImportFileHandler'
import lightThemeImage from '../../images/lightTheme.svg'
import darkThemeImage from '../../images/darkTheme.svg'

const Menu = () => {
  const dispatch = useAppDispatch()
  const selectedObjectId = useAppSelector(getSelectedObjectId)
  const presentationTheme = useAppSelector(getPresentationTheme)
  const selectedSlideId: string = useAppSelector(getSelectedSlideId)
  const { error, handleFileChange } = useImportFileHandler()
  // const presentationName = useAppSelector(getPresentationName)
  //
  // useEffect(() => {
  //   document.title = presentationName
  // }, [presentationName])

  const handleAddSlide = () => {
    dispatch(addSlide())
  }

  const handleDeleteSlide = () => {
    dispatch(removeSlide(selectedSlideId))
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
  const handleChangeTheme = () => {
    dispatch(changeTheme(presentationTheme))
  }

  const handleUndo = () => {
    dispatch(undoAction())
  }

  const handleRedo = () => {
    dispatch(redoAction())
  }

  return (
    <div>
      {/*<input value={title} type={'text'} className={styles.title} onChange={handleInputChange} />*/}
      <div
        className={styles.menu}
        style={{ background: presentationTheme === 'light' ? 'rgb(241 230 230 / 41%)' : '#3b3b3b' }}
      >
        <img
          className={styles.menuButton}
          onClick={handleAddSlide}
          src={presentationTheme === 'light' ? addSlideImage : addSlideImageDark}
        />
        <img
          className={styles.menuButton}
          onClick={handleDeleteSlide}
          src={presentationTheme === 'light' ? deleteSlideImage : deleteSlideImageDark}
        />
        <img
          src={presentationTheme === 'light' ? textImage : textImageDark}
          className={styles.menuButton}
          onClick={() => {
            handleAddText()
          }}
        />
        <img
          src={presentationTheme === 'light' ? rectangleImage : rectangleImageDark}
          className={styles.menuButton}
          onClick={() => {
            handleAddPrimitive(Figures.RECTANGLE)
          }}
          alt={'primitive'}
        />
        <img
          src={presentationTheme === 'light' ? circleImage : circleImageDark}
          className={styles.menuButton}
          onClick={() => {
            handleAddPrimitive(Figures.CIRCLE)
          }}
          alt={'primitive'}
        />
        <img
          src={presentationTheme === 'light' ? triangleImage : triangleImageDark}
          className={styles.menuButton}
          onClick={() => {
            handleAddPrimitive(Figures.TRIANGLE)
          }}
          alt={'primitive'}
        />
        <LoaderImage />
        <img
          src={presentationTheme === 'light' ? deleteObjectImage : deleteObjectImageDark}
          className={styles.menuButton}
          onClick={handleDeleteObject}
          alt={'delete'}
        />
        <Fonts />
        <Loader handleFileChange={handleFileChange} error={error} />
        <img
          src={presentationTheme === 'light' ? undo : undoDark}
          className={styles.menuButton}
          alt={'undo'}
          onClick={handleUndo}
        />
        <img
          src={presentationTheme === 'light' ? redo : redoDark}
          className={styles.menuButton}
          alt={'undo'}
          onClick={handleRedo}
        />
        <img
          src={presentationTheme === 'light' ? lightThemeImage : darkThemeImage}
          className={styles.menuButton}
          onClick={handleChangeTheme}
          alt={'change theme'}
        />
      </div>
    </div>
  )
}

export { Menu }
