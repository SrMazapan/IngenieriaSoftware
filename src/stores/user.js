import { defineStore } from "pinia";
import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    // sendEmailVerification,
    signOut,
} from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import router from "../router";
//import { useDataBaseStore } from './dataBase'
import { doc, getDoc, setDoc } from "firebase/firestore";


export const useUserStore = defineStore("userStore", {
    state: () => ({
        userData: null,
        loadingUser: false,
        loadingSession: true,
    }),
    actions: {
        async registerUser(email, password, nombre, appa, apma, fechanac, rol) {
            console.log('email: ',email);
            console.log('password: ',password);
            console.log('nombre: ',nombre);
            console.log('appa: ',appa);
            console.log('apma: ',apma);
            console.log('fechanac: ',fechanac);
            console.log('rol: ',rol);

            this.loadingUser = true;
            try {
                const { user } = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );
                console.log("Usuario creado:", user);
                //Guarda los datos adicionales en firestore
                if (!user.email || !user.uid || !nombre || !appa || !apma || !fechanac || !rol) {
                    throw new Error('Missing required fields.');
                }
                
                const docRef = doc(db, "users", user.uid);
                const userData = {
                    email: user.email,
                    uid: user.uid,
                    nombre: nombre,
                    appa: appa,
                    apma: apma,
                    fechanac: fechanac,
                    rol: rol
                };
                console.log('Saving user data:', userData);
                await setDoc(docRef, userData);
                console.log('User data saved to Firestore.'); 
                router.push("/");
            } catch (error) {
                console.log("error ya sabes donde");
                console.log(error.code);
                return error.code;
            } finally {
                this.loadingUser = false;
            }
        },
        async setUser(user) {
            try {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
        
                if (docSnap.exists()) {
                    this.userData = { ...docSnap.data() };
                } else {
                    await setDoc(docRef, {
                        email: user.email,
                        uid: user.uid,
                    });
                    this.userData = {
                        email: user.email,
                        uid: user.uid,
                    };
                }
            } catch (error) {
                console.log(error);
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
                this.setUser(user)
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
                const unsubscribe = onAuthStateChanged(auth, (user) => {
                    if (user) {
                        this.userData = {
                            email: user.email,
                            uid: user.uid,
                        };
                        resolve(user);
                    } else {
                        this.userData = null;
                    }
                    this.loadingSession = false;
                }, reject);
                unsubscribe();
            });
        },
    },
});
