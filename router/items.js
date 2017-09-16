const express = require('express');
const router  = express.Router();
const model   = require('../models')
const money = require('../helper/moneyFormat');



//----------------------------FIRST PAGE---------------------------
router.get('/',(req,res)=>{
  model.Item.findAll({include:[model.Suppliers]},{order:[['id','ASC']]}).then(rows=>{
    let count = 0
    rows.forEach(z=>{
      if(z.Suppliers.length>0){
        z.Suppliers.map(d=>{
          return d.SupplierItem.price = money(d.SupplierItem.price)
        })
      }
      // return Promise.all(z.Items).then(mappings=>{
        // z.Items = mappings
        count++
        if(count == rows.length){
          // res.send(rows)
          res.render('items',{data:rows,err_msg:false})
        }
      // })
    })
    })
  .catch(err=>{
    throw err.toString()
  })
})
// ----------------------------ADD-------------------------------

router.get('/add',(req,res)=>{
  // res.send('hacktiv8')
  res.render('itemsAdd',{err_msg:false})
})

router.post('/add',(req,res)=>{
  // res.send('paijo')
  model.Item.create({
                        name: req.body.name,
                        brand: req.body.brand,
                        codeitem: req.body.codeitem
                    })
  .then(()=>{
    {res.redirect('/items')}
  })
  .catch(err=>{
    console.log(err);
    res.render('itemsAdd',{err_msg:err.errors[0].message})
  })
})
//-------------------------GET EDIT-----------------------------

router.get('/edit/:id',(req,res)=>{
  model.Item.findById(req.params.id).then(datanya=>{
    res.render('itemEdit',{data:datanya,err_msg:false})
    // res.send(datanya)
  })
  .catch(err=>{
    throw err.toString()
  })
})

//-----------------------EDIT UPDATE----------------------------

router.post('/edit/:id',(req,res)=>{
  model.Item.update({
                        name: req.body.name,
                        brand: req.body.brand,
                        codeitem: req.body.codeitem

                        },{where:{id:req.params.id}})
  .then(()=>{
    res.redirect('/items')
  })
  .catch(err=>{
    model.Item.findById(req.params.id).then(datanya=>{
      res.render('itemEdit',{data:datanya,err_msg:err.errors[0].message})
    })
  })
})


//-------------------------DELETE----------------------------------

router.get('/delete/:id',(req,res)=>{
  model.Item.destroy({where:{id:req.params.id}}).then(()=>{
    res.redirect('/items')
  })
})


module.exports = router
