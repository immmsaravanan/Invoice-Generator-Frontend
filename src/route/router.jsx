import { createBrowserRouter } from "react-router-dom";
import {DashboardRoute} from "./routes/dashboard"
import { HomeRoute } from "./routes/home";
import { LoginRoute } from "./routes/login";

export const router = createBrowserRouter([
    DashboardRoute,
    HomeRoute,
    LoginRoute

]
)