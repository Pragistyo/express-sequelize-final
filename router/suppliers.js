const express = require('express');
const router  = express.Router();
const model   = require('../models')



//----------------------------FIRST PAGE---------------------------
router.get('/',(req,res)=>{
  model.Suppliers.findAll({order:[['id','ASC']]}).then(rows=>{

    res.render('suppliers',{data:rows})
  })
  .catch(err=>{
    throw err.toString()
  })
})
// ----------------------------ADD-------------------------------
//
// router.get('/add',(req,res)=>{
//   // res.send('hacktiv8')
//   res.render('itemsAdd',{err_msg:false})
// })
//
// router.post('/add',(req,res)=>{
//   // res.send('paijo')
//   model.Item.create({
//                         name: req.body.name,
//                         brand: req.body.brand,
//                         codeitem: req.body.codeitem
//                     })
//   .then(()=>{
//     {res.redirect('/items')}
//   })
//   .catch(err=>{
//     throw err.toString()
//   })
// })
// //-------------------------GET EDIT-----------------------------
//
// router.get('/edit/:id',(req,res)=>{
//   model.Item.findById(req.params.id).then(datanya=>{
//     res.render('itemEdit',{data:datanya,err_msg:false})
//     // res.send(datanya)
//   })
//   .catch(err=>{
//     throw err.toString()
//   })
// })
//
// //-----------------------EDIT UPDATE----------------------------
//
// router.post('/edit/:id',(req,res)=>{
//   model.Item.update({
//                         name: req.body.name,
//                         brand: req.body.brand,
//                         codeitem: req.body.codeitem
//
//                         },{where:{id:req.params.id}})
//   .then(()=>{
//     res.redirect('/items')
//   })
//   .catch(err=>{
//     throw err.toString()
//   })
// })
//
//
// //-------------------------DELETE----------------------------------
//
// router.get('/delete/:id',(req,res)=>{
//   model.Item.destroy({where:{id:req.params.id}}).then(()=>{
//     res.redirect('/items')
//   })
// })


module.exports = router
