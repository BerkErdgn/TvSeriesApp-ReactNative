import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore"
import { db, auth } from "../firebaseConfig"

export const AuthContext = createContext();



export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);



    useEffect(() => {
        const unSub = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true);
                setUser(user);
            } else {
                setIsAuthenticated(false);
                setUser(null);
            }
        });
        return unSub;
    }, [])


    const login = async (email, password) => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            return { success: true }
        } catch (error) {
            return { success: false, msg: error.message, error: error };
        }
    }

    const logout = async () => {
        try {
            await signOut(auth);
            return { success: true }
        } catch (error) {
            return { success: false, msg: error.message, error: error };
        }
    }

    const register = async (email, password) => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log("response.user:", response?.user);

            await setDoc(doc(db, "users", response?.user?.uid), {
                email,
                userId: response?.user?.uid
            });
            return { success: true, data: response?.user };
        } catch (error) {
            let msg = error.message;
            if (msg.includes("(auth/invalid-email)")) msg = "Invalid email"
            return { success: false, msg: msg };
        }
    }

    const sendData = async (user, id, imageUrl, name) => {
        try {
            const docRef = await addDoc(collection(db, "favoritesTvSeries"), {
                user: user,
                id: id,
                imageUrl: imageUrl,
                name: name
            });
            console.log("Document with ID", docRef.id);
        } catch (error) {
            console.log("Error:", e);
        }
    }


    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout, sendData }}>
            {children}
        </AuthContext.Provider>
    )

}


export const useAuth = () => {
    const value = useContext(AuthContext);

    if (!value) {
        throw new Error("useAuth must be wrapped inside AuthContextProvider")
    }

    return value;
}


