## 🌟 StarDB: Kolay ve Güvenilir Kalıcı JSON/YAML Rest API ve Veri Yönetimi

### 🔥 Sürüm 1.2.0'daki yenilikler: API Desteği!
Artık StarDB, JSON ve YAML dosyalarının yanı sıra RESTful API'lerle de çalışabilir. API, veritabanı dosyalarınızı uzaktan erişilebilir hale getirir ve güvenli kimlik doğrulama için anahtar tabanlı bir sistem sunar.

```js
// API ile örnek kullanım
const restFullAPI = new API({
    port: 3000,
    auth: true,
    db: 'starDB.json', // Varsayılan olarak 'starDB.json
    authKeys: [
        'key1',
        'key2',
        'key3'
    ],
});
```

### 🚀 Sürüm 1.1.0'daki yenilikler: YAML Desteği!
Artık StarDB, JSON'un yanı sıra YAML dosya formatını da destekliyor. Daha iyi okunabilirlik ve esneklik için verilerinizi YAML formatında saklayabilirsiniz.

```js
// YAML ile örnek kullanım
const db = new StarDB('data.yaml').StarDB;
```

**Giriş**

StarDB, Node.js için JSON/YAML verilerini kalıcı olarak depolamak ve yönetmek için basit ve güvenilir bir çözüm sunan hafif ve asenkron bir modüldür. Tanıdık bir anahtar-değer arayüzü ile dosya tabanlı veri depolama işlemini basitleştirir ve kalıcı ancak esnek veri yönetimi gerektiren uygulamalar için mükemmel bir seçimdir. Ayrıca, RESTful API'lerle de çalışabilir ve veritabanı dosyalarınızı uzaktan erişilebilir hale getirir ve güvenli kimlik doğrulama için anahtar tabanlı bir sistem sunar.

**Özellikler:**

* **Kolay Kullanım:** Sezgisel API, JSON, YAML verileriyle çalışmayı basit ve hızlı hale getirir.
* **Güvenilirlik:** Veritabanı dosyaları, veri kaybını önleyen sağlam bir formatta saklanır ve yönetilir.
* **Hız:** Veritabanı sorguları hızlı ve verimlidir ve asenkron işlemlerle uyumludur.
* **Esneklik:** JSON ve YAML tüm gücünden yararlanarak karmaşık veri yapıları depolayabilirsiniz.
* **RESTful API Desteği:** Veritabanı dosyalarınızı uzaktan erişilebilir hale getirir ve güvenli kimlik doğrulama için anahtar tabanlı bir sistem sunar.
* **Genişletilebilir:** Gelişmiş işlevsellik için özel modüller ve eklentiler ekleyebilirsiniz.

**🚀 Kurulum:**

StarDB'yi npm kayıt deposundan kurmak için:

```bash
npm install stardb
```

**📘 Kullanım:**

1. **Modülü İçe Aktarın:**

```javascript
const { StarDB, API } = require('stardb');
```

2. **Bir Örnek Oluşturun:**

```javascript
const db = new StarDB('data.json').StarDB; // 'data.json'u istediğiniz dosya adıyla değiştirin
// veya
const db = new StartDB('data.yaml').StarDB; // 'data.yaml'u istediğiniz dosya adıyla değiştirin
```

Belirtilen dosya ('data.json' bu örnekte) ile ilişkili bir StarDB örneği oluşturur. Dosya mevcut değilse, StarDB ilk kullanımda otomatik olarak oluşturacaktır.

3. **CRUD İşlemleri:**

StarDB, JSON/YAML verileriniz üzerinde yaygın CRUD (Oluşturma, Okuma, Güncelleme, Silme) işlemleri için yöntemler sunar:

* **`set(key, value)`:** Veritabanına bir anahtar-değer çifti depolar.
* **`get(key)`:** Bir anahtarla ilişkilendirilmiş değeri alır.
* **`delete(key)`:** Belirtilen anahtarı ve değerini veritabanından kaldırır.
* **`push(key, value)`:** Belirtilen anahtarda depolanan bir diziye bir değer ekler (dizi mevcut değilse oluşturur).
* **`pop(key)`:** Belirtilen anahtarda depolanan bir diziden son öğeyi kaldırır ve döndürür.
* **`shift(key)`:** Belirtilen anahtarda depolanan bir diziden ilk öğeyi kaldırır ve döndürür.
* **`unshift(key, value)`:** Belirtilen anahtarda depolanan bir dizinin başına bir değer ekler (dizi mevcut değilse oluşturur).
* **`deleteByIndex(key, index)`:** Belirtilen anahtarda depolanan bir dizide belirli bir dizine sahip öğeyi siler.
* **`updateByIndex(key, index, value)`:** Belirtilen anahtarda depolanan bir dizide belirli bir dizine sahip öğenin değerini günceller.

4. **Arama ve Dönüştürme:**

* **`find(key, value)`:** Belirtilen anahtarda, sağlanan değere uyan ilk öğeyi bulur.
* **`filter(key, value)`:** Belirtilen anahtarda, sağlanan değere uyan tüm öğeleri içeren yeni bir dizi döndürür.
* **`map(key, callback)`:** Belirtilen anahtarda depolanan her öğeye bir geri arama işlevi uygular ve dönüştürülmüş öğeler içeren yeni bir dizi döndürür.

5. **Ek Yöntemler:**

* **`fetchAll()`:** Tüm veritabanı içeriğini düz bir JavaScript nesnesi olarak alır.
* **`deleteAll(access = false)`:** Tüm verileri veritabanından siler (güvenlik için `access` izni gerekir).
* **`destroy(access = false)`:** Veritabanı dosyasını kalıcı olarak siler (güvenlik için `access` izni gerekir).
* **`has(key)`:** Bir anahtarın veritabanında olup olmadığını kontrol eder.

6. **RESTful API Kullanımı 🎯:**


```javascript
const restFullAPI = new API({
    port: 3000,
    auth: true,
    db: 'starDB.json', // Varsayılan olarak 'starDB.json
    authKeys: [
        'key1',
        'key2',
        'key3'
    ],
});

// API'yi başlat

restFullAPI.start();
```

1. **Veri Ekleme (POST Request)**:

    Örnek olarak, `/set/:key` rotası üzerinden POST isteği göndererek bir anahtar-değer çifti ekleyelim. Anahtarımızı "name" olarak belirleyelim ve değer olarak "John Doe" gönderelim.

    ```bash
    curl -X POST -H "Content-Type: application/json" -d '{"value": "John Doe"}' http://localhost:3001/set/name
    ```

    Bu istek, "name" anahtarıyla "John Doe" değerini StarDB'ye ekleyecektir.

2. **Veri Alma (GET Request)**:

    Eklediğimiz veriyi almak için `/get/:key` rotası üzerinden GET isteği gönderelim. Anahtar olarak yine "name"i kullanacağız.

    ```bash
    curl http://localhost:3001/get/name
    ```

    Bu istek, "name" anahtarının değerini döndürecektir.

3. **Veri Güncelleme (POST Request)**:

    Varolan bir anahtarın değerini güncellemek için yine `/set/:key` rotası üzerinden POST isteği gönderebiliriz. Örneğin, "name" anahtarının değerini "Jane Doe" olarak güncelleyelim.

    ```bash
    curl -X POST -H "Content-Type: application/json" -d '{"value": "Jane Doe"}' http://localhost:3001/set/name
    ```

    Bu istek, "name" anahtarının değerini "Jane Doe" olarak güncelleyecektir.

4. **Veri Silme (DELETE Request)**:

    Bir anahtar-değer çiftini silmek için `/delete/:key` rotası üzerinden DELETE isteği göndermemiz yeterli olacaktır. Örneğin, "name" anahtarını silelim.

    ```bash
    curl -X DELETE http://localhost:3001/delete/name
    ```

    Bu istek, "name" anahtarını ve değerini veritabanından silecektir.

**📚 Örnek Kullanım:**

```javascript
const { StarDB, API } = require('stardb');

// JSON ile örnek kullanım

const db = new StarDB('data.json').StarDB;

// Veri ekleme
db.set('name', 'John Doe');

// Veri alma
console.log(db.get('name')); // John Doe

// Veri güncelleme
db.set('name', 'Jane Doe');

// Veri silme
db.delete('name');

// Diziye veri ekleme
db.push('fruits', 'apple');
db.push('fruits', 'banana');

// Diziden veri alma
console.log(db.pop('fruits')); // banana

// Diziden veri silme
db.deleteByIndex('fruits', 0);

// Dizinin başına veri ekleme
db.unshift('fruits', 'orange');

// Dizinin başından veri alma
console.log(db.shift('fruits')); // orange

// Diziyi güncelleme
db.updateByIndex('fruits', 0, 'grape');

```

**🛠️ Hata İşleme:**

StarDB, çeşitli potansiyel sorunlar için, geçersiz dosya erişimi, anahtar doğrulama ve veri kaydetme hataları gibi bilgilendirici hata mesajları