import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "../contexts/AuthContext";
import { AppRoutes } from "./AppRoutes";

export function Router() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <AppRoutes />
            </AuthProvider>
        </BrowserRouter>
    )
}