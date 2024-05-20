import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'

interface DrawerContextProps {
  openDrawer: boolean
  setOpenDrawer: Dispatch<SetStateAction<boolean>>
}

const DrawerContext = createContext<DrawerContextProps | undefined>(undefined)

interface DrawerProviderProps {
  children: ReactNode
}

const DrawerProvider: React.FC<DrawerProviderProps> = ({ children }) => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false)

  return (
    <DrawerContext.Provider value={{ openDrawer, setOpenDrawer }}>
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
