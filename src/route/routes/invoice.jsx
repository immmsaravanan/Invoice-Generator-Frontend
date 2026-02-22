import Invoices from "../../pages/Invoices";
import AddFormat from '../../components/invoices/AddFormat'
export const Invoice =[    
    {
        path:"/invoices",
        element:<Invoices />
    },
    {
        path:"/invoice/format/add/",
        element:<AddFormat />
    }
]