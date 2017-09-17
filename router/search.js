const express = require('express');
const router  = express.Router()

router.get('/',(req,res)=>{
  res.render('search',{err_msg:false,title:'SEARCH PAGE'})
})

module.exports =router
