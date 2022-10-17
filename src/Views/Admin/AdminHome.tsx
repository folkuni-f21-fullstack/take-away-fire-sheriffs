import AdminOrderItem from "../../components/AdminOrderItem";
import './AdminHome.scss';
import Header from '../../components/Header'
function AdminHome() {
    return (
        <div className="admin-view">
            <Header />
            
            <section className="content-wrapper">
               <h1 className="admin-view-title">Orders</h1> 
               <AdminOrderItem /> 
            </section>
            
        </div>
    )
}

export default AdminHome;