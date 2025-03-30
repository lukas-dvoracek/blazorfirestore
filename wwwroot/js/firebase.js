    import {initializeApp} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
    import {
        getFirestore,
        collection,
        addDoc,
        getDocs,
        deleteDoc,
        doc,
        query, 
        where,

    } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

    // Firebase configuration details
      // replace this configuration with your own configuration details
      //const firebaseConfig = {
      //    apiKey: "AIzaSyB4ftsDO2tLVEi69rxACNcLlNLwjUw9_LY",
      //    authDomain: "blazorstore-52dcb.firebaseapp.com",
      //    projectId: "blazorstore-52dcb",
      //    storageBucket: "blazorstore-52dcb.appspot.com",
      //    messagingSenderId: "163844964316",
      //    appId: "1:163844964316:web:e85ac73ba9cbb150391919",
      //};
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
              DisplayName: user.displayName,
              Role: user.role
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
                id: doc.id,
                userName: doc.get("DisplayName"),
                userRole: doc.get("Role"),
            }));
            return dataArray;
        } catch (e) {
            console.error("Chyba při načítání uživatelů: ", e);
        }
        return null;
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

    // funkce pro zobrazení seznamu knih/postů
    window.getBooks = async () => {
        try {
            const postRef = collection(db, "posts");
            const q = query(postRef, where("published", "==", true))
            const posts = await getDocs(q);
            //const querySnapshot = await getDocs(collection(db, "posts"));
            let dataArray = posts.docs.map((doc) => ({
                id: doc.id,
                title: doc.get("Title"),
                authorId: doc.get("user") // Přidáme authorId
            }));
            return dataArray;
        } catch (e) {
            console.error("Chyba při načítání knih: ", e);
        }
        return null;
    };