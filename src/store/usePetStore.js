import { create } from "zustand";
import { db, storage } from "@/config/firebase";
import {
  collection,
  serverTimestamp,
  FirestoreError,
  addDoc,
  where,
  query,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { generateRandomId } from "@/lib/functions";

async function deleteImage(downloadURL) {
    try {
        const filePath = decodeURIComponent(downloadURL.split('/o/')[1].split('?')[0].replace(/%2F/g, '/'));
        const fileRef = ref(storage, filePath);
        await deleteObject(fileRef);
    } catch (error) {
    }
}

const usePetStore = create((set) => ({
    userPets: [],
    isChanged: false,

    petRegistration: async ( petName, breed, species, age, birthday, petProfile, userId) => {
        try {
            let petImage = '';
            if(petProfile){ 
                try {
                    const storageRef = ref(storage, `images/${generateRandomId()}`);
                    const uploadTask = uploadBytesResumable(storageRef, petProfile);
            
                    // Wait for each upload task to complete
                    await new Promise((resolve, reject) => {
                    uploadTask.on('state_changed', 
                        (snapshot) => {},
                        (error) => { reject('Error uploading file'); },
                        () => {
                        // Upload completed successfully, get download URL
                        getDownloadURL(uploadTask.snapshot.ref)
                            .then((downloadURL) => {
                            petImage = downloadURL;
                            resolve();
                            })
                            .catch((e) => {
                            return { err: 'Something went wrong, please try again.' };
                            });
                        }
                    );
                    });
                } catch (error) {
                    return { err: 'Something went wrong, please try again.' };
                }
            }

            // After all images are uploaded and URLs are obtained, create the new supplier
            const newPet = {
                petName, 
                breed, 
                species, 
                age, 
                birthday,
                petImage,
                userId,
                isDeleted: false,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            };
        
            await addDoc(collection(db, 'pets'), newPet);
            set((prev) => ({ isChanged: !prev.isChanged }));
            return { success: 'Pet registered successfully.' };
        } catch (err) {
        if (err instanceof FirestoreError) {
            console.error("Firestore error:", err.message);
        } else {
            console.error("Unexpected error:", err);
        }
        }
    },

    getUserPet: async (userId) => {
        try {
            const q = query(
                collection(db, 'pets'), 
                where('userId', '==', userId),
                where('isDeleted', '==', false)
            );
            const querySnapshot = await getDocs(q);
            const results = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            results.sort((a, b) => a.petName.localeCompare(b.petName));
            set({ userPets: results });
        } catch (error) {
            set({ userPets: [] });
        }
    },
    
    updatePetInformation: async (petName, breed, species, age, birthday, petImage, id, preview) => {
        try {
            let petImg = preview;
            if(petImage){ 
                try {
                    const storageRef = ref(storage, `images/${generateRandomId()}`);
                    const uploadTask = uploadBytesResumable(storageRef, petImage);
            
                    // Wait for each upload task to complete
                    await new Promise((resolve, reject) => {
                    uploadTask.on('state_changed', 
                        (snapshot) => {},
                        (error) => { reject('Error uploading file'); },
                        () => {
                        // Upload completed successfully, get download URL
                        getDownloadURL(uploadTask.snapshot.ref)
                            .then((downloadURL) => {
                            petImg = downloadURL;
                            resolve();
                            })
                            .catch((e) => {
                            return { err: 'Something went wrong, please try again.' };
                            });
                        }
                    );
                    });

                    await deleteImage(preview);
                } catch (error) {
                    return { err: 'Something went wrong, please try again.' };
                }
            }

            const newPet = {
                petName, 
                breed, 
                species, 
                age, 
                birthday,
                petImage: petImg,
                updatedAt: serverTimestamp(),
            };

            const supplyRef = doc(db, "pets", id);
            await updateDoc(supplyRef, newPet);

            set((prev) => ({ isChanged: !prev.isChanged }));
            return { success: 'Pet updated successfully.' };
        } catch (error) {
            return { err: 'Something went wrong. Please try again later.' };
        }
    },

    deletePetInformation: async (id) => {
        try {
            const newPet = {
                isDeleted: true,
                updatedAt: serverTimestamp(),
            };

            const supplyRef = doc(db, "pets", id);
            await updateDoc(supplyRef, newPet);

            set((prev) => ({ isChanged: !prev.isChanged }));
            return { success: 'Pet deleted successfully.' };
        } catch (error) {
            return { err: 'Something went wrong. Please try again later.' };
        }
    }
}));

export default usePetStore;
