const mongoose = require('mongoose');

const express = require('express');
const fs = require('fs');
const localDataFile = require('../LocalData/Data');
const CategoryCollection = require('../models/Categories');  //DB collection


const getAllcat = async (req, res) => {
    //
    // categoeris_off = localDataFile.Category_offile;
    // localDataFile.categoeris_off.insert({ id: '7', subcat: 'Veggies' });
    categoeris_off = localDataFile.Category_offile;
    console.log(categoeris_off);
    // console.log('Hi');
    res.status(200).json({
        status: 'sucess',
        result_len: categoeris_off.length,
        data: {
            categoeris_off
        }
    }


    )
}

const addCat = async (req, res) => {
    console.log(req.params);
    //  console.log(res);
    localDataFile.Category_offile.push({ id: req.params.id, subcat: req.params.subcat });

    categoeris_off = localDataFile.Category_offile;
    CategoryCollection.create({ id: req.params.id, subcat: req.params.subcat });

    res.status(200).json({
        status: "sucess",
        data: {
            categoeris_off
        }
    })
}

const deleteCat = async (req, res) => {


    var index = localDataFile.Category_offile.indexOf({ id: req.params.id, subcat: req.params.subcat });
    index = localDataFile.Category_offile.findIndex(x => x.id == req.params.id);
    if (index > -1) {
        // const query = { _id: req.params.id };
        CategoryCollection.find({ "subcat": req.params.subcat })
            .then((ans) => {
                console.log("Item to be deleted is :");
                console.log(ans);
                const query = { id: ans.id };
                CategoryCollection.deleteOne(query);
            });
        console.log(index);
        categoeris_off = localDataFile.Category_offile;
        let support_data = [];
        console.log('del');
        categoeris_off.forEach((x, i) => {  //x->pair and i index 
            if (i != index) {
                console.log(x);
                support_data.push(x);
            }
            else {  //we don't need to insert this 

            }

        });

        categoeris_off = [];  //empty it 
        //console.log(support_data);
        support_data.forEach((x, i) => {
            categoeris_off.push(x);
        });



        res.status(200).json({
            status: 'Sucess! Updated list:',
            data: {
                categoeris_off
            }
        })


    }
    else {
        res.status(400).json({
            status: 'Failed req, No such data found'
        });
    }

}

const updateCat = async (req, res) => {
    //res.send('done');
    categoeris_off = localDataFile.Category_offile;
    var foundIndex = categoeris_off.findIndex(x => x.id == req.params.id);
    if (foundIndex > -1) {
        categoeris_off[foundIndex] = { id: req.params.id, subcat: req.params.newsubcat };

        //handling errors 
        console.log("Update index collection");
        console.log(foundIndex);

        //db update 
        var collection = CategoryCollection;
        collection.findOneAndUpdate({ id: req.params.id }, { $set: { subcat: req.params.newsubcat } }, { upsert: true });

        res.status(200).json({
            status: 'Updated List',
            data: {
                categoeris_off
            }
        })
    }
    else {
        //item doesn't exist
        console.log(foundIndex);
        res.status(404).json({
            status: "Item doesn;t exist",
            data: {
                categoeris_off
            }
        })
    }

}

const router = express.Router();
router
    .route('/all')    //return all category 
    .get(getAllcat);

router.route('/add/:id/:subcat')   //add a category
    .get(addCat)  //req directly by search  //all are get req to return user updated requests
//.post(addCat);

router.route('/delete/:id/:subcat')
    .get(deleteCat);

router.route('/update/:id/:subcat/:newsubcat')
    .get(updateCat);

module.exports = router    