import React, { useEffect, useState } from 'react'
import { Color } from '../../../types/types'
import './Fonts.module.css'
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
  const [showDropdown, setShowDropdown] = useState(false)
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
    setShowDropdown(false)
  }

  const boldFont = () => {
    setBold((prevBold) => !prevBold)
  }

  const italicFont = () => {
    setItalic((prevItalic) => !prevItalic)
  }

  const dropdownStyle: React.CSSProperties = {
    position: 'absolute',
    top: 'calc(100% + 4px)',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    borderRadius: '4px',
    overflow: 'hidden',
    zIndex: 1000, // Ensure a higher z-index
    display: showDropdown ? 'block' : 'none', // Control visibility based on showDropdown state
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row', position: 'relative' }}>
      <div style={{ position: 'relative' }}>
        <button className={styles.menuButton} onClick={() => setShowDropdown(!showDropdown)}>
          Выбрать шрифт
        </button>
        <div style={dropdownStyle}>
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
    </div>
  )
}
