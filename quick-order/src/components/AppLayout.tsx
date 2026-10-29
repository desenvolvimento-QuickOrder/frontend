import { Outlet } from "react-router";

import { LeftMenu } from "./LeftMenu";

export function AppLayout() {
    return (
        <div className="bg-background-gray min-h-screen flex">
            <LeftMenu />

            <main className="flex-1 md:ml-90 pt-15 px-12.5">
                <Outlet />
            </main>
        </div>
    );
}