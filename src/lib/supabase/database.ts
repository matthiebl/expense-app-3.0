export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
    public: {
        Tables: {
            categories: {
                Row: {
                    category: string
                    created_at: string
                    id: string
                    type: Database['public']['Enums']['transaction_type']
                    uid: string | null
                }
                Insert: {
                    category: string
                    created_at?: string
                    id?: string
                    type: Database['public']['Enums']['transaction_type']
                    uid?: string | null
                }
                Update: {
                    category?: string
                    created_at?: string
                    id?: string
                    type?: Database['public']['Enums']['transaction_type']
                    uid?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'categories_uid_fkey'
                        columns: ['uid']
                        referencedRelation: 'users'
                        referencedColumns: ['id']
                    },
                ]
            }
            groups: {
                Row: {
                    created_at: string
                    id: string
                    title: string
                    uid: string
                }
                Insert: {
                    created_at?: string
                    id?: string
                    title: string
                    uid?: string
                }
                Update: {
                    created_at?: string
                    id?: string
                    title?: string
                    uid?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'groups_uid_fkey'
                        columns: ['uid']
                        referencedRelation: 'users'
                        referencedColumns: ['id']
                    },
                ]
            }
            transactions: {
                Row: {
                    amount: number
                    category: string
                    created_at: string
                    date: string
                    group: string | null
                    id: string
                    title: string
                    uid: string
                }
                Insert: {
                    amount?: number
                    category: string
                    created_at?: string
                    date: string
                    group?: string | null
                    id?: string
                    title?: string
                    uid?: string
                }
                Update: {
                    amount?: number
                    category?: string
                    created_at?: string
                    date?: string
                    group?: string | null
                    id?: string
                    title?: string
                    uid?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'transactions_category_fkey'
                        columns: ['category']
                        referencedRelation: 'categories'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'transactions_group_fkey'
                        columns: ['group']
                        referencedRelation: 'groups'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'transactions_uid_fkey'
                        columns: ['uid']
                        referencedRelation: 'users'
                        referencedColumns: ['id']
                    },
                ]
            }
            users: {
                Row: {
                    created_at: string
                    email: string
                    firstname: string
                    fullname: string
                    id: string
                    lastname: string
                }
                Insert: {
                    created_at?: string
                    email: string
                    firstname: string
                    fullname?: string
                    id?: string
                    lastname: string
                }
                Update: {
                    created_at?: string
                    email?: string
                    firstname?: string
                    fullname?: string
                    id?: string
                    lastname?: string
                }
                Relationships: []
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            transaction_type: 'Income' | 'Expense'
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}
