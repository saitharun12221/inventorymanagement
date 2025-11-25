import {useState} from "react";
import { searchInventory,getProductsortedbyprice,searchbyStatus } from "./api";
function BackendTable({loaddata,onEdit,onDelete,inventory,setinventory}){
    const [search,setsearch]=useState("");
    const [sort,setsort]=useState("");
    const [searchBystatus,setsearchBystatus]=useState("");
    const handleSearch=async()=>{
        if (search.trim()===""){
            loaddata();
        }
        else{
            const res = await searchInventory(search);
            setinventory(res.data);
        }
    }
    const handlesort=async(e)=>{
        const sortValue=e.target.value;
        setsort(sortValue);
        if (sortValue===""){
            loaddata()
        }
        else{
            const res = await getProductsortedbyprice(sortValue);
            setinventory(res.data)
        }
    }
    const handlesearchbyStatus=async(e)=>{
        const searchstatus=e.target.value;
        setsearchBystatus(searchstatus);
        if (searchstatus===""){
            loaddata();
        }
        else{
            const res = await searchbyStatus(searchstatus);
            setinventory(res.data);
        }
    }
    return(
        <>
        <div>
            <input type="text" placeholder="search" value={search} onChange={(e)=>setsearch(e.target.value)} />
            <button onClick={handleSearch}>Search</button>
            <select value={sort} onChange={handlesort}>
                <option value="">SortBy</option>
                <option value="ASC">Price:Low to High</option>
                <option value="DESC">Price: High to Low</option>
            </select>
            <select value={searchBystatus} onChange={handlesearchbyStatus}>
                <option value="">All items</option>
                <option value="Available">Available</option>
                <option value="NotAvailable">NotAvailable</option>
            </select>
        </div>
        <table border="1" className="table table-bordered">
            <thead className="table-light">
                <tr>
                    <th>id</th>
                    <th>ProductName</th>
                    <th>SerialNo</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Category</th>
                    <th>SubCategory</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {inventory&&inventory.map((item)=>(
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.product}</td>
                        <td>{item.serialNo}</td>
                        <td>${item.price}</td>
                        <td>{item.stock}</td>
                        <td>{item.category}</td>
                        <td>{item.subCategory}</td>
                        <td>{item.status}</td>
                        <td>
                            <button className="btn btn-sm btn-primary" onClick={()=>onEdit(item)}>Edit</button>
                            <button className="btn btn-sm btn-danger" onClick={()=>onDelete(item.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </>
    )
}
export default BackendTable;