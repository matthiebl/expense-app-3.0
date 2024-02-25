import { useEffect, useState } from 'react'
import { Rule, db } from '@/lib/firebase/database'
import { useUserProfile } from '@/contexts/UserProfileContext'

export interface DataRuleHook {
    loading: boolean
    dataRules: Rule[]
}

export const useFetchDataRules = (): DataRuleHook => {
    const user = useUserProfile()

    const [loading, setLoading] = useState(true)
    const [dataRules, setDataRules] = useState<Rule[]>([])

    useEffect(() => {
        if (user.loading) {
            return
        }
        if (!user.uid) {
            setLoading(false)
            return
        }
        db.rules(user.uid, data => {
            setDataRules(data)
            setLoading(false)
        })
    }, [user])

    return {
        loading,
        dataRules,
    }
}
