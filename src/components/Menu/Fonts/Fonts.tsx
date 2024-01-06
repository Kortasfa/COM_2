import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Color } from '../../../types/types'
import {
  changeFont,
  changeFontFamily,
  changeFontSize,
  changeFontColor,
  selectBold,
  selectItalic,
} from '../../../store/fonts/fontsActions'
import { RootState, useAppSelector } from '../../../store/store' // Путь к корневому редуктору
import fonts from './Fonts.module.css'
import styles from '../Menu.module.css'
import boldFontImage from '../../../images/boldFont.png'
import italicFontImage from '../../../images/italicFont.png'
import { selectSelectedSlideId } from '../../../store/slide/selector'
import { fontTypes } from '../../../store/fonts/selector'

// const FontsProps {
//   changeFont: (data: {
//     fontFamily: string
//     fontSize: number
//     color: Color
//     fontWeight: string
//     fontStyle: string
//   }) => void
// }

export const Fonts = () => {
  const dispatch = useDispatch()
  const { fontFamily, fontSize, color, bold, italic } = useAppSelector(fontTypes)
  const [showDropdownFamily, setShowDropdownFamily] = useState<boolean>(false)
  const [showDropdownColor, setShowDropdownColor] = useState<boolean>(false)

  useEffect(() => {
    const fontWeightValue = bold ? 'bold' : 'normal'
    const fontStyleValue = italic ? 'italic' : 'normal'

    dispatch(
      changeFont({
        fontFamily,
        fontSize,
        color,
        fontWeight: fontWeightValue,
        fontStyle: fontStyleValue,
      }),
    )
  }, [fontFamily, fontSize, color, bold, italic])

  const handleFontFamilyChange = (selectedFont: string) => {
    dispatch(changeFontFamily(selectedFont))
    setShowDropdownFamily(false)
  }
  const handleFontColorChange = (selectedColor: string) => {
    dispatch(changeFontColor({ hex: selectedColor, opacity: 1 }))
    setShowDropdownColor(false)
  }

  const boldFont = () => {
    dispatch(selectBold())
  }

  const italicFont = () => {
    dispatch(selectItalic())
  }

  const incrementFontSize = () => {
    dispatch(changeFontSize(fontSize + 1))
  }

  const decrementFontSize = () => {
    dispatch(changeFontSize(fontSize - 1))
  }

  return (
    <div className={fonts.fontsContainer}>
      <div>
        <button className={styles.menuButton} onClick={() => setShowDropdownFamily(!showDropdownFamily)}>
          Выбрать шрифт
        </button>
        <div style={{ display: showDropdownFamily ? 'block' : 'none' }} className={fonts.dropdown}>
          <p onClick={() => handleFontFamilyChange('Arial')}>Arial</p>
          <p onClick={() => handleFontFamilyChange('Times New Roman')}>Times New Roman</p>
          <p onClick={() => handleFontFamilyChange('Roboto')}>Roboto</p>
        </div>
      </div>
      <button className={styles.menuButton} onClick={incrementFontSize}>
        +
      </button>
      <button className={styles.menuButton} onClick={decrementFontSize}>
        -
      </button>
      <img
        src={boldFontImage}
        className={styles.menuButton}
        style={{ backgroundColor: bold ? '#2980b9' : '#f0f0f0' }}
        onClick={boldFont}
      />
      <img
        src={italicFontImage}
        className={styles.menuButton}
        style={{ backgroundColor: italic ? '#2980b9' : '#f0f0f0' }}
        onClick={italicFont}
      />
      <div>
        <button className={styles.menuButton} onClick={() => setShowDropdownColor(!showDropdownColor)}>
          Выбрать цвет шрифта
        </button>
        <div className={fonts.dropdown} style={{ display: showDropdownColor ? 'block' : 'none', columns: 5 }}>
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
