'use client'

import { DataRuleHook, useFetchDataRules } from '@/hooks/data/useFetchDataRules'
import { ReactNode, createContext, useContext } from 'react'

const DataRuleContext = createContext<DataRuleHook | null>(null)

export const DataRuleProvider = ({ children }: { children: ReactNode }) => {
    const rules = useFetchDataRules()
    return <DataRuleContext.Provider value={rules}>{children}</DataRuleContext.Provider>
}

export const useDataRules = () => {
    const context = useContext(DataRuleContext)
    if (!context) {
        throw new Error('useDataRules must be used within a DataRuleProvider')
    }
    return context
}
