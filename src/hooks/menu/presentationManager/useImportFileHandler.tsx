import { Presentation } from '../../../types/types'
import React, { useState } from 'react'
import InitializedPresentation from '../../../components/InitializedPresentation'
import { importParsedData } from '../../../store/slide/slideActions'
import { useAppDispatch } from '../../../store/store'

function useImportFileHandler() {
  const [error, setError] = useState<string | null>(null)
  const dispatch = useAppDispatch()
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      const reader = new FileReader()

      reader.onload = (e) => {
        try {
          const jsonData = e.target?.result as string
          const parsedData: Presentation = JSON.parse(jsonData)
          dispatch(importParsedData(parsedData))
          setError(null)
        } catch (error) {
          dispatch(importParsedData(InitializedPresentation))
          setError('Check format of your file!')
        }
      }

      reader.readAsText(file)
    }
  }

  return { error, handleFileChange }
}

export { useImportFileHandler }
