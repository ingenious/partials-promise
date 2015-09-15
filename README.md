# partials-promise
Create a set of Handlbars pre-compiled partials based on an array of directories


```
    partialsPromise = require('partials-promise'),
```
##API

  partialsPromise(array_of_paths, base_dirictory, Handlebars);

## Example
```
    partialsPromise([ 'news/views/_components', 'news/views/_partials', 'news/views'],__dirname,Handlebars);
```


