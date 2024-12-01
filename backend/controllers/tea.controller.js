import teaModel from '../models/teaModel.js';
import fs from 'fs';

//add tea
export async function addTea  (req, res){
    let image_filename = `${req.file.filename}`;

    const newTea = new teaModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename,
        expiryDate: req.body.expiryDate,
        countInStock: req.body.countInStock

    });
    try {
        await newTea.save();
        res.json({
            success: true,
            message: "Tea is added successfully"
        })

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error! Failed"
        })
    }
    
};

export async function listTeas (req, res){
 try {
    const allTea = await teaModel.find({});
    res.json({
        success: true,
        data: allTea
    })
 } catch (error) {
    console.log(error);
    res.json({
        success: false,
        message: "Error! Failed"
    })
 }
};

export async function deleteTea (req, res){
    try {
        const tea = await teaModel.findById(req.body.id);
        fs.unlink(`uploads/${tea.image}`,()=> {})
        await teaModel.findByIdAndDelete(req.body.id);
        res.json({
            success: true,
            message: "Tea is deleted successfully"
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error"
        })
    }
}