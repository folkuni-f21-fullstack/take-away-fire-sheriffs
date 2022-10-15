import AdminOrderItem from "../../components/AdminOrderItem";
import './AdminHome.scss';
import Header from '../../components/Header'
function AdminHome() {
    return (
        <div className="admin-view">
            <Header />
            <h1 className="admin-view-title">Orders</h1>
            <section className="admin-view-orders">
                
               <AdminOrderItem /> 
            </section>
            
        </div>
    )
}

export default AdminHome;