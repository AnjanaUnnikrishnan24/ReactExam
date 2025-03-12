import React ,{useState,useEffect} from 'react'


const ViewItems = () => {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch('/api/displayAllItems');  
                if (!response.ok) {
                    throw new Error('Failed to fetch items');
                }
                const data = await response.json();
                setItems(data);
            } catch (error) {
                setError(error.message);
            } 
        };

        fetchItems();
    }, []);

  return (
    <>
    <div className="flex flex-col items-center justify-center bg-white p-4">
    <h1 className='font-bold text-2xl text-center'>Items in the inventory</h1>
    {error && <p className="text-red-500">{error}</p>}
        <div className='mt-12'>
            <table className='w-[1500px] border-collapse border border-gray-300'>
                <thead>
                    <tr>
                        <th className='text-center border p-1'>Item name</th>
                        <th className='text-center border p-1'>Category</th>
                        <th className='text-center border p-1'>Quantity</th>
                        <th className='text-center border p-1'>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item._id} className="hover:bg-gray-100">
                            <td className='text-center p-2 border'>{item.itemName}</td>
                            <td className='text-center p-2 border'>{item.category}</td>
                            <td className='text-center p-2 border'>{item.quantity}</td>
                            <td className='text-center p-2 border'>{item.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>  
               
        </div>
    </div>
    </>
  )
}

export default ViewItems
