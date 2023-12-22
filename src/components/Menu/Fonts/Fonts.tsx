import Dropdown from 'react-bootstrap/Dropdown'
import React, { useEffect, useState } from 'react'
import { Color } from '../../../types/types'
import { Button } from 'react-bootstrap'

export const Fonts = ({
  changeFont,
}: {
  changeFont: (data: { fontFamily: string; fontSize: number; color: Color }) => void
}) => {
  const [fontFamily, useFontFamily] = useState<string>('Arial')
  const [fontSize, useFontSize] = useState<number>(16)
  const [color, useColor] = useState<Color>({ hex: 'black', opacity: 1 })

  useEffect(() => {
    changeFont({ fontFamily: fontFamily, fontSize: fontSize, color: color })
  }, [fontFamily, fontSize, color])

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Шрифт
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => useFontFamily('Arial')}>Arial</Dropdown.Item>
          <Dropdown.Item onClick={() => useFontFamily('Times New Roman')}>Times New Roman</Dropdown.Item>
          <Dropdown.Item onClick={() => useFontFamily('Roboto')}>Roboto</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Button variant="secondary" size="sm" active onClick={() => useFontSize((prevState) => prevState + 1)}>
        +
      </Button>
      <Button variant="secondary" size="sm" active onClick={() => useFontSize((prevState) => prevState - 1)}>
        -
      </Button>
    </div>
  )
}
