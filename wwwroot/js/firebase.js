    import {initializeApp} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
    import {
        getFirestore,
        collection,
        addDoc,
        getDocs,
        getDoc,
        setDoc,
        deleteDoc,
        doc,
        query, 
        where,

    } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

    // Firebase configuration details
    const firebaseConfig = {
        apiKey: "AIzaSyBMlqNt1pHk9PCO8O01nqIGvYMJ95oAxWI",
        authDomain: "webapp-8dc15.firebaseapp.com",
        projectId: "webapp-8dc15",
        storageBucket: "webapp-8dc15.appspot.com",
        messagingSenderId: "533382046307",
        appId: "1:533382046307:web:a85f34929f5ce60ced8e56",
    };

    let db; // Definujeme globálně

    try {
        // Initialize Firebase with the configuration details
        const app = initializeApp(firebaseConfig);
        // Initialize Cloud Firestore and get a reference to the service
        db = getFirestore(app); // Teď je dostupné všude
    } catch (e) {
        console.error("Chyba při inicializaci Firebase: ", e);
    }
    
    // Define a function to add a new user to the Firestore database
    window.addUser = async (user) => {
      try {
          const docRef = await addDoc(collection(db, "users"), {
              DisplayName: user.DisplayName,
              Role: user.Role
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    };

    // Define a function to get all the users from the Firestore database
    window.getUsers = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "users"));
            let dataArray = querySnapshot.docs.map((doc) => ({
                Id: doc.id,
                UserName: doc.get("DisplayName"),
                UserRole: doc.get("Role"),
            }));
            return dataArray;
        } catch (e) {
            console.error("Chyba při načítání uživatelů: ", e);
        }
        return null;
    };

    // Funkce pro zobrazení uživatele dle id
    window.getUserById = async (userId) => {
        try {
            const docRef = doc(db, "users", userId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                let user = {
                    Id: docSnap.id,
                    UserName: docSnap.get("DisplayName"),
                    UserRole: docSnap.get("Role"),
                    //Email: docSnap.get("Email"),
                    //RegisteredAt: docSnap.get("RegisteredAt"),
                };
                console.log("Firebase response:", user);  // 🛠️ Debugging
                return user;
            } else {
                console.error("Uživatel neexistuje");
                return null;
            }
        } catch (e) {
            console.error("Chyba při načítání uživatele: ", e);
            return null;
        }
    };

    // Define a function to delete a user from the Firestore database
    window.deleteUser = async (userId) => {
      try {
        await deleteDoc(doc(db, "users", userId));
    console.log("Document with ID", userId, "deleted successfully.");
      } catch (e) {
        console.error("Error deleting document: ", e);
      }
    };

    window.updateUser = async (user) => {
        try {
            const docRef = doc(db, "users", user.Id);
            await setDoc(docRef, {
                DisplayName: user.UserName,
                Role: user.UserRole
            }, { merge: true });
            return true;
        } catch (e) {
            console.error("Chyba při aktualizaci uživatele: ", e);
            return false;
        }
    };

    // funkce pro zobrazení seznamu knih/postů
    window.getBooks = async () => {
        try {
            const postRef = collection(db, "posts");
            const q = query(postRef, where("published", "==", true))
            const posts = await getDocs(q);
            //const querySnapshot = await getDocs(collection(db, "posts"));
            let dataArray = posts.docs.map((doc) => ({
                Id: doc.id,
                Title: doc.get("Title"),
                AuthorId: doc.get("user"), // Přidáme authorId
                Content: doc.get("Content")
            }));
            return dataArray;
        } catch (e) {
            console.error("Chyba při načítání knih: ", e);
        }
        return null;
    };

    // funkce pro zobrazení knihy/postu dle jeho id
    window.getBookById = async (bookId) => {
        try {
            const docRef = doc(db, "posts", bookId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                let book = {
                    Id: docSnap.id,
                    Title: docSnap.get("Title"),
                    AuthorId: docSnap.get("user"),
                    //published: docSnap.get("published"),
                    Content: docSnap.get("Content"),
                };
                console.log("Firebase response:", book);  // 🛠️ Debugging
                return book;
            } else {
                console.error("Kniha neexistuje");
                return null;
            }
        } catch (e) {
            console.error("Chyba při načítání knihy: ", e);
            return null;
        }
    };
    // 📚 Získání všech knih podle uživatele
    window.getBooksByUserId = async (userId) => {
        try {
            const q = query(
                collection(db, "posts"),
                where("user", "==", userId),
                where("published", "==", true) // Přidána podmínka
            );

            const querySnapshot = await getDocs(q);

            let books = querySnapshot.docs.map((doc) => ({
                Id: doc.id,
                Title: doc.get("Title"),
                AuthorId: doc.get("user"),
                //published: doc.get("published"),
                Content: doc.get("Content"),
            }));

            return books;
        } catch (e) {
            console.error("Chyba při načítání knih uživatele:", e);
            return null;
        }
    };

// Přidání nové knihy
window.addBook = async (book) => {
    try {
        const docRef = await addDoc(collection(db, "posts"), {
            Title: book.Title,
            user: book.AuthorId,
            Content: book.Content,
            Genre: book.Genre ?? "",
            published: true
        });
        return docRef.id;
    } catch (e) {
        console.error("Chyba při přidávání knihy: ", e);
        return null;
    }
};

// Editace (aktualizace) knihy
window.updateBook = async (book) => {
    try {
        const docRef = doc(db, "posts", book.Id);
        await setDoc(docRef, {
            Title: book.Title,
            user: book.AuthorId,
            Content: book.Content,
            Genre: book.Genre ?? "",
            published: true
        }, { merge: true });
        return true;
    } catch (e) {
        console.error("Chyba při aktualizaci knihy: ", e);
        return false;
    }
};