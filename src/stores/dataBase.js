// dataBase.js

import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { defineStore } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { db } from '../firebaseConfig';
import { auth } from '../firebaseConfig';
import { nanoid } from 'nanoid';

const normalizeText = (text) => {
  return text.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/gi, '')
    .split(/\s+/)
    .filter(token => token.length > 0);
};

export const useDataBaseStore = defineStore('dataBase', {
  state: () => ({
    documents: [],
    loadingDoc: false,
    searchPerformed: false,
  }),
  persist: true,
  actions: {
    async getUrls() {
      this.loadingDoc = true;

      if (this.documents.length !== 0) {
        return;
      }

      try {
        const q = query(collection(db, "urls"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          console.log(doc.id, doc.data());
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
    async addUrl(documentData) {
      try {
        const tokens = [
          ...new Set([
            ...normalizeText(documentData.title),
            ...normalizeText(documentData.autor),
          ]),
        ];

        const objetoDoc = {
          name: documentData.url,
          title: documentData.title,
          autor: documentData.autor,
          tutor: documentData.tutor,
          year: documentData.year,
          user: auth.currentUser.uid,
          tokens: tokens,
        };

        const docRef = await addDoc(collection(db, "urls"), objetoDoc);

        this.documents.push({
          ...objetoDoc,
          id: docRef.id,
        });
      } catch (error) {
        console.log(error);
      } finally {
        // any cleanup code if needed
      }
    },
    async searchBasic(queryText) {
      this.loadingDoc = true;
      this.searchPerformed = true;
      this.documents = []; // Clear previous results
      try {
        const tokens = queryText.toLowerCase().split(/\s+/);
        let combinedResults = [];

        for (const token of tokens) {
          const q = query(
            collection(db, 'urls'),
            where('tokens', 'array-contains', token)
          );

          const querySnapshot = await getDocs(q);

          querySnapshot.forEach((doc) => {
            combinedResults.push({
              id: doc.id,
              ...doc.data(),
            });
          });
        }

        const uniqueResults = Array.from(new Set(combinedResults.map(a => a.id)))
          .map(id => {
            return combinedResults.find(a => a.id === id);
          });

        this.documents = uniqueResults;
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingDoc = false;
      }
    },
    async searchAdvanced(criterios) {
      this.loadingDoc = true;
      this.searchPerformed = true;
      this.documents = []; // Limpiar resultados previos
      try {
        let q = collection(db, 'urls');
        const conditions = [];

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
        const allDocs = [];

        querySnapshot.forEach((doc) => {
          allDocs.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        const normalizedTitleTokens = criterios.title ? normalizeText(criterios.title) : [];
        const normalizedAuthorTokens = criterios.autor ? normalizeText(criterios.autor) : [];
        const normalizedTutor = criterios.tutor ? normalizeText(criterios.tutor).join(' ') : '';

        const filteredDocs = allDocs.filter((doc) => {
          const docTokens = doc.tokens || [];
          const titleMatch = normalizedTitleTokens.every(token => docTokens.includes(token));
          const authorMatch = normalizedAuthorTokens.every(token => docTokens.includes(token));
          const tutorMatch = criterios.tutor ? doc.tutor.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') === normalizedTutor : true;
          return titleMatch && authorMatch && tutorMatch;
        });

        this.documents = filteredDocs;
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingDoc = false;
      }
    },
  },
});
