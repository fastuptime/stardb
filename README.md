## 🌟 StarDB: Easy and Reliable Persistent JSON/YAML Rest API and Data Management

### 🔥 What's New in Version 1.2.0: API Support!
StarDB can now work with RESTful APIs in addition to JSON and YAML files. The API makes your database files accessible remotely and provides a secure key-based authentication system.

```js
// Example usage with API
const restFullAPI = new API({
    port: 3000,
    auth: true,
    db: 'starDB.json', // Default is 'starDB.json'
    authKeys: [
        'key1',
        'key2',
        'key3'
    ],
});
```

### 🚀 What's New in Version 1.1.0: YAML Support!
StarDB now supports the YAML file format in addition to JSON. You can store your data in YAML format for better readability and flexibility.

```js
// Example usage with YAML
const db = new StarDB('data.yaml').StarDB;
```

**Introduction**

StarDB is a lightweight and asynchronous module that offers a simple and reliable solution for storing and managing JSON/YAML data persistently in Node.js. It simplifies the file-based data storage process with a familiar key-value interface and is an excellent choice for applications requiring persistent yet flexible data management. Additionally, it can work with RESTful APIs, making your database files remotely accessible and providing a secure key-based authentication system.

**Features:**

* **Easy to Use:** The intuitive API makes working with JSON and YAML data quick and straightforward.
* **Reliability:** Database files are stored and managed in a robust format that prevents data loss.
* **Speed:** Database queries are fast and efficient, compatible with asynchronous operations.
* **Flexibility:** JSON and YAML support allows you to store complex data structures.
* **RESTful API Support:** Makes your database files remotely accessible and provides a secure key-based authentication system.
* **Extensibility:** You can add custom modules and plugins for advanced functionality.

**🚀 Installation:**

To install StarDB from the npm registry, use:

```bash
npm install stardb
```

**📘 Usage:**

1. **Import the Module:**

```javascript
const { StarDB, API } = require('stardb');
```

2. **Create an Instance:**

```javascript
const db = new StarDB('data.json').StarDB; // Replace 'data.json' with your desired file name
// or
const db = new StartDB('data.yaml').StarDB; // Replace 'data.yaml' with your desired file name
```

Creates an instance of StarDB associated with the specified file ('data.json' in this example). StarDB will automatically create the file if it doesn't exist.

3. **CRUD Operations:**

StarDB provides methods for common CRUD (Create, Read, Update, Delete) operations on your JSON/YAML data:

* **`set(key, value)`:** Stores a key-value pair in the database.
* **`get(key)`:** Retrieves the value associated with a key.
* **`delete(key)`:** Removes the specified key and its value from the database.
* **`push(key, value)`:** Adds a value to an array stored under the specified key (creates the array if it doesn't exist).
* **`pop(key)`:** Removes and returns the last element from an array stored under the specified key.
* **`shift(key)`:** Removes and returns the first element from an array stored under the specified key.
* **`unshift(key, value)`:** Adds a value to the beginning of an array stored under the specified key (creates the array if it doesn't exist).
* **`deleteByIndex(key, index)`:** Deletes the item at the specified index from an array stored under the specified key.
* **`updateByIndex(key, index, value)`:** Updates the value at the specified index in an array stored under the specified key.

4. **Search and Transformation:**

* **`find(key, value)`:** Finds the first item in the database associated with the provided value for the specified key.
* **`filter(key, value)`:** Returns a new array containing all items in the database associated with the provided value for the specified key.
* **`map(key, callback)`:** Applies a callback function to each item stored under the specified key and returns a new array of transformed items.

5. **Additional Methods:**

* **`fetchAll()`:** Retrieves the entire contents of the database as a plain JavaScript object.
* **`deleteAll(access = false)`:** Deletes all data from the database (requires `access` permission for security).
* **`destroy(access = false)`:** Permanently deletes the database file (requires `access` permission for security).
* **`has(key)`:** Checks if a key exists in the database.

6. **Using the RESTful API 🎯:**

```javascript
const restFullAPI = new API({
    port: 3000,
    auth: true,
    db: 'starDB.json', // Default is 'starDB.json'
    authKeys: [
        'key1',
        'key2',
        'key3'
    ],
});

// Start the API

restFullAPI.start();
```

1. **Adding Data (POST Request)**:

    For example, let's add a key-value pair by sending a POST request to the `/set/:key` route. We'll set the key as "name" and the value as "John Doe".

    ```bash
    curl -X POST -H "Content-Type: application/json" -d '{"value": "John Doe"}' http://localhost:3001/set/name
    ```

    This request will add the key "name" with the value "John Doe" to StarDB.

2. **Retrieving Data (GET Request)**:

    To retrieve the data we added, let's send a GET request to the `/get/:key` route. We'll use "name" as the key again.

    ```bash
    curl http://localhost:3001/get/name
    ```

    This request will return the value associated with the "name" key.

3. **Updating Data (POST Request)**:

    To update the value of an existing key, we can send a POST request to the `/set/:key` route again. Let's update the value of the "name" key to "Jane Doe".

    ```bash
    curl -X POST -H "Content-Type: application/json" -d '{"value": "Jane Doe"}' http://localhost:3001/set/name
    ```

    This request will update the value of the "name" key to "Jane Doe".

4. **Deleting Data (DELETE Request)**:

    To delete a key-value pair, we can send a DELETE request to the `/delete/:key` route. Let's delete the "name" key.

    ```bash
    curl -X DELETE http://localhost:3001/delete/name
    ```

    This request will delete the "name" key and its value from the database.

**📚 Example Usage:**

```javascript
const { StarDB, API } = require('stardb');

// Example usage with JSON

const db = new StarDB('data.json').StarDB;

//

 Adding data
db.set('name', 'John Doe');

// Retrieving data
console.log(db.get('name')); // John Doe

// Updating data
db.set('name', 'Jane Doe');

// Deleting data
db.delete('name');

// Adding to an array
db.push('fruits', 'apple');
db.push('fruits', 'banana');

// Retrieving from an array
console.log(db.pop('fruits')); // banana

// Deleting from an array
db.deleteByIndex('fruits', 0);

// Adding to the beginning of an array
db.unshift('fruits', 'orange');

// Retrieving from the beginning of an array
console.log(db.shift('fruits')); // orange

// Updating an array
db.updateByIndex('fruits', 0, 'grape');

```

**🛠️ Error Handling:**

StarDB provides informative error messages for various potential issues, such as invalid file access, key authentication, and data storage errors.