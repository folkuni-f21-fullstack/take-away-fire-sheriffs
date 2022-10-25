import AdminOrderItem from "../../components/AdminOrderItem";
import './AdminHome.scss';
import Header from '../../components/Header';
import { User } from '../../models/models';


interface Props {
    activeUser: User | null;
}

function AdminHome({activeUser}: Props) {
    console.log("AdminHome - activeUser: ", activeUser);

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