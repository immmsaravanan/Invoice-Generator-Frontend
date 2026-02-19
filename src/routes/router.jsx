import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../Login";
import Clients from "../pages/Clients";
import Reports from "../pages/Reports"
import Invoices from "../pages/Invoices";
import Payments from "../pages/Payments";
import Stocks from "../pages/Stocks";
import Dashboard from "../components/Dashboard";
import ClientAdd from "../components/client/ClientAdd";
import ClientAddAdress from "../components/client/ClientAddAdress";
import ClientAddressCard from "../components/client/ClientAddressCard";
import ClientAddressEdit from "../components/client/ClientAddressEdit";
import ClientEdit from "../components/client/ClientEdit";

export const router = createBrowserRouter([
    {
    path:"/",
    element:<Dashboard />,
    children:[
    
    {
        path:'/clients',
        element: <Clients />
    },
    {
        path:'/reports',
        element:<Reports />
    },
    {
        path:"/invoices",
        element:<Invoices />
    },
    {
        path:"/stock",
        element:<Stocks />
    },
    {
        path:"/payments",
        element:<Payments />
    },
    {
    path:"/client/add",
    element:<ClientAdd />
    },
    {
        path:"/client/view/address/:client_gstin",
        element:<ClientAddressCard />
    },
    {
    path:"/client/edit/address/:client_gstin/:index",
    element: <ClientAddressEdit />
    },
    {
        path:"/client/edit/:client_gstin",
        element: <ClientEdit />
    },
    {
        path:"/client/add/address/:client_gstin",
        element: <ClientAddAdress />
    }
]
},
    {
        path:'/home',
        element:<Home />
    },
    {
        path:'/login',
        element: <Login />
    },
]
)