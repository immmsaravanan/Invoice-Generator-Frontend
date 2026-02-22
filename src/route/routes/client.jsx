import Clients from "../../pages/Clients";
import ClientAdd from "../../components/client/ClientAdd";
import ClientAddAdress from "../../components/client/ClientAddAdress";
import ClientAddressCard from "../../components/client/ClientAddressCard";
import ClientAddressEdit from "../../components/client/ClientAddressEdit";
import ClientEdit from "../../components/client/ClientEdit";

export const Client = [
    {
        path:'/clients',
        element: <Clients />
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
    },
]