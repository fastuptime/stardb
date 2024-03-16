## 🌟 StarDB: Easy and Reliable Persistent JSON Database

**Introduction**

StarDB is a lightweight and asynchronous module that provides a simple and reliable solution for storing and managing JSON data persistently in Node.js. With a familiar key-value interface, it simplifies file-based data storage and is an excellent choice for applications requiring persistent yet flexible data management.

**Features:**

* **Easy to Use:** Intuitive API makes working with JSON data simple and fast.
* **Reliability:** Database files are stored in a robust format that prevents data loss.
* **Speed:** Database queries are fast and efficient.
* **Flexibility:** Utilize the full power of JSON to store complex data structures.
* **Extensibility:** Add custom modules and plugins for advanced functionality.

**🚀 Installation:**

To install StarDB from the npm registry:

```bash
npm install stardb
```

**📘 Usage:**

1. **Import the Module:**

```javascript
const StarDB = require('stardb');
```

2. **Create an Instance:**

```javascript
const db = new StarDB('data.json'); // Replace 'data.json' with your desired file name
```

Creates an instance of StarDB associated with the specified file ('data.json' in this example). If the file doesn't exist, StarDB will automatically create it on first use.

3. **CRUD Operations:**

StarDB provides methods for common CRUD (Create, Read, Update, Delete) operations on your JSON data:

* **`set(key, value)`:** Stores a key-value pair in the database.
* **`get(key)`:** Retrieves the value associated with a key.
* **`delete(key)`:** Removes the specified key and its value from the database.
* **`push(key, value)`:** Adds a value to an array stored under the specified key (creates the array if it doesn't exist).
* **`pop(key)`:** Removes and returns the last item from an array stored under the specified key.
* **`shift(key)`:** Removes and returns the first item from an array stored under the specified key.
* **`unshift(key, value)`:** Adds a value to the beginning of an array stored under the specified key (creates the array if it doesn't exist).
* **`deleteByIndex(key, index)`:** Deletes an item at a specific index from an array stored under the specified key.
* **`updateByIndex(key, index, value)`:** Updates the value at a specific index in an array stored under the specified key.

4. **Searching and Transformation:**

* **`find(key, value)`:** Finds the first item in an array stored under the specified key that matches the provided value.
* **`filter(key, value)`:** Returns a new array containing all items from an array stored under the specified key that match the provided value.
* **`map(key, callback)`:** Applies a callback function to each item in an array stored under the specified key and returns a new array of transformed items.

5. **Additional Methods:**

* **`fetchAll()`:** Retrieves the entire contents of the database as a plain JavaScript object.
* **`deleteAll(access = false)`:** Deletes all data from the database (requires `access` permission for security).
* **`destroy(access = false)`:** Permanently deletes the database file (requires `access` permission for security).
* **`has(key)`:** Checks if a key exists in the database.

**🛠️ Error Handling:**

StarDB provides informative error messages for various potential issues, including invalid file access, key validation, and data saving errors.

---