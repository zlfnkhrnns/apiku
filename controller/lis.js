const model = require('../config/model/index');
const controller = {};
const { Op } = require('sequelize');
const db = require('../config/database/mysql');
const path = require('path');

controller.getAll = async function(req, res){
    try{
        let lis = await model.lis.findAll()
            if(lis.length > 0){
                res.status(200).json({
                    message:'Get lis',
                    semuaSejarah: lis
                })
            } else{
                res.status(200).json({
                    message:"Tidak Ada lis",
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
        let lis = await model.lis.findAll({
            attributes: [['indeksId','indeksId'], ['kategoriId','kategoriId'], ['namaNarator','namaNarator'],
            ['namaInterview','namaInterview'], ['judulSejarah','judulSejarah'], ['tempatInterview','tempatInterview'],
            ['tanggalInterview','tanggalInterview'],['rekaman','rekaman'] ['volume','volume'], ['copyright','copyright'],['foto','foto'], ['download','download'], ['indeks','indeks']],
            where: {
                [Op.or]:[{
                    indeksId :{
                        [Op.like]: '%' +search+ '%'
                    }
                },{
                    judulSejarah :{
                        [Op.like]: '%' +search+ '%'
                    }
                }]
            }
        })
        if (lis.length > 0){
            res.status(200).json({
                message:'Get lis',
                semuaSejarah: lis
            })
        } else {
            res.status(200).json({
                message:"Tidak Ada lis",
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
    console.log(req.files)
    try {
        let lis = await model.lis.create({
            kategoriId: req.body.kategoriId,
            indeksId: req.body.indeksId,
            namaNarator: req.body.namaNarator,
            namaInterview: req.body.namaInterview,
            judulSejarah: req.body.judulSejarah,
            tempatInterview: req.body.tempatInterview,
            tanggalInterview: req.body.tanggalInterview,
            rekaman: req.files.rekaman[0].filename,
            volume: req.body.volume,
            copyright: req.body.copyright,
            foto: req.files.foto[0].filename,
            download: req.body.download,
            indeks: req.body.indeks,        
        })
        res.status(201).json({
            message: 'Berhasil Tambah Data lis',
            semuaSejarah: lis
        })
    } catch (error){
        res.status(404).json({
            message: error.message
        })
    }
}

controller.put = async function(req, res){
    try{
        let lis = await model.lis.update({
            kategoriId: req.body.kategoriId,
            indeksId: req.body.indeksId,
            namaNarator: req.body.namaNarator,
            namaInterview: req.body.namaInterview,
            judulSejarah: req.body.judulSejarah,
            tempatInterview: req.body.tempatInterview,
            tanggalInterview: req.body.tanggalInterview,
            rekaman: req.files.rekaman[0].filename,
            volume: req.body.volume,
            copyright: req.body.copyright,
            foto: req.files.foto[0].filename,
            download: req.body.download,
            indeks: req.body.indeks,
        },{
            where:{
                indeksId: req.params.indeksId
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
        let lis = await model.lis.destroy({
            where:{
                indeksId: req.params.indeksId
            }
        })
        res.status(200).json({
            message: 'Berhasil Hapus Data lis'
        })
    } catch (error){
        res.status(404).json({
            message: error.message
        })
    }
}

module.exports = controller;