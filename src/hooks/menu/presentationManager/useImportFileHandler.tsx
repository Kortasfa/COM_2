import { Presentation } from '../../../types/types'
import React, { useState } from 'react'
import InitializedPresentation from '../../../components/InitializedPresentation'

function useImportFileHandler(updatePresentationData: (data: Presentation) => void) {
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      const reader = new FileReader()

      reader.onload = (e) => {
        try {
          const jsonData = e.target?.result as string
          const parsedData: Presentation = JSON.parse(jsonData)
          updatePresentationData(parsedData)
          setError(null)
        } catch (error) {
          updatePresentationData(InitializedPresentation)
          setError('Плохой файл')
        }
      }

      reader.readAsText(file)
    }
  }

  return { error, handleFileChange }
}

export { useImportFileHandler }
