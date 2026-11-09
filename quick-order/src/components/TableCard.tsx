import { Group, Clock } from 'iconoir-react';

import { SelectButton } from './SelectButton';

export type TableStatus = 'livre' | 'ocupada' | 'aguardando_pedido' | 'aguardando_conta';

interface TableCardProps {
    tableNumber: number;
    capacity: number;
    status: TableStatus;
    orderNumber?: number;
    timeElapsed?: string;
    onStatusChange: (newStatus: TableStatus) => void;
}

const statusConfig: Record<TableStatus, { label: string; dotColor: string }> = {
    livre: {
        label: 'Livre',
        dotColor: 'bg-green',
    },
    ocupada: {
        label: 'Ocupada',
        dotColor: 'bg-red',
    },
    aguardando_pedido: {
        label: 'Aguardando Pedido',
        dotColor: 'bg-yellow',
    },
    aguardando_conta: {
        label: 'Aguardando Conta',
        dotColor: 'bg-light-blue',
    },
};

export function TableCard({
    tableNumber = 1,
    capacity = 2,
    status = 'livre',
    orderNumber = 1,
    timeElapsed = '30min',
    onStatusChange,
}: TableCardProps) {
    return (
        <div className="bg-white w-45 p-5 rounded-[10px] shadow-md">
            <div className="flex items-center justify-between mb-3.75">
                <div className="flex items-center">
                    <div
                        className={`w-3 h-3 rounded-full mr-1.25 ${statusConfig[status].dotColor}`}
                    />
                    <p className="text-lg">Mesa {tableNumber}</p>
                </div>

                <div className="flex items-center">
                    <Group className="w-4.5 h-4.5 mr-1.25" />
                    <p className="text-lg">{capacity}</p>
                </div>
            </div>

            {status !== 'livre' && (
                <div className="text-gray-500 text-base">
                    <p>Comanda #{orderNumber}</p>

                    <div className="my-3.75 flex items-center gap-1.25">
                        <Clock className="w-4 h-4" />
                        <p>{timeElapsed}</p>
                    </div>
                </div>
            )}

            <SelectButton
                variant="small"
                value={status}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    onStatusChange(e.target.value as TableStatus)
                }
                className="w-full truncate pr-6!"
            >
                {Object.entries(statusConfig).map(([value, { label }]) => (
                    <option key={value} value={value}>
                        {label}
                    </option>
                ))}
            </SelectButton>
        </div>
    )
}