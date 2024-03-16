
const { promises } = require('fs');
const { access, constants } = require('fs').promises;
const EventEmitter = require('events');
const YAML = require('js-yaml');

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

module.exports = StarDB;