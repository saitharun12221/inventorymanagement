import react,{useEffect,useState} from "react";
import {getList,createInventory,updateInventory,deleteInventory} from "./api";
import {useForm} from "react-hook-form";
import BackendTable from "./BackendTable";
import Pagination from "./pagination";

function Formdata({itemsPerPageDefault=5}){
    const [inventory,setinventory]=useState([]);
    const {register,handleSubmit,formState:{errors},setValue,reset}=useForm();
    const [editingId,seteditingId]=useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentItems, setCurrentItems] = useState([]);
    const [itemsPerPage,setitemsPerPage]=useState(itemsPerPageDefault);

    const totalPages=Math.ceil(inventory.length/itemsPerPage);

    const loaddata=async()=>{
       const res= await getList();
        setinventory(res.data);
    }

    useEffect(()=>{loaddata();},[]);
    
    useEffect(()=>{
         const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setCurrentItems(inventory.slice(startIndex, endIndex));
    },[currentPage,inventory,itemsPerPage])

    const handlePageChange=(page)=>{
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const onSubmit=async(data)=>{
        try{
            if (editingId){
                await updateInventory(editingId,data);
                alert("Product updated successfully");
                seteditingId(null);
            }
            else{
                await createInventory(data);
                alert("Product added successfully");
            }
        }
        catch(error){
            console.error("Error submitting in form");
            alert("Error adding product");
        }
        loaddata();
        reset();
    }
    const handleEdit=(item)=>{
        seteditingId(item.id)
        setValue("product",item.product);
        setValue("serialNo",item.serialNo);
        setValue("price",item.price);
        setValue("stock",item.stock);
        setValue("category",item.category);
        setValue("subCategory",item.subCategory);
        setValue("status",item.status);
    }
    const handleDelete=async(id)=>{
        if (window.confirm("Are you sure?")){
            await deleteInventory(id);
            alert("Product Deleted successfully");
            loaddata();
        }
        
    }
    return (
        <div className="container">
            <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
                <div className="row g-4">
                <div className="col-md-3">
                    <label>ProductName</label>
                    <input type="text" placeholder="product" {...register("product",{
                        required:"ProductName is invalid",
                        minLength:{value:3,message:"name should be atleast 3 characters"}
                    })}/>
                    {errors.product&&<p style={{color:"red"}}>{errors.product.message}</p>}
                </div>
                <div className="col-md-3">
                    <label>SerialNo</label>
                    <input type="text" placeholder="serialNo" {...register("serialNo",{
                        required:"SerialNo is invalid",
                        minLength:{value:2,message:"SerialNo should be atleast 2 characters"}
                    })}/>
                    {errors.serialNo&&<p style={{color:"red"}}>{errors.serialNo.message}</p>}
                </div>
                <div className="col-md-3">
                    <label>Price</label>
                    <input type="text" placeholder="price" {...register("price",{
                        required:"price is invalid",
                        min:{value:1,message:"price should be in positive numbers"}
                    })}/>
                    {errors.price&&<p style={{color:"red"}}>{errors.price.message}</p>}
                </div>
                <div className="col-md-3">
                    <label>Stock</label>
                    <input type="text" placeholder="stock" {...register("stock",{
                        required:"Stock is invalid",
                        min:{value:0,message:"stock should be in positive numbers"}
                    })}/>
                    {errors.stock&&<p style={{color:"red"}}>{errors.stock.message}</p>}
                </div>
                <div className="col-md-3">
                    <label>Category</label>
                    <input type="text" placeholder="category" {...register("category",{
                        required:"Category is invalid",
                        minLength:{value:3,message:"Category should be atleast 3 characters"}
                    })}/>
                    {errors.category&&<p style={{color:"red"}}>{errors.category.message}</p>}
                </div>
                <div className="col-md-3">
                    <label>SubCategory</label>
                    <input type="text" placeholder="SubCategory" {...register("subCategory",{
                        required:"subCategory is invalid",
                        minLength:{value:3,message:"Category should be atleast 3 characters"}
                    })}/>
                    {errors.category&&<p style={{color:"red"}}>{errors.category.message}</p>}
                </div>
                <div className="col-md-3">
                    <label>Status</label>
                    <input type="text" placeholder="status" {...register("status",{
                        required:"Status is invalid",
                        minLength:{value:9,message:"status should be either Available or Not Available"}
                    })}/>
                    {errors.status&&<p style={{color:"red"}}>{errors.status.message}</p>}
                </div>
            </div>
            <button type="submit" className="btn btn-success mt-3">{editingId?"Update Product":"Add Product"}</button>
            </form>
    
<BackendTable inventory={currentItems} onEdit={handleEdit} onDelete={handleDelete} loaddata={loaddata} setinventory={setinventory}/>
<div className="table-header">
        <h3>Products ({inventory.length} total)</h3>
        <div className="pagination-summary">
          Showing {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, inventory.length)} of {inventory.length} products
        </div>
        </div>
<Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>
<div className="page-size-selector">
    <label>Show:</label>
    <select value={itemsPerPage} onChange={(e)=>{setCurrentPage(1);
        setitemsPerPage(Number(e.target.value))
    }}>
        <option value="5">5</option>
        <option value="10">10</option>
    </select>
    <span>per page</span>
</div>
</div>
      
    )
}
export default Formdata;