# partials-promise
Create a set of Handlbars pre-compiled partials based on an array of directories

```
    $ npm install ingenious/partials-promise
```
```
    var partialsPromise = require('partials-promise');
```
##API

  ***partialsPromise(array_of_paths, base_directory, Handlebars)**;
  
  Partial references in Handlebars are template filenames without extension
  
  Return a Promise which is fulfilled with an array of matching templates.
  
  If the same filename occurs in more than one diretory then the registered partial will be replaced,
  so the directories should be in order of increasing preference.

## Example
```
    partialsPromise([ 'news/views/_components', 'news/views/_partials', 'news/views'],__dirname, Handlebars)
        .then(function(templates){
        
            //  ..  partials now registered in Handelbars
            console.log(templates.length+' components registered');
    
        }).catch(function(err){
            console.log(err);
        });
```


