const express    = require('express')
const bodyParser = require('body-parser');
const app        = express();


app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

const index     = require('./router/index.js');
const items     = require('./router/items.js');
const suppliers = require('./router/suppliers.js');
const search    = require('./router/search.js');



app.use('/', index)
app.use('/items', items)
app.use('/suppliers', suppliers)
app.use('/search', search)


app.listen(process.env.PORT || 3000,()=>{
  console.log('Port 3000 Opened !');
})

// Buatlah applikasi CRUD untuk tabel Suppliers pada file suppliers.js
// GET /suppliers (menampilkan semua data supplier)
// GET /suppliers/add (menampilkan form untuk input)
// POST /suppliers/add (menghandle input dari form)
// GET /suppliers/edit/:id (menampilkan form data suppliers berdasarkan id)
// POST /suppliers/edit/:id (meng-handle input dari form saat update)
// GET /suppliers/delete/:id (men-delete data suppliers berdasarkan id)
