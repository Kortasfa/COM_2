import React, { useState } from 'react'

const Theme = () => {
  const [isDarkMode, setDarkMode] = useState(false)

  const toggleTheme = () => {
    setDarkMode(!isDarkMode)
  }

  return (
    <div className={isDarkMode ? 'dark' : 'light'}>
      <button
        onClick={toggleTheme}
        style={{ background: isDarkMode ? '#333' : '#fff', color: isDarkMode ? '#fff' : '#333' }}
      >
        {isDarkMode ? 'dark' : 'light'}
      </button>
      <p>Content goes here</p>
    </div>
  )
}

export default Theme
