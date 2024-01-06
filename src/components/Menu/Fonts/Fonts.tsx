import React, { useEffect, useState } from 'react'
import { Color, ObjectType, Slide, SlideObject } from '../../../types/types'
import fonts from './Fonts.module.css'
import styles from '../Menu.module.css'
import boldFontImage from '../../../images/bold.svg'
import italicFontImage from '../../../images/italic.svg'
import underlineFontImage from '../../../images/underline.svg'
import incFontImage from '../../../images/arrow-shape-up.svg'
import decFontImage from '../../../images/arrow-shape-down.svg'
import colorImage from '../../../images/palette.svg'
import fontCase from '../../../images/font-case.svg'
import { changeBackgroundColor, changeFont, changePrimitiveColor } from '../../../store/slide/slideActions'
import { useAppDispatch, useAppSelector } from '../../../store/store'
import { getSelectedObjectId, getSelectedSlideId, getSlides } from '../../../store/slide/selector'

export const Fonts = () => {
  const dispatch = useAppDispatch()
  const selectedSlideId = useAppSelector(getSelectedSlideId)
  const selectedObjectId = useAppSelector(getSelectedObjectId)
  const slides = useAppSelector(getSlides)
  const slide = slides.find((slide: Slide) => slide.id === selectedSlideId)
  const textData = slide?.objects.find((obj: SlideObject) => obj.id === selectedObjectId)
  const [fontFamily, useFontFamily] = useState<string>(textData?.fontFamily || 'Arial')
  const [fontSize, useFontSize] = useState<number>(textData?.fontSize || 19)
  const [color, useColor] = useState<Color>({ hex: 'black', opacity: 1 })
  const [showDropdownFamily, setShowDropdownFamily] = useState(false)
  const [showDropdownColor, setShowDropdownColor] = useState(false)
  const [bold, setBold] = useState(false)
  const [italic, setItalic] = useState(false)
  const [underline, setUnderline] = useState(false)

  useEffect(() => {
    const fontWeightValue = bold ? 'bold' : 'normal'
    const fontStyleValue = italic ? 'italic' : 'normal'
    const fontUnderlineValue = underline ? 'underline' : 'none'
    dispatch(
      changeFont(
        selectedSlideId,
        selectedObjectId,
        fontFamily,
        color,
        fontSize,
        fontWeightValue,
        fontStyleValue,
        fontUnderlineValue,
      ),
    )
  }, [fontFamily, fontSize, color, bold, italic, underline])

  const incrementFontSize = () => {
    useFontSize(fontSize + 1)
  }

  const decrementFontSize = () => {
    useFontSize(fontSize - 1)
  }

  const handleFontFamilyChange = (selectedFont: string) => {
    useFontFamily(selectedFont)
    setShowDropdownFamily(false)
  }

  const changeColor = (color: string) => {
    dispatch(changeBackgroundColor(selectedSlideId, color))
  }

  const changePrimitiveColorAction = (color: Color) => {
    dispatch(changePrimitiveColor(selectedSlideId, selectedObjectId, color))
  }

  const handleFontColorChange = (selectedColor: string) => {
    console.log(selectedObjectId)
    if (selectedObjectId.length) {
      useColor({ hex: selectedColor, opacity: 1 })
      changePrimitiveColorAction({ hex: selectedColor, opacity: 1 })
    } else {
      changeColor(selectedColor)
    }
    setShowDropdownColor(false)
  }

  const boldFont = () => {
    setBold((prevBold) => !prevBold)
  }

  const italicFont = () => {
    setItalic((prevItalic) => !prevItalic)
  }

  const underlineFont = () => {
    setUnderline((prev) => !prev)
  }

  return (
    <div className={fonts.fontsContainer}>
      <div>
        <img className={styles.menuButton} onClick={() => setShowDropdownFamily(!showDropdownFamily)} src={fontCase} />
        <div style={{ display: showDropdownFamily ? 'block' : 'none' }} className={fonts.dropdown}>
          <p onClick={() => handleFontFamilyChange('Arial')}>Arial</p>
          <p onClick={() => handleFontFamilyChange('Times New Roman')}>Times New Roman</p>
          <p onClick={() => handleFontFamilyChange('Calibri')}>Calibri</p>
          <p onClick={() => handleFontFamilyChange('Comic Sans MS')}>Comic Sans MS</p>
          <p onClick={() => handleFontFamilyChange('Open Sans')}>Open Sans</p>
        </div>
      </div>
      <img className={styles.menuButton} onClick={incrementFontSize} src={incFontImage} />
      <img className={styles.menuButton} onClick={decrementFontSize} src={decFontImage} />
      <img src={boldFontImage} className={styles.menuButton} onClick={boldFont} />
      <img src={italicFontImage} className={styles.menuButton} onClick={italicFont} />
      <img src={underlineFontImage} className={styles.menuButton} onClick={underlineFont} />
      <div>
        <img className={styles.menuButton} onClick={() => setShowDropdownColor(!showDropdownColor)} src={colorImage} />
        <div className={fonts.dropdown} style={{ display: showDropdownColor ? 'block' : 'none', columns: 3 }}>
          <p onClick={() => handleFontColorChange('black')}>⚫</p>
          <p onClick={() => handleFontColorChange('red')}>🔴</p>
          <p onClick={() => handleFontColorChange('yellow')}>🟡</p>
          <p onClick={() => handleFontColorChange('brown')}>🟤</p>
          <p onClick={() => handleFontColorChange('green')}>🟢</p>
          <p onClick={() => handleFontColorChange('purple')}>🟣</p>
          <p onClick={() => handleFontColorChange('orange')}>🟠</p>
        </div>
      </div>
    </div>
  )
}
