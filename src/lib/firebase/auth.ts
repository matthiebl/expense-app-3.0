import {
    Auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from 'firebase/auth'
import { authFB } from './config'

class FireAuth {
    fb: Auth

    constructor(auth: Auth) {
        this.fb = auth
    }

    displayName() {
        return this.fb.currentUser?.displayName || null
    }

    async signUp(email: string, password: string) {
        try {
            const { user } = await createUserWithEmailAndPassword(this.fb, email, password)
            return { user }
        } catch (error: any) {
            return {
                error: {
                    code: error.code,
                    message: error.message,
                },
            }
        }
    }

    async signIn(email: string, password: string) {
        try {
            const { user } = await signInWithEmailAndPassword(this.fb, email, password)
            return { user }
        } catch (error: any) {
            return {
                error: {
                    code: error.code,
                    message: error.message,
                },
            }
        }
    }

    async signOut() {
        try {
            await signOut(this.fb)
            return {}
        } catch (error: any) {
            return {
                error: {
                    code: error.code,
                    message: error.message,
                },
            }
        }
    }

    async updateProfile(displayName: string) {
        if (!this.fb.currentUser) {
            return {
                error: {
                    message: 'No user is signed in',
                    code: 999,
                },
            }
        }
        try {
            await updateProfile(this.fb.currentUser, {
                displayName,
            })
            return {}
        } catch (error: any) {
            return {
                error: {
                    code: error.code,
                    message: error.message,
                },
            }
        }
    }
}

export const auth = new FireAuth(authFB)
