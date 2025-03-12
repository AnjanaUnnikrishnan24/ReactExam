import { Router } from 'express';
import { Product } from '../Models/Product.js';

const Routes = Router();

Routes.post('/addItems',async(req,res)=>{
    try {
        const {itemName, category, quantity, price} = req.body;
        console.log(itemName)
        const existingItem = await Product.findOne({itemName:itemName});
        if(existingItem){
            res.status(401).json({Message:"Item already exist in the Inventory"});
        }
        else{
            const newItem = Product ({
                itemName:itemName,
                category:category,
                quantity: quantity,
                price: price
            });
            await newItem.save();
            console.log("Item added sucessfully")
            res.status(200).json({Message:"Item added successfully"});
        }
    } catch {
        res.status(500).json({Message:"Internal server error"});
    }
});


Routes.get('/displayAllItems', async (req,res)=>{
    try {
        const allProducts = await Product.find();
        console.log(allProducts);
        res.json(allProducts);
    } catch  {
        res.status(500).json({message:"Internal Server Error"});
    }
});

Routes.get('/filterItems',async(req,res)=>{
    try {
        const { Category }= req.body;
        const result = await Product.find({category:Category});
        console.log(result);
        res.json(result);
    } catch {
        res.status(500).json({msg:"Internal server error"});
    }
})

export default Routes

