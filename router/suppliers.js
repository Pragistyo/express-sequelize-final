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

router.get('/add',(req,res)=>{
  // res.send('hacktiv8')
  res.render('suppliersAdd',{err_msg:false})
})

router.post('/add',(req,res)=>{
  // res.send('paijo')
  model.Suppliers.create({
                        name: req.body.name,
                        kota: req.body.kota
                    })
  .then(()=>{
    {res.redirect('/suppliers')}
  })
  .catch(err=>{
    throw err.toString()
  })
})
//-------------------------GET EDIT-----------------------------

router.get('/edit/:id',(req,res)=>{
  model.Suppliers.findById(req.params.id).then(datanya=>{
    res.render('suppliersEdit',{data:datanya,err_msg:false})
    // res.send(datanya)
  })
  .catch(err=>{
    throw err.toString()
  })
})

//-----------------------EDIT UPDATE----------------------------

router.post('/edit/:id',(req,res)=>{
  model.Suppliers.update({
                        name: req.body.name,
                        kota: req.body.kota,

                        },{where:{id:req.params.id}})
  .then(()=>{
    res.redirect('/suppliers')
  })
  .catch(err=>{
    throw err.toString()
  })
})


// //-------------------------DELETE----------------------------------

router.get('/delete/:id',(req,res)=>{
  model.Suppliers.destroy({where:{id:req.params.id}}).then(()=>{
    res.redirect('/suppliers')
  })
})


module.exports = router
