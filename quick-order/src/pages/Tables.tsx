import { useState } from "react";
import { Plus } from "iconoir-react";

import { Button } from "../components/Button";
import { TableCard, type TableStatus } from "../components/TableCard";
import { ChangeTableStatusModal } from "../components/modals/ChangeTableStatusModal";

interface TableData {
    id: number;
    tableNumber: number;
    capacity: number;
    status: TableStatus;
    orderNumber?: number;
    timeElapsed?: string;
}

export function Tables() {
    const [tables, setTables] = useState<TableData[]>([
        {
            id: 1,
            tableNumber: 1,
            capacity: 2,
            status: "livre",
            timeElapsed: "30min",
        },
    ]);

    const [pendingChange, setPendingChange] = useState<{
        tableId: number;
        newStatus: TableStatus;
    } | null>(null);

    function handleRequestStatusChange(table: TableData, newStatus: TableStatus) {
        if (table.status === "livre" && newStatus !== "livre") {
            setPendingChange({ tableId: table.id, newStatus });
            return;
        }

        setTables((prevTables) =>
            prevTables.map((t) =>
                t.id === table.id
                    ? {
                          ...t,
                          status: newStatus,
                          orderNumber: newStatus === "livre" ? undefined : t.orderNumber,
                      }
                    : t
            )
        );
    }

    function handleConfirmModal(orderNumber: number) {
        if (!pendingChange) return;

        setTables((prevTables) =>
            prevTables.map((t) =>
                t.id === pendingChange.tableId
                    ? {
                          ...t,
                          status: pendingChange.newStatus,
                          orderNumber: orderNumber,
                      }
                    : t
            )
        );

        setPendingChange(null);
    }
    
    return (
        <main>
            <header className="flex justify-between items-center">
                <h1 className="text-4xl">Controle de Mesas</h1>
                <Button variant="icon">
                    <Plus />
                    Cadastrar Mesa
                </Button>
            </header>

            <section className="bg-white p-5 mt-7.5 rounded-[10px] shadow-md">
                <h3 className="text-xl">Legenda:</h3>

                <div className="flex items-center gap-7.5">
                    <div className="flex items-center gap-2.5 mt-5">
                        <div className="w-5.5 h-5.5 bg-green rounded-[5px]"></div>
                        <p className="text-lg">Livre</p>
                    </div>

                    <div className="flex items-center gap-2.5 mt-5">
                        <div className="w-5.5 h-5.5 bg-red rounded-[5px]"></div>
                        <p className="text-lg">Ocupada</p>
                    </div>

                    <div className="flex items-center gap-2.5 mt-5">
                        <div className="w-5.5 h-5.5 bg-yellow rounded-[5px]"></div>
                        <p className="text-lg">Aguardando Pedido</p>
                    </div>

                    <div className="flex items-center gap-2.5 mt-5">
                        <div className="w-5.5 h-5.5 bg-light-blue rounded-[5px]"></div>
                        <p className="text-lg">Aguardando Conta</p>
                    </div>
                </div>
            </section>

            <section className="mt-12.5">
                <h3 className="text-xl">Mesas para 2 pessoas</h3>

                <div className="flex items-center gap-5 mt-5">
                    {tables.map((table) => (
                        <TableCard
                            key={table.id}
                            tableNumber={table.tableNumber}
                            capacity={table.capacity}
                            status={table.status}
                            orderNumber={table.orderNumber}
                            timeElapsed={table.timeElapsed}
                            onStatusChange={(newStatus) =>
                                handleRequestStatusChange(table, newStatus)
                            }
                        />
                    ))}
                </div>
            </section>

            <ChangeTableStatusModal
                isOpen={pendingChange !== null}
                onClose={() => setPendingChange(null)}
                onConfirm={handleConfirmModal}
            />
        </main>
    );
}