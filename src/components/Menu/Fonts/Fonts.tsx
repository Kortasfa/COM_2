import React, { useEffect, useState } from 'react'
import { Color } from '../../../types/types'
import fonts from './Fonts.module.css'
import styles from '../Menu.module.css'
import boldFontImage from '../../../images/boldFont.png'
import italicFontImage from '../../../images/italicFont.png'

export const Fonts = ({
  changeFont,
}: {
  changeFont: (data: {
    fontFamily: string
    fontSize: number
    color: Color
    fontWeight: string
    fontStyle: string
  }) => void
}) => {
  const [fontFamily, useFontFamily] = useState<string>('Arial')
  const [fontSize, useFontSize] = useState<number>(16)
  const [color, useColor] = useState<Color>({ hex: 'black', opacity: 1 })
  const [showDropdownFamily, setShowDropdownFamily] = useState(false)
  const [showDropdownColor, setShowDropdownColor] = useState(false)
  const [bold, setBold] = useState(false)
  const [italic, setItalic] = useState(false)

  useEffect(() => {
    const fontWeightValue = bold ? 'bold' : 'normal'
    const fontStyleValue = italic ? 'italic' : 'normal'
    changeFont({
      fontFamily: fontFamily,
      fontSize: fontSize,
      color: color,
      fontWeight: fontWeightValue,
      fontStyle: fontStyleValue,
    })
  }, [fontFamily, fontSize, color, bold, italic])

  const incrementFontSize = () => {
    useFontSize((prevSize) => prevSize + 1)
  }

  const decrementFontSize = () => {
    useFontSize((prevSize) => prevSize - 1)
  }

  const handleFontFamilyChange = (selectedFont: string) => {
    useFontFamily(selectedFont)
    setShowDropdownFamily(false)
  }

  const handleFontColorChange = (selectedColor: string) => {
    useColor({ hex: selectedColor, opacity: 1 })
    setShowDropdownColor(false)
  }

  const boldFont = () => {
    setBold((prevBold) => !prevBold)
  }

  const italicFont = () => {
    setItalic((prevItalic) => !prevItalic)
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
