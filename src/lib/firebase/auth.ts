import {
    Auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from 'firebase/auth'
import { authFB } from './config'

class FireAuth {
    auth: Auth

    constructor(auth: Auth) {
        this.auth = auth
    }

    displayName() {
        console.log(this.auth)
        return this.auth.currentUser?.displayName || null
    }

    async signUp(email: string, password: string) {
        try {
            const { user } = await createUserWithEmailAndPassword(this.auth, email, password)
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
            const { user } = await signInWithEmailAndPassword(this.auth, email, password)
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
            await signOut(this.auth)
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
        if (!this.auth.currentUser) {
            return {
                error: {
                    message: 'No user is signed in',
                    code: 999,
                },
            }
        }
        try {
            await updateProfile(this.auth.currentUser, {
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
