const model = require('../config/model/index');
const controller = {};
const { Op } = require('sequelize');
const db = require('../config/database/mysql');

controller.getAll = async function(req,res){
    try{
        let indeks = await model.indeks.findAll()
            if(indeks.length > 0){
                res.status(200).json({
                    message:'Get indeks',
                    semuaIndeks: indeks
                })
            } else{
                res.status(200).json({
                    message:"Tidak Ada indeks",
                    data:[]
                })
            }
    } catch (error){
            res.status(404).json({
                message: error.message
            })
    }
}

controller.getSearch = async function(req, res){
    const search = req.query.keyword
    try{
        let indeks = await model.indeks.findAll({
            attributes: [['no','no'],['idIndeks','idIndeks'], ['topik','topik'],['menit','menit']],
            where: {
                [Op.or]:[{
                    idIndeks :{
                        [Op.like]: '%' +search+ '%'
                    }
                },{
                    topik :{
                        [Op.like]: '%' +search+ '%'
                    }
                }]
            }
        })
        if (indeks.length > 0){
            res.status(200).json({
                message:'Get indeks',
                semuaIndeks: indeks
            })
        } else {
            res.status(200).json({
                message:"Tidak Ada indeks",
                data:[]
            })
        }
    } catch (error){
        res.status(404).json({
            message: error.message
        })
    }
}

controller.post = async function(req, res){
    try {
        let indeks = await model.indeks.create({
            no: req.body.no,
            idIndeks: req.body.idIndeks,
            topik: req.body.topik,
            menit: req.body.menit
        })
        res.status(201).json({
            message: 'Berhasil Tambah Data indeks',
            semuaIndeks: indeks
        })
    } catch (error){
        res.status(404).json({
            message: error.message
        })
    }
}

controller.put = async function(req, res){
    try{
        let indeks = await model.indeks.update({
            no: req.body.no,
            idIndeks: req.body.idIndeks,
            topik: req.body.topik,
            menit: req.body.menit
        },{
            where:{
                no: req.params.no
            }
        })
        res.status(200).json({
            message: 'Berhasil Ubah Data Mahasiswa'
        })
    } catch (error){
        res.status(404).json({
        message: error.message
        })
    }
}

controller.delete = async function(req, res){
    try{
        let indeks = await model.indeks.destroy({
            where:{
                no: req.params.no
            }
        })
        res.status(200).json({
            message: 'Berhasil Hapus Data indeks'
        })
    } catch (error){
        res.status(404).json({
            message: error.message
        })
    }
}

module.exports = controller;