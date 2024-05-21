'use client'
import { type PropsWithChildren, createContext, useMemo } from 'react'

interface ListProviderProps {
  type: 'ul' | 'ol' | 'tl'
}

interface ListContextType {
  type: ListProviderProps['type']
}

export const ListContext = createContext({} as ListContextType)

const ListProvider: React.FC<PropsWithChildren<ListProviderProps>> = (
  props,
) => {
  const { children, type } = props
  const value = useMemo(() => ({ type }), [type])
  return (
    <ListContext.Provider value={value}>{children}</ListContext.Provider>
  )
}

export default ListProvider
