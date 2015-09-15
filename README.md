# partials-promise
Create a set of Handlbars pre-compiled partials based on an array of directories


```
    var partialsPromise = require('partials-promise');
```
##API

  partialsPromise(array_of_paths, base_dirictory, Handlebars);
  
  Partial references in Handlebars are template filenames without extension
  
  Return a Promise which is fulfilled with an array of matching templates;

## Example
```
    partialsPromise([ 'news/views/_components', 'news/views/_partials', 'news/views'],__dirname, Handlebars)
        .then(function(templates){
        
            //  ..  partials now registered in Handelbars
            console.log(templates.length+' components registered);
    
        });
```


