## 🌟 StarDB: Kolay ve Güvenilir Kalıcı JSON Veritabanı


### 🚀 Sürüm 1.1.0'daki yenilikler: YAML Desteği!
Artık StarDB, JSON'un yanı sıra YAML dosya formatını da destekliyor. Daha iyi okunabilirlik ve esneklik için verilerinizi YAML formatında saklayabilirsiniz.

```js
// YAML ile örnek kullanım
const db = new StarDB('data.yaml');
```

**Giriş**

StarDB, Node.js için JSON/YAML verilerini kalıcı olarak depolamak ve yönetmek için basit ve güvenilir bir çözüm sunan hafif ve asenkron bir modüldür. Tanıdık bir anahtar-değer arayüzü ile dosya tabanlı veri depolama işlemini basitleştirir ve kalıcı ancak esnek veri yönetimi gerektiren uygulamalar için mükemmel bir seçimdir.

**Özellikler:**

* **Kolay Kullanım:** Sezgisel API, JSON, YAML verileriyle çalışmayı basit ve hızlı hale getirir.
* **Güvenilirlik:** Veritabanı dosyaları, veri kaybını önleyen sağlam bir formatta saklanır.
* **Hız:** Veritabanı sorguları hızlı ve verimlidir.
* **Esneklik:** JSON ve YAML tüm gücünden yararlanarak karmaşık veri yapıları depolayabilirsiniz.
* **Genişletilebilir:** Gelişmiş işlevsellik için özel modüller ve eklentiler ekleyebilirsiniz.

**🚀 Kurulum:**

StarDB'yi npm kayıt deposundan kurmak için:

```bash
npm install stardb
```

**📘 Kullanım:**

1. **Modülü İçe Aktarın:**

```javascript
const StarDB = require('stardb');
```

2. **Bir Örnek Oluşturun:**

```javascript
const db = new StarDB('data.json'); // 'data.json'u istediğiniz dosya adıyla değiştirin
// veya
const db = new StartDB('data.yaml'); // 'data.yaml'u istediğiniz dosya adıyla değiştirin
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

**🛠️ Hata İşleme:**

StarDB, çeşitli potansiyel sorunlar için, geçersiz dosya erişimi, anahtar doğrulama ve veri kaydetme hataları gibi bilgilendirici hata mesajları