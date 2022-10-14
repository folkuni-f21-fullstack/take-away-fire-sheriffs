import AdminOrderItem from "../../components/AdminOrderItem";
import './AdminHome.scss';
function AdminHome() {
    return (
        <div className="admin-view">
            <h1 className="admin-view-title">Orders</h1>
            <section className="admin-view-orders">
                
               <AdminOrderItem /> 
            </section>
            
        </div>
    )
}

export default AdminHome;