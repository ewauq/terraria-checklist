import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'
import { CheckedItem } from '../type/checked-item'
import { Page } from '../type/page'

interface DrawerContextProps {
  openDrawer: boolean
  setOpenDrawer: Dispatch<SetStateAction<boolean>>
  selectedPage: Page | null
  setSelectedPage: Dispatch<SetStateAction<Page | null>>
  checkedItem: CheckedItem | null
  setCheckedItem: Dispatch<SetStateAction<CheckedItem | null>>
}

const DrawerContext = createContext<DrawerContextProps | undefined>(undefined)

interface DrawerProviderProps {
  children: ReactNode
}

const DrawerProvider: React.FC<DrawerProviderProps> = ({ children }) => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false)
  const [selectedPage, setSelectedPage] = useState<Page | null>(null)
  const [checkedItem, setCheckedItem] = useState<CheckedItem | null>(null)

  return (
    <DrawerContext.Provider
      value={{
        openDrawer,
        setOpenDrawer,
        selectedPage,
        setSelectedPage,
        checkedItem,
        setCheckedItem,
      }}
    >
      {children}
    </DrawerContext.Provider>
  )
}

function useDrawer(): DrawerContextProps {
  const context = useContext(DrawerContext)
  if (!context) {
    throw new Error('useDrawer must be used within a DrawerProvider')
  }
  return context
}

export { DrawerContext, DrawerProvider, useDrawer }
