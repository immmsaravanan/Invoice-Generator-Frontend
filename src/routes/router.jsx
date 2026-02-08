import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../Login";
import Clients from "../pages/Clients";
import Reports from "../pages/Reports"
import Invoices from "../pages/Invoices";
import Payments from "../pages/Payments";
import Stocks from "../pages/Stocks";

export const router = createBrowserRouter([
    {
        path:'/home',
        element:<Home />
    },
        {
        path:'/',
        element:<Home />
    },
    {
        path:'/login',
        element: <Login />
    },
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
        path:"/stocks",
        element:<Stocks />
    },
    {
        path:"/payments",
        element:<Payments />
    }
]
)