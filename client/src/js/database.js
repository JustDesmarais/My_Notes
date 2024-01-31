import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Post to DB')

  const textDb = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = textDb.transaction('jate', 'readwrite');

  // Open up the desired object store.
  const store = tx.objectStore('jate');

  // Use the .add() method on the store and pass in the content.
  const request = store.add({ text: content });

  console.log(result);

  // Get confirmation of the request.
  const result = await request;
  console.log('Data saved to the database', result);
}

// gets all the content from the database
export const getDb = async () => {
  console.log('Get from DB');

  const textDb = await openDB('jate', 1);

  const tx = textDb.transaction('jate', 'readonly');

  const store = tx.objectStore('jate');

  const request = store.getAll();

  const result = await request;
  console.log('result.value', result);
  return result;

}

initdb();
