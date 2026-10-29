import { Routes, Route } from "react-router";

import { AppLayout } from "../components/AppLayout";

import { Dashboard } from "../pages/Dashboard";
import { Tabs } from "../pages/Tabs";
import { Menu } from "../pages/Menu";
import { Tables } from "../pages/Tables";
import { Payments } from "../pages/Payments";
import { Settings } from "../pages/Settings";
import { NotFound } from "../pages/NotFound";

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<AppLayout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/comandas" element={<Tabs />} />
                <Route path="/cardapio" element={<Menu />} />
                <Route path="/mesas" element={<Tables />} />
                <Route path="/pagamentos" element={<Payments />} />
                <Route path="/configuracoes" element={<Settings />} />
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}