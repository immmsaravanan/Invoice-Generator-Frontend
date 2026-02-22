import Dashboard from "../../components/Dashboard";
import { Client } from "./client";
import { Invoice } from "./invoice";
import { Payment } from "./payment";
import { Report } from "./report";
import { Stock } from "./stock";
export const DashboardRoute ={
    path:"/",
    element:<Dashboard />,
    children:[
        ...Client,
        ...Invoice,
        ...Report,
        ...Stock,
        ...Payment,
]
}