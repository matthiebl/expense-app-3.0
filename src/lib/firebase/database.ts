import {
    Firestore,
    Timestamp,
    collection,
    deleteDoc,
    doc,
    getDocs,
    onSnapshot,
    query,
    serverTimestamp,
    setDoc,
    updateDoc,
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

    async editCategory(id: string, category: string) {
        const ref = doc(this.fb, 'categories', id)
        await updateDoc(ref, {
            category,
        })
    }

    async deleteCategory(id: string) {
        const q = query(collection(this.fb, 'transactions'), where('category', '==', id))
        const existing = await getDocs(q)
        if (!existing.empty) {
            return { error: { message: 'Cannot delete category that is being used', code: 999 } }
        }

        const ref = doc(this.fb, 'categories', id)
        await deleteDoc(ref)
        return {}
    }

    async addTransaction(
        uid: string,
        title: string,
        description: string,
        category: string,
        amount: string,
        date: string,
    ) {
        const number = Number.parseFloat(amount)
        await setDoc(doc(this.fb, 'transactions', crypto.randomUUID()), {
            uid,
            title,
            description,
            amount: number,
            date,
            category,
            group: '',
            createdAt: serverTimestamp(),
        })
    }
}

export const db = new FireDB(dbFB)
