const express = require('express');
const router  = express.Router();
const model   = require('../models')
const money = require('../helper/moneyFormat');



//----------------------------FIRST PAGE---------------------------
router.get('/',(req,res)=>{
  model.Suppliers.findAll({include:{model:model.Item}},{order:[['id','ASC']]}).then(rows=>{
    // console.log('------->',rows.length);
    // res.send(rows[0].Items)
    if(rows.length > 0){
      let count = 0
      rows.forEach(z=>{
        if(z.Items.length>0){
          z.Items.map(d=>{
            return d.SupplierItem.price = money(d.SupplierItem.price)
          })
        }
        count++
        if(count == rows.length){
          res.render('suppliers',{data:rows,err_msg:false,title:'SUPPLIERS LIST'})
        }
      })
    }else{
      res.render('suppliers',{data:rows,err_msg:false,title:'SUPPLIERS LIST'})
    }
  })
  .catch(err=>{
    throw err.toString()
  })
})
// ----------------------------ADD-------------------------------

router.get('/add',(req,res)=>{
  // res.send('hacktiv8')
  res.render('suppliersAdd',{err_msg:false,title:'Add Suppliers'})
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
    res.render('suppliersEdit',{data:datanya,err_msg:false,title:'EDIT SUPPLIERS'})
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
  model.Suppliers.findAll({include:{model:model.Item},where:{id:req.params.id}}).then(rows=>{
    model.Item.findAll().then(rowsItem=>{
      // for (var i = 0; i < rows[0].Items.length; i++) {
      //   for (var j = 0; j < rowsItem.length; j++) {
      //     if(rows[0].Items[i].name === rowsItem[j].name){
      //       rowsItem.splice(j,1)
      //       // rowsItem.haha = 1
      //     }
      //   }
      // }
      let count = 0
      let alreadyList= [];
      if(rows[0].Items.length>0){
        rows[0].Items.forEach(z=>{

          count ++
            z.SupplierItem.price = money(z.SupplierItem.price)
            let count1 = 0
            rowsItem.forEach(d=>{
              count1++
              if(z.name === d.name){
                alreadyList.push([z.name, z.SupplierItem.price])
                index = count1-1
                if(count1<rowsItem.length){
                  rowsItem.splice(index,1)}
              }
              if(count == rows[0].Items.length && count1 == rowsItem.length){
            //  res.send(rowsItem)
                res.render('supplierAddItem',{data:rows,dataItem:rowsItem,dataList:alreadyList,err_msg:false,title:"Add Item to Supplier"})
              }
            })
        })
      }else{
        res.render('supplierAddItem',{data:rows,dataItem:rowsItem,dataList:alreadyList,err_msg:false,title:"Add Item to Supplier"})
      }
    })
  })
})

router.post('/:id/additem',(req,res)=>{
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
                                    SupplierId:req.params.id,
                                    ItemId:req.body.ItemId,
                                    price:req.body.price
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
    .catch(err=>{
      model.Suppliers.findAll({include:{model:model.Item},where:{id:req.params.id}}).then(rows=>{
        model.Item.findAll().then(rowsItem=>{
          let count = 0
          let alreadyList= [];
          if(rows[0].Items.length>0){
            rows[0].Items.forEach(z=>{
              count ++
                z.SupplierItem.price = money(z.SupplierItem.price)
                let count1 = 0
                rowsItem.forEach(d=>{
                  count1++
                  if(z.name === d.name){
                    alreadyList.push([z.name, z.SupplierItem.price])
                    index = count1-1
                    if(count1<rowsItem.length){
                      rowsItem.splice(index,1)}
                  }
                  if(count == rows[0].Items.length && count1 == rowsItem.length){
                //  res.send(rowsItem)
                    res.render('supplierAddItem',{data:rows,dataItem:rowsItem,dataList:alreadyList,err_msg:"Please add price !",title:"Add Item to Supplier"})
                  }
                })
            })
          }else{
            res.render('supplierAddItem',{data:rows,dataItem:rowsItem,dataList:alreadyList,err_msg:"Please add price !",title:"Add Item to Supplier"})
          }
        })
      })
    })
  })

// //-------------------------DELETE----------------------------------

router.get('/delete/:id',(req,res)=>{
  model.Suppliers.destroy({where:{id:req.params.id}}).then(()=>{
    model.SupplierItem.destroy({where:{id:req.params.id}}).then(()=>{
      res.redirect('/suppliers')
    })
  })
})


module.exports = router
