import React from 'react'
import { Link  } from 'react-router-dom'
import { useState } from 'react';

const AddItems = () => {
    const [itemName, setItemName] = useState('');
    const [category, setCategory]   = useState('');
    const [quantity, setQuantity]   = useState('');
    const [price, setPrice]   = useState('');
    const [error, setError]         = useState('');

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const response = await fetch('/api/addItems',{
                method:'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({
                    itemName:itemName,
                    category:category,
                    quantity:quantity,
                    price:price,
                }),
            });

            if(!response.ok) {
                const errData = await response.json();
                throw new Error(errData.msg || 'Adding item Failed');
            }
            setItemName('');
            setCategory('');
            setQuantity('');
            setPrice('');
        } catch(err) {
            setError(err.message || 'Item adding failed.Please try again!')
        }
    };


  return (
    <div className="flex items-center justify-center bg-white">
      <div className="w-[500px] bg-grey-200 p-8 rounded">
      <h2 className="text-2xl font-bold mb-6 text-center">Add Items to Inventory</h2>
      {error && <p className='text-red-500 mb-4'>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label className="block text-black">Item Name</label>
          <input type="text" className="w-full p-2 border rounded mt-1" 
            value={itemName} onChange={(e) => setItemName(e.target.value)} required
          />
        </div>
        <div className="mb-2">
          <label className='text-black'>Category</label>
          <input type="text" className='w-full p-2 border roundedmt-1'
            value={category} onChange={(e)=>setCategory(e.target.value)} required
            />
        </div>
        <div className="mb-2">
          <label className='text-black'>Quantity</label>
          <input type="number" className='w-full p-2 border roundedmt-1'
            value={quantity} onChange={(e)=>setQuantity(e.target.value)} required
            />
        </div>
        <div className="mb-2">
          <label className='text-black'>Price</label>
          <input type="number" className='w-full p-2 border roundedmt-1'
            value={price} onChange={(e)=>setPrice(e.target.value)} required
            />
        </div>
        <button
          type="submit" className="w-full bg-blue-400 text-white p-2 text-2xl rounded hover:bg-blue-600">
          Add Item
        </button>
        <Link to="/view">
          <button className="w-full mt-3 bg-gray-500 text-white p-2 text-2xl rounded hover:bg-gray-600">
            View All Items
            </button>
        </Link>
      </form>
      
    </div>
  </div>
  )
}

export default AddItems