import { getFirestore } from "firebase/firestore";

// Initialize Firestore. May be necessary to do this inside of the main firebase file
const db = getFirestore(app);

// NOTE: I've aded the 'async' prefix to the functions in order to make them work, but I'm not sure
// what effect they'll have
// NOTE: I've added Math.random as a stand-in for ID generation. I'm sure we can add an ability
// to check if an ID is in use before using it.
// Function to add data to Firebase
// I'm also thinking about adding an edit function
async function addPassToFirebase(pass, userid, name, site){
    const data = {
        Password: pass,
        User: userid,
        Username: name,
        Website: site
      };
      
      // Add a new document in collection "Password Storage" with ID 'LA'
      const res = await db.collection('Password Storage').doc(Math.random()*9999).set(data);
}

async function removePassFromFirebase(docid){
    const res = await db.collection('Password Storage').doc(docid).delete();
}

async function addUserToFirebase(mail,nameuser,pass){
    const data = {
        Email: mail,
        Name: nameuser,
        Password: pass
      };
      
      // Add a new document in collection "Password Storage" with ID 'LA'
      const res = await db.collection('Userbase').doc(Math.random()*9999).set(data);
}

async function removeUserFromFirebase(docid){
    const res = await db.collection('Userbase').doc(docid).delete();
}
