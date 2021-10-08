const model = require('../config/model/index');
const controller = {};
const { Op } = require('sequelize');
const db = require('../config/database/mysql');

controller.getAll = async function(req,res){
    try{
        let kategori = await model.kategori.findAll()
            if(kategori.length > 0){
                res.status(200).json({
                    message:'Get kategori',
                    semuaKategori: kategori
                })
            } else{
                res.status(200).json({
                    message:"Tidak Ada Kategori",
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
        let kategori = await model.kategori.findAll({
            attributes: [['idKategori','idKategori'], ['nama','nama'],['gambar',['gambar']]],
            where: {
                [Op.or]:[{
                    idKategori :{
                        [Op.like]: '%' +search+ '%'
                    }
                },{
                    nama :{
                        [Op.like]: '%' +search+ '%'
                    }
                }]
            }
        })
        if (kategori.length > 0){
            res.status(200).json({
                message:'Get Kategori',
                semuaKategori: kategori
            })
        } else{
            res.status(200).json({
                message:"Tidak Ada Kategori",
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
        console.log(req.body)
        let kategori = await model.kategori.create({
            idKategori: req.body.idKategori,
            nama: req.body.nama,
            gambar: req.files.gambar[0].filename
        })
        res.status(201).json({
            message: 'Berhasil Tambah Data kategori',
            semuaKategori: kategori
        })
    } catch (error){
        res.status(404).json({
            message: error.message
        })
    } 
}


controller.put = async function(req, res){
    try{
        let kategori = await model.kategori.update({
            idKategori: req.body.idKategori,
            nama: req.body.nama
        },{
            where:{
                idKategori: req.params.idKategori
            }
        })
        res.status(200).json({
            message: 'Berhasil Ubah Data Kategori'
        })
    } catch (error){
        res.status(404).json({
        message: error.message
        })
    }
}

controller.delete = async function(req, res){
    try{
        let kategori = await model.kategori.destroy({
            where:{
                idKategori: req.params.idKategori
            }
        })
        res.status(200).json({
            message: 'Berhasil Hapus Data Kategori'
        })
    } catch (error){
        res.status(404).json({
            message: error.message
        })
    }
}

module.exports = controller;