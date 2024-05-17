import { addDoc, collection, getDocs, query, where} from 'firebase/firestore/lite';
import { defineStore } from 'pinia';
import { db } from '../firebaseConfig'
import { auth } from '../firebaseConfig';
import { nanoid } from 'nanoid';

export const useDataBaseStore = defineStore('dataBase', {
    state: () => ({
        documents: [],
        loadingDoc: false,
        searchPerformed: false,
    }),
    actions: {
       async getUrls(){
        this.loadingDoc = true

        if(this.documents.length !== 0){
            return
        }

        try{
            const q = query(
                collection(db, "urls"),
                // where("user", "==", auth.currentUser.uid)& // Linea q muestra solo al usuario sus propios links
            );
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                console.log(doc.id, doc.data());
                this.documents.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
        }catch(error){
            console.log(error);
        }finally{ 
            this.loadingDoc = false;   
        }
       },
       async addUrl(documentData){
        try{
            const objetoDoc = {
                name: documentData.url,
                title: documentData.title,
                autor: documentData.autor,
                tutor: documentData.tutor,
                year: documentData.year,
                user: auth.currentUser.uid,
            }
            const docRef = await addDoc(collection(db, "urls"), objetoDoc)
            // console.log(docRef);
            this.documents.push({
                ...objetoDoc,
                id: docRef.id,

            });
        }catch(error){

        }finally{

        }
       },
       async searchBasic(queryText) {
            this.loadingDoc = true;
            this.searchPerformed = true; 
            this.documents = []; // Clear previous results
            try {
                const q = query(
                collection(db, 'urls'),
                where('title', '==', queryText),
                );
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                this.documents.push({
                    id: doc.id,
                    ...doc.data(),
                });
                });
            } catch (error) {
                console.log(error);
            } finally {
                this.loadingDoc = false;
            }
      },
      async searchAdvanced(criterios) {
        this.loadingDoc = true;
        this.searchPerformed = true;
        try {
            let q = collection(db, 'urls');
            const conditions = [];
            if (criterios.title) {
              conditions.push(where('title', '==', criterios.title));
            }
            if (criterios.autor) {
              conditions.push(where('autor', '==', criterios.autor));
            }
            if (criterios.tutor) {
              conditions.push(where('tutor', '==', criterios.tutor));
            }
            if (criterios.startYear) {
              conditions.push(where('year', '>=', criterios.startYear));
            }
            if (criterios.endYear) {
              conditions.push(where('year', '<=', criterios.endYear));
            }
            if (conditions.length > 0) {
              q = query(q, ...conditions);
            }
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
              this.documents.push({
                id: doc.id,
                ...doc.data(),
              });
            });
          } catch (error) {
            console.log(error);
          } finally {
            this.loadingDoc = false;
          }
      }
    },
});