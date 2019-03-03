export class cacheStorageAsyncWrap {
    constructor(options) {
        this.type = options.type || "text";
        this.options = options;
        this.length = 0;
        this.name = options.cacheName || "BrowserCacheManager";
        if (!caches)
            throw new Error("Cache not available");
    }

    init() {
        caches.open(this.name).then((cache) => {
            this.cache = cache;
        });
    }
    clearThisCache() {
        if (!this.cache)
            return Promise.resolve();

        return this.clear(this.name);
    }
    getItemName(name) {
        if(typeof name !== "string")
            return name;
        return (this.options.prefix || "") + name + (this.options.postfix || "");
    }
    getItems() {
        if (!this.cache)
            return Promise.resolve([]);

        return this.cache.keys().then(keylist => {
            var promises = keylist.map(key => {
                return this.getItem(key).then(val => {
                    return {
                        key: key.url,
                        value: val
                    }
                })
            });
            return Promise.all(promises).then(result => {
                var final = {};
                result.forEach(node => {
                    if (node.key)
                        final[node.key] = node.value;
                })
                return final;
            })
        });

    }
    clear(name) {
        return caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (!name || cacheName === name)
                        return caches.delete(cacheName);
                    else
                        return Promise.resolve();
                })
            ).then(x => {
                this.init();
                return x;
            })
        });
        
    }
    getItem(name) {
        if (!this.cache)
            return Promise.resolve();
        return this.cache.match(this.getItemName(name));
    }
    key(k) {
        if (!this.cache)
            return Promise.resolve();
        return this.cache.keys().then(reqs => {
            return reqs[k]
        });
    }
    removeItem(name) {
        if (!this.cache)
            return Promise.resolve();
        return this.cache.delete(this.getItemName(name));
    }
    setItem(name, value) {
        if (!this.cache)
            return Promise.resolve();

        return this.cache.put(this.getItemName(name), new Response(value))
    }
}
export class localStorageAsyncWrap {
    constructor(options) {
        this.storage = localStorage;
        this.options = options;
        if (!this.storage)
            throw new Error("SessionStorage not available");
    }
    init() {}
    get length() {
        return this.storage.length;
    }
    getItemName(name) {
        return (this.options.prefix || "") + name + (this.options.postfix || "");
    }
    getItems() {
        return new Promise((res) => res(Object.assign({}, this.storage)));
    }
    clear() {
        return new Promise((res) => {
            res(this.storage.clear());
        })

    }
    getItem(name) {
        return new Promise((res) => {
            res(this.storage.getItem(this.getItemName(name)));
        })
    }

    key(k) {
        return new Promise((res) => {
            res(this.storage.key(k));
        })
    }

    removeItem(name) {
        return new Promise((res) => {
            res(this.storage.removeItem(this.getItemName(name)));
        });
    }

    setItem(name, value) {
        return new Promise((res) => {
            res(this.storage.setItem(this.getItemName(name), value));
        });
    }
}
export class sessionStorageAsyncWrap {
    constructor(options) {
        this.storage = sessionStorage;
        this.options = options;
        if (!this.storage)
            throw new Error("SessionStorage not available");
    }

    init() {}
    getItemName(name) {
        return (this.options.prefix || "") + name + (this.options.postfix || "");
    }
    get length() {
        return new Promise((res) => res(this.storage.length));
    }
    getItems() {
        return new Promise((res) => res(Object.assign({}, this.storage)));
    }

    clear() {
        return new Promise((res) => {
            res(this.storage.clear());
        })

    }
    getItem(name) {
        return new Promise((res) => {
            res(this.storage.getItem(this.getItemName(name)));
        })
    }
    key(k) {
        return new Promise((res) => {
            res(this.storage.key(k));
        })
    }

    removeItem(name) {
        return new Promise((res) => {
            res(this.storage.removeItem(this.getItemName(name)));
        });
    }

    setItem(name, value) {
        return new Promise((res) => {
            res(this.storage.setItem(this.getItemName(name), value));
        });
    }
}