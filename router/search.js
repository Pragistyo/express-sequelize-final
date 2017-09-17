const express = require('express');
const router  = express.Router()
const model = require('../models');


router.get('/',(req,res)=>{
  if(!req.query.name && !req.query.min && !req.query.max){
      res.render('search',{data:false,dataConjunction:false,err_msg:false,title:'SEARCH PAGE'})
    }
  if(req.query.name){
    if(req.query.min){
      if(req.query.max){
        model.SupplierItem.findAll({include:[
          {
            model:model.Item,where:
            {name:{$ilike:`%${req.query.name}%`}}
          }
          ,model.Suppliers],
          where:{
            price:{$between:[req.query.min,req.query.max]}
          }
          }).then(result=>{
          // res.send(result)
          res.render('search',{data:result,dataConjunction:false,err_msg:false,title:'SEARCH PAGE'})
        })
      }
      else if(!req.query.max){
        // res.send('huahuahuaha')
        model.SupplierItem.findAll({include:[
          {
            model:model.Item,where:
            {name:{$ilike:`%${req.query.name}%`}}
          }
          ,model.Suppliers],
          where:{
            price:{$gte:req.query.min}
          }
          }).then(result=>{
          // res.send(result)
          res.render('search',{data:result,dataConjunction:false,err_msg:false,title:'SEARCH PAGE'})
        })
      }
    }
    else if(req.query.max){
      // res.send('huahahahah')
      model.SupplierItem.findAll({include:[
        {
          model:model.Item,where:
          {name:{$ilike:`%${req.query.name}%`}}
        }
        ,model.Suppliers],
        where:{
          price:{$lte:req.query.max}
        }
        }).then(result=>{
        // res.send(result)
        res.render('search',{data:result,dataConjunction:false,err_msg:false,title:'SEARCH PAGE'})
      })
    }
    model.SupplierItem.findAll({include:[
      {
        model:model.Item,where:
        {name:{$ilike:`%${req.query.name}%`}}
      }
      ,model.Suppliers]
      }).then(result=>{
        res.render('search',{data:result,dataConjunction:false,err_msg:false,title:'SEARCH PAGE'})
    })
  }
  if(!req.query.name){
    if(req.query.min){
      if(req.query.max){
        model.SupplierItem.findAll({include:{all:true},where:{
          price:{$between:[req.query.min,req.query.max]}
        }})
        .then(result=>{
          res.render('search',{data:result,dataConjunction:false,err_msg:false,title:'SEARCH PAGE'})
        })
      }
      else if(!req.query.max){
        model.SupplierItem.findAll({include:{all:true},where:{
          price:{$gte:req.query.min}
        }})
        .then(result=>{
          res.render('search',{data:result,dataConjunction:false,err_msg:false,title:'SEARCH PAGE'})
        })
      }
    }
    else if(req.query.max){
      // res.send('huahahha')
      model.SupplierItem.findAll({include:{all:true},where:{
        price:{$lte:req.query.max}
      }})
      .then(result=>{
        res.render('search',{data:result,dataConjunction:false,err_msg:false,title:'SEARCH PAGE'})
      })
    }
  }
})

module.exports =router
