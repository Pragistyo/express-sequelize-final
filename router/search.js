const express = require('express');
const router  = express.Router()
const model = require('../models');

// router.get('/',(req,res)=>{
//   res.render('search',{data:false,err_msg:false,title:'SEARCH PAGE'})
// })

router.get('/',(req,res)=>{
  // res.send(req.query.name.length)
  if(!req.query.name || req.query.name.length < 1){
    res.render('search',{data:false,err_msg:false,title:'SEARCH PAGE'})
  }else{
    // res.send(req.query.name)
    model.Item.findAll({
      include:[model.Suppliers],
      where:{
        name : {$iLike: `%${req.query.name}%`}
      }
    })
    .then(result=>{
      // res.send(result)
      res.render('search',{data:result,err_msg:false,title:'SEARCH PAGE'})
    })
  }
})

module.exports =router
