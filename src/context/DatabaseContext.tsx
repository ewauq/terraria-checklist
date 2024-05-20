import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import data from '../../database.json'
import { Sections } from '../type/sections'

const DatabaseContext = createContext<Sections | undefined>(undefined)

interface DatabaseProviderProps {
  children: ReactNode
}

const DatabaseProvider: React.FC<DatabaseProviderProps> = ({ children }) => {
  const [sections, setSections] = useState<Sections | undefined>(undefined)

  // Fetch the database.json file and set the sections state
  useEffect(() => {
    setSections(data)
  }, [])

  // Remove all items from localStorage that are not in the database
  useEffect((): void => {
    let itemKeys: string[] = []

    sections?.chapters.map((chapter) => {
      chapter.items.map((item) => {
        if (typeof item === 'string') return
        itemKeys.push(`chapter-${chapter.id}-item-${item.id}`)
      })
    })

    sections?.collections.map((collection) => {
      collection.items.map((item) => {
        if (typeof item === 'string') return
        itemKeys.push(`collection-${collection.id}-item-${item.id}`)
      })
    })

    if (itemKeys.length === 0) return

    Object.keys(localStorage).map((key) => {
      if (!itemKeys.includes(key)) {
        localStorage.removeItem(key)
      }
    })
  }, [sections])

  return <DatabaseContext.Provider value={sections}>{children}</DatabaseContext.Provider>
}

function useDatabase(): Sections | undefined {
  return useContext(DatabaseContext)
}

export { DatabaseContext, DatabaseProvider, useDatabase }
