## 🌟 StarDB: Easy and Reliable Persistent JSON Database

### 🚀 What's New in Version 1.1.0: YAML Support!
StarDB now supports YAML file format in addition to JSON. You can store your data in YAML format for better readability and flexibility.

```js
// Example usage with YAML
const db = new StarDB('data.yaml');
```

**Introduction**

StarDB is a lightweight and asynchronous module that provides a simple and reliable solution for storing and managing JSON/YAML data persistently in Node.js. It simplifies file-based data storage with a familiar key-value interface, making it an excellent choice for applications requiring persistent yet flexible data management.

**Features:**

* **Easy to Use:** The intuitive API makes working with JSON/YAML data quick and easy.
* **Reliability:** Database files are stored in a robust format to prevent data loss.
* **Speed:** Database queries are fast and efficient.
* **Flexibility:** You can store complex data structures using the full power of JSON and YAML.
* **Extendibility:** You can add custom modules and plugins for advanced functionality.

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
// or
const db = new StartDB('data.yaml'); // Replace 'data.yaml' with your desired file name
```

Creates a StarDB instance associated with the specified file ('data.json' in this example). If the file does not exist, StarDB will create it automatically on the first use.

3. **CRUD Operations:**

StarDB provides methods for common CRUD (Create, Read, Update, Delete) operations on your JSON/YAML data:

* **`set(key, value)`:** Stores a key-value pair in the database.
* **`get(key)`:** Retrieves the value associated with a key.
* **`delete(key)`:** Removes the specified key and its value from the database.
* **`push(key, value)`:** Adds a value to an array stored under the specified key (creates the array if it doesn't exist).
* **`pop(key)`:** Removes and returns the last item from an array stored under the specified key.
* **`shift(key)`:** Removes and returns the first item from an array stored under the specified key.
* **`unshift(key, value)`:** Adds a value to the beginning of an array stored under the specified key (creates the array if it doesn't exist).
* **`deleteByIndex(key, index)`:** Removes the item at the specified index from an array stored under the specified key.
* **`updateByIndex(key, index, value)`:** Updates the value of the item at the specified index in an array stored under the specified key.

4. **Searching and Transforming:**

* **`find(key, value)`:** Finds the first item with the specified value under the specified key.
* **`filter(key, value)`:** Returns a new array containing all items with the specified value under the specified key.
* **`map(key, callback)`:** Applies a callback function to each item stored under the specified key and returns a new array of transformed items.

5. **Additional Methods:**

* **`fetchAll()`:** Retrieves the entire content of the database as a plain JavaScript object.
* **`deleteAll(access = false)`:** Deletes all data from the database (requires `access` permission for security).
* **`destroy(access = false)`:** Permanently deletes the database file (requires `access` permission for security).
* **`has(key)`:** Checks if a key exists in the database.

**🛠️ Error Handling:**

StarDB provides informative error messages for various potential issues, such as invalid file access, key validation, and data-saving errors.

--- 