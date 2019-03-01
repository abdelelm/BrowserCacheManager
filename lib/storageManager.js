import {
    cacheStorageAsyncWrap,
    localStorageAsyncWrap,
    sessionStorageAsyncWrap
} from "./storageWrappers"

var implementedStorages = ["session", "local", "cache"];
var multipleStorageResponse = function (result) {
    var final = {};
    implementedStorages.forEach((st, i) => {
        final[st] = result[i]
    })
    return final;
}

export class StorageManager {
    warn(...msg) {
        try {
            console.warn.apply(console, msg)
        } catch (e) {}
    }
    setSupportedStorage(options) {
        this.supportedStorage = {};
        try {
            this.supportedStorage.local = new localStorageAsyncWrap(options);
            this.supportedStorage.local.init();
        } catch (e) {}
        try {
            this.supportedStorage.session = new sessionStorageAsyncWrap(options);
            this.supportedStorage.session.init();
        } catch (e) {}
        try {
            this.supportedStorage.cache = new cacheStorageAsyncWrap(options);
            this.supportedStorage.cache.init();
        } catch (e) {}


        return this.supportedStorage;
    }
    constructor(options) {
        if (!options)
            options = ["cache", "session", "local"];
        if (typeof options === "string" || Array.isArray(options))
            options = {
                type: options
            }
        if (typeof options.type === "string")
            options.type = [options.type];
        if (!Array.isArray(options.type))
            throw Error("Invalid options.type value ( array or string )")

        this.options = options;
        this.setSupportedStorage(options)

        this.options.type = this.options.type.map(type => this.supportedStorage[type]).filter(storage => !!storage);
        if (this.options.type.length == 0)
            this.warn("No supported storage for this browser");
        this.storage = this.options.type[0];

        for (var i in this.supportedStorage) {
            const st = this.supportedStorage[i];
            this[i + "Storage"] = () => {
                var clone = Object.assign(Object.create(Object.getPrototypeOf(this)), this, {
                    storage: st
                })
                return clone;
            }
        }



    }
    parseResponse(resp, type) {

        return new Promise((res) => {
            if (!resp)
                return res(resp);
            var parsedResp;
            try {
                switch ((!type || !type.toLowerCase) ? "default" : type.toLowerCase()) {
                    case "json":
                        parsedResp = (typeof resp.json === "function" ? resp.json.bind(resp) : Promise.resolve(JSON.parse(resp)));
                        break;
                    case "raw":
                        parsedResp = Promise.resolve(resp);
                        break;
                    case "blob":
                        parsedResp = (typeof resp.blob === "function" ? resp.blob.bind(resp) : Promise.resolve(new Blob(resp)));
                        break;
                    case "formData":
                        parsedResp = (typeof resp.formData === "function" ? resp.formData.bind(resp) : Promise.resolve(new FormData(resp)));
                        break;
                    default:
                        parsedResp = (typeof resp.text === "function" ? resp.text.bind(resp) : Promise.resolve(resp));
                        break;
                }
            } catch (e) {
                console.error(e);
                parsedResp = Promise.resolve(resp);
            }

            if(typeof parsedResp === "function")
                 parsedResp().then(res).catch(x => res(x))
            else    
                 parsedResp.then(res).catch(() => res(resp))
        })





    }
    getItem(name, type) {
        if (!this.storage)
            return Promise.resolve(null);

        return this.storage.getItem(name).then(resp => {
            return this.parseResponse(resp, type || this.options.responseType);
        });
    }
    removeItem(name) {
        if (!this.storage)
            return Promise.resolve(false);
        return this.storage.removeItem(name);
    }
    setItem(name, value) {
        if (!this.storage)
            return Promise.resolve(false);
        return this.storage.setItem(name, value)
    }
    key(k) {
        if (!this.storage)
            return Promise.resolve();

        return this.storage.key(k)
    }
    clear() {
        if (!this.storage)
            return Promise.resolve();
        return this.storage.clear()
    }
    getItems(type) {
        if (!this.storage)
            return Promise.resolve({});

        return this.storage.getItems().then(resp => {
            if (!resp)
                return Promise.resolve({});

            var promises = Object.keys(resp).map(k => {
                return this.parseResponse(resp[k], type || this.options.responseType)
            });
            return Promise.all(promises).then(parsedRes => {
                Object.keys(resp).forEach((pr, i) => {
                    resp[pr] = parsedRes[i];
                });
                return resp;
            });
        })
    }
    length() {
        return this.storage.length;
    }
    allStorages() {
        return {
            clear: () => {
                var promises = implementedStorages.map(x => {
                    if (this.supportedStorage[x])
                        return this.supportedStorage[x].clear();
                    else
                        return Promise.resolve(null)

                })
                return Promise.all(promises).then(multipleStorageResponse);
            },
            getItem: (n, type) => {
                var promises = implementedStorages.map(x => {
                    if (this.supportedStorage[x])
                        return this.supportedStorage[x].getItem(n).then(resp => {
                            return this.parseResponse(resp, type || this.options.responseType);
                        });
                    else
                        return Promise.resolve(null)

                })
                return Promise.all(promises).then(multipleStorageResponse);
            },
            getItems: (type) => {
                var promises = implementedStorages.map(x => {
                    if (this.supportedStorage[x])
                        return this.supportedStorage[x].getItems().then(resp => {
                            if (!resp)
                                return Promise.resolve({});

                            var promises = Object.keys(resp).map(k => this.parseResponse(resp[k], type || this.options.responseType));
                            return Promise.all(promises)
                                .then(parsedRes => {
                                    Object.keys(resp).forEach((pr, i) => {
                                        resp[pr] = parsedRes[i];
                                    });
                                    return resp;
                                });

                        })
                    else
                        return Promise.resolve({})

                })
                return Promise.all(promises).then(multipleStorageResponse);
            },
            removeItem: (n) => {
                var promises = implementedStorages.map(x => {
                    if (this.supportedStorage[x])
                        return this.supportedStorage[x].removeItem(n);
                    else
                        return Promise.resolve(null)

                })
                return Promise.all(promises).then(multipleStorageResponse);
            },
            setItem: (n, v) => {
                var promises = implementedStorages.map(x => {
                    if (this.supportedStorage[x])
                        return this.supportedStorage[x].setItem(n, v);
                    else
                        return Promise.resolve(null)

                })
                return Promise.all(promises).then(multipleStorageResponse);
            },
            key: (k) => {
                var promises = implementedStorages.map(x => {
                    if (this.supportedStorage[x])
                        return this.supportedStorage[x].key(k);
                    else
                        return Promise.resolve(null)

                })
                return Promise.all(promises).then(result => {
                    var final = {};
                    implementedStorages.forEach((st, i) => {
                        final[st] = result[i]
                    })
                    return final;
                });
            }
        }
    }

}