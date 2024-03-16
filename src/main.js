
const { promises } = require('fs');
const { access, constants } = require('fs').promises;
const EventEmitter = require('events');
const YAML = require('js-yaml');
const express = require('express');
const bodyParser = require('body-parser');

class StarDB extends EventEmitter {
    constructor(file) {
        super();
        this.file = file;
        this.data = {};
        this.load().catch(error => console.error('Error loading data:', error));

        
    }

    async save() {
        try {
            if (this.file.endsWith('.json')) {
                await promises.writeFile(this.file, JSON.stringify(this.data, null, 4));
            } else if (this.file.endsWith('.yaml')) {
                const yamlData = YAML.dump(this.data);
                await promises.writeFile(this.file, yamlData);
            } else {
                throw new Error('Unsupported file format. Support: github.com/fastuptime');
            }
        } catch (error) {
            throw new Error(`Error saving data: ${error.message}. Support: github.com/fastuptime`);
        }
    }

    async load() {
        try {
            const fileExists = await access(this.file, constants.F_OK).then(() => true).catch(() => false);
            if (!fileExists) {
                if (this.file.endsWith('.json')) {
                    await promises.writeFile(this.file, '{}');
                } else if (this.file.endsWith('.yaml')) {
                    await promises.writeFile(this.file, '');
                } else  {
                    throw new Error('Unsupported file format. Support: github.com/fastuptime');
                }
            }
            
            const data = await promises.readFile(this.file, 'utf8');
            if (this.file.endsWith('.json')) {
                this.data = JSON.parse(data);
            } else if (this.file.endsWith('.yaml')) {
                this.data = YAML.load(data);
            } else {
                throw new Error('Unsupported file format. Support: github.com/fastuptime');
            }
        } catch (error) {
            console.error(`Error loading data: ${error.message}. Support: github.com/fastuptime`);
        }
    }
    

    async get(key) {
        return this.data[key];
    }

    async set(key, value) {
        if (!key || typeof key !== 'string') {
            throw new Error('Key must be a non-empty string. Support: github.com/fastuptime');
        }
        if (typeof value === 'undefined') {
            throw new Error('Value must be defined. Support: github.com/fastuptime');
        }
        this.data[key] = value;
        try {
            await this.save();
            this.emit('set', key, value);
        } catch (error) {
            throw new Error(`Error saving data: ${error.message}. Support: github.com/fastuptime`);
        }
    }

    async delete(key) {
        delete this.data[key];
        try {
            await this.save();
        } catch (error) {
            throw new Error(`Error saving data: ${error.message}. Support: github.com/fastuptime`);
        }
    }

    async push(key, value) {
        if (!this.data[key]) this.data[key] = [];
        this.data[key].push(value);
        try {
            await this.save();
        } catch (error) {
            throw new Error(`Error saving data: ${error.message}. Support: github.com/fastuptime`);
        }
    }

    async pop(key) {
        if (this.data[key] && this.data[key].length > 0) {
            this.data[key].pop();
            try {
                await this.save();
            } catch (error) {
                throw new Error(`Error saving data: ${error.message}. Support: github.com/fastuptime`);
            }
        }
    }

    async shift(key) {
        if (this.data[key]) {
            this.data[key].shift();
            try {
                await this.save();
            } catch (error) {
                throw new Error(`Error saving data: ${error.message}. Support: github.com/fastuptime`);
            }
        }
    }

    async unshift(key, value) {
        if (!this.data[key]) this.data[key] = [];
        this.data[key].unshift(value);
        try {
            await this.save();
        } catch (error) {
            throw new Error(`Error saving data: ${error.message}. Support: github.com/fastuptime`);
        }
    }

    async deleteByIndex(key, index) {
        if (this.data[key]) {
            this.data[key].splice(index, 1);
            try {
                await this.save();
            } catch (error) {
                throw new Error(`Error saving data: ${error.message}. Support: github.com/fastuptime`);
            }
        }
    }

    async updateByIndex(key, index, value) {
        if (this.data[key]) {
            this.data[key][index] = value;
            try {
                await this.save();
            } catch (error) {
                throw new Error(`Error saving data: ${error.message}. Support: github.com/fastuptime`);
            }
        }
    }

    async find(key, value) {
        if (this.data[key]) {
            return this.data[key].find((element) => {
                return element === value;
            });
        }
    }

    async filter(key, value) {
        if (this.data[key]) {
            return this.data[key].filter((element) => {
                return element === value;
            });
        }
    }

    async map(key, callback) {
        if (this.data[key]) {
            return this.data[key].map(callback);
        }
    }

    fetchAll() {
        return this.data;
    }

    async deleteAll(access = false) {
        if (!access) throw new Error('Permission denied! Support: github.com/fastuptime');
        if(this.file.endsWith('.json')) this.data = {};
        if(this.file.endsWith('.yaml')) this.data = '';
        try {
            await this.save();
        } catch (error) {
            throw new Error(`Error saving data: ${error.message}. Support: github.com/fastuptime`);
        }
    }

    async destroy(access = false) {
        if (!access) throw new Error('Permission denied! Support: github.com/fastuptime');
        try {
            await promises.unlink(this.file);
        } catch (error) {
            throw new Error(`Error deleting file: ${error.message}. Support: github.com/fastuptime`);
        }
    }

    has(key) {
        return this.data.hasOwnProperty(key);
    }
}

class API extends EventEmitter {
    constructor(options) {
        super();
        this.port = options.port || 3001;
        this.db = new StarDB(options.db || 'starDB.json');
        this.auth = options.auth || false;
        this.authKeys = options.authKeys || [];

        this.app = express();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));

        this.app.get('/', (req, res) => {
            res.send(`<center><h1>✨ StarDB API - Live 🔥</h1><p>Support: <a href="https://github.com/fastuptime">github.com/fastuptime</a></p></center>`);
        });

        if (this.auth) {
            this.app.use((req, res, next) => {
                if (this.authKeys.includes(req.headers['x-api-key'])) {
                    next();
                } else {
                    res.status(401).send('Unauthorized');
                }
            });
        }
        
        this.app.get('/get/:key', async (req, res) => {
            const key = req.params.key;
            const value = await this.db.get(key);
            res.send(value);
        });

        this.app.post('/set/:key', async (req, res) => {
            const key = req.params.key;
            const value = req.body.value;
            if (typeof value === 'undefined') return res.status(400).send('Value must be defined');
            await this.db.set(key, value);
            res.send('OK');
        });

        this.app.delete('/delete/:key', async (req, res) => {
            const key = req.params.key;
            await this.db.delete(key);
            res.send('OK');
        });

        this.app.post('/push/:key', async (req, res) => {
            const key = req.params.key;
            const value = req.body.value;
            if (typeof value === 'undefined') res.status(400).send('Value must be defined');
            await this.db.push(key, value);
            res.send('OK');
        });

        this.app.delete('/pop/:key', async (req, res) => {
            const key = req.params.key;
            await this.db.pop(key);
            res.send('OK');
        });

        this.app.delete('/shift/:key', async (req, res) => {
            const key = req.params.key;
            await this.db.shift(key);
            res.send('OK');
        });

        this.app.post('/unshift/:key', async (req, res) => {
            const key = req.params.key;
            const value = req.body.value;
            res.status(400).send('Value must be defined');
            await this.db.unshift(key, value);
            res.send('OK');
        });

        this.app.delete('/deleteByIndex/:key/:index', async (req, res) => {
            const key = req.params.key;
            const index = parseInt(req.params.index);
            await this.db.deleteByIndex(key, index);
            res.send('OK');
        });

        this.app.post('/updateByIndex/:key/:index', async (req, res) => {
            const key = req.params.key;
            const index = parseInt(req.params.index);
            const value = req.body.value;
            if (typeof value === 'undefined') res.status(400).send('Value must be defined');
            await this.db.updateByIndex(key, index, value);
            res.send('OK');
        });

        this.app.get('/find/:key/:value', async (req, res) => {
            const key = req.params.key;
            const value = req.params.value;
            if (typeof value === 'undefined') res.status(400).send('Value must be defined');
            const result = await this.db.find(key, value);
            res.send(result);
        });

        this.app.get('/filter/:key/:value', async (req, res) => {
            const key = req.params.key;
            const value = req.params.value;
            if (typeof value === 'undefined') res.status(400).send('Value must be defined');
            const result = await this.db.filter(key, value);
            res.send(result);
        });

        this.app.get('/map/:key', async (req, res) => {
            const key = req.params.key;
            const result = await this.db.map(key, (element) => {
                return element;
            });
            res.send(result);
        });

        this.app.get('/fetchAll', async (req, res) => {
            const result = await this.db.fetchAll();
            res.send(result);
        });

        this.app.delete('/deleteAll', async (req, res) => {
            await this.db.deleteAll(true);
            res.send('OK');
        });

        this.app.delete('/destroy', async (req, res) => {
            await this.db.destroy(true);
            res.send('OK');
        });

        this.db.on('set', (key, value) => {
            this.emit('set', key, value);
        });

        this.db.on('delete', (key) => {
            this.emit('delete', key);
        });

        this.db.on('push', (key, value) => {
            this.emit('push', key, value);
        });

        this.db.on('pop', (key) => {
            this.emit('pop', key);
        });

        this.db.on('shift', (key) => {
            this.emit('shift', key);
        });

        this.db.on('unshift', (key, value) => {
            this.emit('unshift', key, value);
        });

        this.db.on('deleteByIndex', (key, index) => {
            this.emit('deleteByIndex', key, index);
        });

        this.db.on('updateByIndex', (key, index, value) => {
            this.emit('updateByIndex', key, index, value);
        });

        this.db.on('deleteAll', () => {
            this.emit('deleteAll');
        });

        this.db.on('destroy', () => {
            this.emit('destroy');
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`StarDB API listening at http://localhost:${this.port}`);
        });
    }
}

module.exports = {
    StarDB,
    API
};