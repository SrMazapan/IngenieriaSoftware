import { defineStore } from "pinia";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    // sendEmailVerification,
    signOut,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import router from "../router";
import { useDataBaseStore } from './dataBase'

export const useUserStore = defineStore("userStore", {
    state: () => ({
        userData: null,
        loadingUser: false,
        loadingSession: true,
    }),
    actions: {
        async registerUser(email, password) {
            this.loadingUser = true;
            try {
                const { user } = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );
                // await sendEmailVerification
                this.userData = { email: user.email, uid: user.uid };
                router.push("/");
            } catch (error) {
                console.log(error.code);
                return error.code
            } finally {
                this.loadingUser = false;
            }
        },
        async loginUser(email, password) {
            this.loadingUser = true;
            try {
                const { user } = await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );
                this.userData = { email: user.email, uid: user.uid };
                router.push("/");
            } catch (error) {
                console.log(error.code);
                    return error.code;
                }
            finally {
                this.loadingUser = false;
            }
        },
        async logoutUser() {
            const dataBaseStore = useDataBaseStore();
            dataBaseStore.$reset();

            try {
                await signOut(auth);
                this.userData = null;
                router.push("/login");
            } catch (error) {
                console.log(error);
            }
        },

        async currentUser() {
            return new Promise((resolve, reject) => {
                const unsuscribe = onAuthStateChanged(
                    auth,
                    (user) => {
                        if (user) {
                            console.log(user);
                            this.userData = {
                                email: user.email,
                                uid: user.uid,
                            };
                        } else {
                            this.userData = null;
                            const dataBaseStore = useDataBaseStore();
                            dataBaseStore.$reset();
                        }
                        this.loadingSession = false; 
                        resolve(user);
                    },
                    (e) => reject(e)
                );
            });
        },
    },
});
