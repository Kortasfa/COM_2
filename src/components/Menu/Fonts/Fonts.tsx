import React, { useEffect, useState } from 'react'
import { Color } from '../../../types/types'
import './Fonts.module.css'
import styles from '../Menu.module.css'

export const Fonts = ({
  changeFont,
}: {
  changeFont: (data: { fontFamily: string; fontSize: number; color: Color }) => void
}) => {
  const [fontFamily, useFontFamily] = useState<string>('Arial')
  const [fontSize, useFontSize] = useState<number>(16)
  const [color, useColor] = useState<Color>({ hex: 'black', opacity: 1 })
  const [showDropdown, setShowDropdown] = useState(false)

  useEffect(() => {
    changeFont({ fontFamily: fontFamily, fontSize: fontSize, color: color })
  }, [fontFamily, fontSize, color])

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
          Select Font
        </button>
        <div style={dropdownStyle}>
          <p onClick={() => handleFontFamilyChange('Arial')}>Arial</p>
          <p onClick={() => handleFontFamilyChange('Times New Roman')}>Times New Roman</p>
          <p onClick={() => handleFontFamilyChange('Roboto')}>Roboto</p>
        </div>
      </div>
      <button onClick={incrementFontSize}>+</button>
      <button onClick={decrementFontSize}>-</button>
    </div>
  )
}
