import react from "react";
const Pagination =({currentPage,totalPages,onPageChange,maxVisiblePages=5})=>{
    if (totalPages<=1){
        return null;
    }
    const getVisiblepages=()=>{
        const half = Math.floor(maxVisiblePages/2);
        let start = Math.max(1,currentPage-half);
        let end= Math.min(totalPages,start+maxVisiblePages-1);
        if (end-start+1<maxVisiblePages){
            start = Math.max(1,end-maxVisiblePages+1);
        }
        const pages=[];
        for (let i=start ; i<=end;i++){
            pages.push(i);
        }
        return pages;
    }
    const visiblepages = getVisiblepages();

return(
    <div className="pagination">
            <button className="pagination-btn first" onClick={()=>onPageChange(1)} disabled={currentPage===1}>««</button>
            <button className="pagination-btn previous" onClick={()=>onPageChange(currentPage-1)} disabled={currentPage===1}>«</button>
        {!visiblepages.includes(1)&&(
            <>
            <button className="pagination-btn-number" onClick={()=>onPageChange(1)}>1</button>
            {!visiblepages.includes(2)&&<span className="ellipsis">...</span>}
            </>
        )}
        {visiblepages.map(page=>(
            <button key={page} className={`pagination-btn number ${currentPage === page ? 'active' : ''}`} onClick={()=>onPageChange(page)}>{page}</button>
        ))}
        {!visiblepages.includes(totalPages)&&(
            <>
            {!visiblepages.includes(totalPages-1)&&<span className="ellipsis">...</span>}
            <button className="pagination-btn-number" onClick={()=>onPageChange(totalPages)}>{totalPages}</button>
            </>
        )}
        
        <button className="pagination-btn next" onClick={()=>onPageChange(currentPage+1)} disabled={currentPage === totalPages}>»</button>
        <button className="pagination-btn last" onClick={()=>onPageChange(totalPages)} disabled={currentPage === totalPages}>»»</button>
        
        <div className="page-info">
        Page {currentPage} of {totalPages}
      </div>
    </div>
)
}
export default Pagination;