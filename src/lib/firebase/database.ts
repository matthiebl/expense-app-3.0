import {
    Firestore,
    Timestamp,
    collection,
    doc,
    getDocs,
    onSnapshot,
    query,
    serverTimestamp,
    setDoc,
    where,
    writeBatch,
} from 'firebase/firestore'
import { dbFB } from './config'

export type Category = {
    id: string
    uid: string
    kind: 'Income' | 'Expense'
    category: string
    createdAt: Timestamp
}

type CategoryInput = {
    kind: 'Income' | 'Expense'
    category: string
}

class FireDB {
    fb: Firestore

    constructor(db: Firestore) {
        this.fb = db
    }

    categories(uid: string, callback: (categories: Category[]) => void) {
        const q = query(collection(this.fb, 'categories'), where('uid', '==', uid))
        onSnapshot(q, snapshot => {
            const categories: Category[] = []
            snapshot.forEach(doc => {
                const data = doc.data()
                categories.push({
                    id: doc.id,
                    uid: data.uid,
                    kind: data.kind,
                    category: data.category,
                    createdAt: data.createdAt,
                })
            })
            callback(categories)
        })
    }

    async addCategory(uid: string, { kind, category }: CategoryInput) {
        await setDoc(doc(this.fb, 'categories', crypto.randomUUID()), {
            uid,
            kind,
            category,
            createdAt: serverTimestamp(),
        })
    }

    async addCategories(uid: string, categories: CategoryInput[]) {
        const batch = writeBatch(this.fb)
        categories.forEach(({ kind, category }) => {
            const ref = doc(this.fb, 'categories', crypto.randomUUID())
            batch.set(ref, {
                uid,
                kind,
                category,
                createdAt: serverTimestamp(),
            })
        })
        await batch.commit()
    }
}

export const db = new FireDB(dbFB)
