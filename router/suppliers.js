const express = require('express');
const router  = express.Router();
const model   = require('../models')



//----------------------------FIRST PAGE---------------------------
router.get('/',(req,res)=>{
  model.Suppliers.findAll({order:[['id','ASC']]},{include:[model.Item]}).then(rows=>{
    // res.send(rows)
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
//----------------------ADD ITEM TO SUPPLIERS--------------------------------
router.get('/:id/additem',(req,res)=>{
  model.Suppliers.findById(req.params.id).then(rows=>{
    model.Item.findAll().then(rowsItem=>{
      res.render('supplierAddItem',{data:rows,dataItem:rowsItem,err_msg:false,pageTitle:"Add Item to Supplier"})
    })
  })
})

router.post('/:id/addsubject',(req,res)=>{
  // model.StudentSubject.findOne({where:{StudentId:req.params.id}).then(conj=>{
  //
  // if(conj.)
  //   let count = false;
  //   for (var i = 0; i < conj.length; i++) {
  //     if(req.body.SubjectId == conj[i].SubjectId){
  //       count = true
  //     }
  //   }
  //   if(count == true){
      model.SupplierItem.create({
                                    StudentId:req.params.id,
                                    SubjectId:req.body.SubjectId
                                  })
      .then(()=>{
        res.redirect('/suppliers')
      })
  //   }
  //   if(count == false)
  //     model.Student.findById(req.params.id).then(rows=>{
  //       model.Subject.findAll().then(rowsSubject=>{
  //         res.render('subjectStudentAdd',{data:rows,dataSubject:rowsSubject,err_msg:"Already has subject",pageTitle:"Add Subject to Student"})
  //       })
  //     })
  //   }
  // }
  // else{
  //
  // }
    // .catch(err=>{
    //     throw err.toString()
    //   })
    // })
  })

// //-------------------------DELETE----------------------------------

router.get('/delete/:id',(req,res)=>{
  model.Suppliers.destroy({where:{id:req.params.id}}).then(()=>{
    res.redirect('/suppliers')
  })
})


module.exports = router
