import {
    Firestore,
    Timestamp,
    collection,
    deleteDoc,
    doc,
    getDocs,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    setDoc,
    updateDoc,
    where,
    writeBatch,
} from 'firebase/firestore'
import { dbFB } from './config'
import { Transaction, TransactionInput } from '@/models/transactions'
import { Category, CategoryInput } from '@/models/categories'

export type Rule = {
    id: string
    uid: string
    title: string
    category: string
    regex: string
    sortIndex: number
    createdAt: Timestamp
}

type RuleInput = {
    title: string
    category: string
    regex: string
    sortIndex: number
}

class FireDB {
    fb: Firestore

    constructor(db: Firestore) {
        this.fb = db
    }

    categories(uid: string, callback: (categories: Category[]) => void) {
        console.log('[DB] Fetching categories from server')
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
        console.log('[DB] Creating category')
        await setDoc(doc(this.fb, 'categories', crypto.randomUUID()), {
            uid,
            kind,
            category,
            createdAt: serverTimestamp(),
        })
    }

    async addCategories(uid: string, categories: CategoryInput[]) {
        console.log('[DB] Creating categories')
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
        console.log('[DB] Editing category')
        const ref = doc(this.fb, 'categories', id)
        await updateDoc(ref, {
            category,
        })
    }

    async deleteCategory(id: string) {
        console.log('[DB] Deleting category')
        const q = query(collection(this.fb, 'transactions'), where('category', '==', id))
        const existing = await getDocs(q)
        if (!existing.empty) {
            return { error: { message: 'Cannot delete category that is being used', code: 999 } }
        }

        const ref = doc(this.fb, 'categories', id)
        await deleteDoc(ref)
        return {}
    }

    transactions(uid: string, callback: (transactions: Transaction[]) => void) {
        console.log('[DB] Fetching transactions from server')
        const q = query(
            collection(this.fb, 'transactions'),
            where('uid', '==', uid),
            orderBy('date', 'desc'),
        )
        onSnapshot(q, snapshot => {
            const transactions: Transaction[] = []
            snapshot.forEach(doc => {
                const data = doc.data()
                transactions.push({
                    id: doc.id,
                    uid: data.uid,
                    title: data.title,
                    description: data.description,
                    amount: data.amount,
                    date: data.date,
                    category: data.category,
                    group: data.group,
                    createdAt: data.createdAt,
                })
            })
            callback(transactions)
        })
    }

    async addTransaction(
        uid: string,
        { title, description, category, amount, date }: TransactionInput,
    ) {
        console.log('[DB] Creating transaction')
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

    rules(uid: string, callback: (rules: Rule[]) => void) {
        console.log('[DB] Fetching data rules from server')
        const q = query(collection(this.fb, 'rules'), where('uid', '==', uid), orderBy('sortIndex'))
        onSnapshot(q, snapshot => {
            const rules: Rule[] = []
            snapshot.forEach(doc => {
                const data = doc.data()
                rules.push({
                    id: doc.id,
                    uid: data.uid,
                    title: data.title,
                    category: data.category,
                    regex: data.regex,
                    sortIndex: data.sortIndex,
                    createdAt: data.createdAt,
                })
            })
            callback(rules)
        })
    }

    async addRule(uid: string, { title, category, regex, sortIndex }: RuleInput) {
        console.log('[DB] Creating data rule')
        await setDoc(doc(this.fb, 'rules', crypto.randomUUID()), {
            uid,
            title,
            category,
            regex,
            sortIndex,
            createdAt: serverTimestamp(),
        })
    }

    async editRule(id: string, title: string, regex: string, category: string) {
        console.log('[DB] Editing data rule')
        const ref = doc(this.fb, 'rules', id)
        await updateDoc(ref, {
            title,
            regex,
            category,
        })
    }
}

export const db = new FireDB(dbFB)
