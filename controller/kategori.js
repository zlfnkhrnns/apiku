const model = require('../config/model/index');
const controller = {};
const { Op } = require('sequelize');
const db = require('../config/database/mysql');
const path = require('path');

controller.getAll = async function(req,res){
    try{
        let kategori = await model.kategori.findAll()
            if(kategori.length > 0){
                res.status(200).json({
                    message:'Get Kategori',
                    data: kategori
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
                data: kategori
            })
        } else {
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
        let kategori = await model.kategori.create({
            idKategori: req.body.idKategori,
            nama: req.body.nama,
            gambar: req.file.path
        })
        res.status(201).json({
            message: 'Berhasil Tambah Data Kategori',
            data: kategori
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
                nama: req.params.nama
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
        let kategori = await model.kategori.destroy({
            where:{
                nama: req.params.nama
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