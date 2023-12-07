/*The idea is that every user will have their database stored in a separate collection inside
  of Firebase. Each document will represent an individual piece of data (password).

  I do not recommend you actually use this file itself inside of the program! This was intended to just be a
  list of commands to make your life a bit easier without having to go the extra mile to search them up.

  The handlers are at the very bottom. All these functions below are the base functions just in case my
  handlers turn out to be dog water, in which case I wouldn't be too surprised.

  Good luck, and thanks.
- Kevin
*/

const selectCollection = "passwords" // The name of the collection to manipulate.
const selectDoc = "document" // The name of the password to manipulate.
// Below is how the data in each document would look. In other words, the information for each password.
const data = { 
    Password: 123,
    User: 2244,
    Username: "Jane Doe",
    Website: "youtube.com",
    id: 1/*Create a random value here and make sure it's not being used. Unsure if necessary*/
};

// Remove an individual document.
db.collection(selectCollection).doc(selectDoc).delete().then(() => {
    console.log("Document successfully deleted!");
}).catch((error) => {
    console.error("Error removing document: ", error);
});

// alternative in case the former doesn't work:
db.collection(selectCollection).doc(selectDoc).delete().then(res=>{
    console.log("document deleted successfully")
})

// listen for real-time changes (It works. I think. But it seems to only be limited to documents.)
db.collection(selectCollection).doc(selectDoc).onSnapshot(docSnapshot => {
    console.log(docSnapshot.data());
})

// Code for editing documents.
// Below are the selected variables for editing.
const passValue = 'password'
const webValue = 'website.com'
const useValue = 'username'
// Updating the document
const docRef = db.collection(selectCollection).doc(selectDoc);
docRef.update({
    Password: passValue,
    Username: useValue,
    Website: webValue,
})
.then(() => {
    console.log('Document updated!');
})
.catch((error) => {
    console.error('Error updating document: ', error);
})

// ============================================= HANDLERS ==============================================

// handler to add password to firebase (for me to identify the structure in our website)
const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Validate form data
      if (!passwordData.website || !passwordData.email || !passwordData.password) {
        throw new Error('Please fill in all fields.');
      }

      // Add the password data to the Firestore collection
      await addDoc(collection(db, 'passwords'), {
        ...passwordData,
      });
      console.log('Password added successfully');

      // Reset the form after submission
      setPasswordData({
        website: '',
        email: '',
        password: '',
      });

      // Provide feedback to the user
      setError(null);
    } catch (error) {
      console.error('Error adding password: ', error);
      setError(error.message || 'An error occurred while submitting the form.');
    } finally {
      setSubmitting(false);
    }
  };

  // Handler for editing messages
  const handleEdit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Validate form data
      if (!passwordData.website && !passwordData.email && !passwordData.password) {
        throw new Error('Nothing to edit! Please fill in at least one field.');
      }

      // Edit the password data in the Firestore collection
      if (passwordData.website) {
        await editDoc(collection(db, 'passwords'), {
            ...passwordData,
          });
          console.log('Password website edited successfully');
      }
      if (passwordData.email) {
        await editDoc(collection(db, 'passwords'), {
            ...passwordData,
          });
          console.log('Password email edited successfully');
      }
      if (passwordData.password) {
        await editDoc(collection(db, 'passwords'), {
            ...passwordData,
          });
          console.log('Password password edited successfully');
      }

      // Reset the form after submission
      setPasswordData({
        website: '',
        email: '',
        password: '',
      });

      // Provide feedback to the user
      setError(null);
    } catch (error) {
      console.error('Error editing password: ', error);
      setError(error.message || 'An error occurred while editing the form.');
    } finally {
      setSubmitting(false);
    }
  };

  // handler for deleting document
const handleDelete = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Validate form data
      if (!passwordData.website || !passwordData.email || !passwordData.password) {
        throw new Error('Nothing to delete!');
      }

      // Remove the password data from the Firestore collection
      await removeDoc(collection(db, 'passwords'), {
      });
      console.log('Password deleted successfully');

      // Provide feedback to the user
      setError(null);
    } catch (error) {
      console.error('Error deleting password: ', error);
      setError(error.message || 'An error occurred while deleting the form.');
    } finally {
      setSubmitting(false);
    }
  };