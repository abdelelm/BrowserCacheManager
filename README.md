# BrowserCacheManager
Manage cacheStorage , localStorage , sessionStorage for browser

## How to use
``` 
$ npm i browsercachemanager

``` 
## How to use 

```
var manager = new StorageManager();
manager.localStorage().setItem("demo" , "demo")
manager.localStorage().getItem("demo").then(function(value) {
    console.log(value);
})

var jsonData = { demo : "itworks" };
manager.localStorage().setItem("demo" , JSON.stringify(jsonData))
manager.localStorage().getItem("demo", "json").then(function(value) {
    console.log(value); // object 
})
manager.localStorage().getItem("demo").then(function(value) {
    console.log(value); // string 
})
```
## `new StorageManager(options)`

The options can string with the default storage you want to use : 
```
    var storage = new StorageManager("local");
```

The options can be an object with the default storage you want to use : 
```
    var storage = new StorageManager({ type : "local" });
```

The options can contain the name of the cache storage
```
    var storage = new StorageManager({ type : "cache" , cacheName : "CacheV1" });
```

The options can contain a prefix and postfix for the key
```
    var storage = new StorageManager({ type : "local" , prefix : "api-" , postfix : "-v1" });
    storage.setItem("test" , "demo");
    // the key will be "api-test-v1"
```

## Methods 

All methods and property returns a `Promise`

### `manager.getItem(name , type)`

Return a value with a specific type parsing (by default string).

### `manager.getItems(type)`

Return all the value with a specific type parsing (by default string).

### `manager.setItem(key, value)`

Set a value with a specific key in the chosen storage

### `manager.removeItem(key)`

Remove from storage with a specific key
  
### `manager.clear()`

Clear all the storage

### `manager.length()`

Return the length of the storage

### `manager.key(index)`

Return an item at a specific index

### `manager.allStorage()`

Return an instance that has `key()` , `length()`, `clear()`, `removeItem()` , `setItem()` that applies to all the browser supported storages.

Most of function return an object with { session : <reponse> , cache : <response> , localhost : <response> }

### `manager.localStorage()`

Return an localStorage instance that has all the methods implemented by the StorageManager 

### `manager.sessionStorage()`

Return an sessionStorage instance that has all the methods implemented by the StorageManager

### `manager.cacheStorage()`

Return an cacheStorage instance that has all the methods implemented by the StorageManager