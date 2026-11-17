import { useState, type SubmitEvent } from "react";
import { Asterisk, Xmark } from "iconoir-react";

import { Label } from "../Label";
import { Input } from "../Input";
import { SelectButton } from "../SelectButton";
import { Button } from "../Button";

interface CreateTableModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (tableName: string, capacity: number) => void;
}

export function CreateTableModal({
    isOpen,
    onClose,
    onCreate,
}: CreateTableModalProps) {
    const [tableName, setTableName] = useState("");
    const [capacity, setCapacity] = useState("");

    if (!isOpen) return null;

    function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!tableName.trim() || !capacity) return;

        onCreate(tableName.trim(), Number(capacity));
        
        setTableName("");
        setCapacity("");
        onClose();
    }

    function handleClose() {
        setTableName("");
        setCapacity("");
        onClose();
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <form
                onSubmit={handleSubmit}
                className="w-133.75 p-5 rounded-2xl bg-white shadow-xl"
            >
                <div className="flex justify-between items-center mb-7.5">
                    <h1 className="text-2xl font-bold">Cadastrar Mesa</h1>
                    <button
                        type="button"
                        onClick={handleClose}
                        className="cursor-pointer"
                    >
                        <Xmark />
                    </button>
                </div>

                <div className="flex flex-col gap-7.5">
                    <div>
                        <Label htmlFor="nomeMesa">
                            Nome da mesa
                            <Asterisk className="w-2.5 h-2.5 mt-0.5 text-red" />
                        </Label>

                        <Input
                            name="nomeMesa"
                            id="nomeMesa"
                            minLength={1}
                            placeholder="Ex: Mesa 1, Mesa 2..."
                            className="w-full"
                            value={tableName}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setTableName(e.target.value)
                            }
                            required
                        />
                    </div>

                    <div>
                        <Label htmlFor="nLugares">
                            Número de lugares
                            <Asterisk className="w-2.5 h-2.5 mt-0.5 text-red" />
                        </Label>

                        <SelectButton
                            name="nLugares"
                            id="nLugares"
                            value={capacity}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                                setCapacity(e.target.value)
                            }
                            required
                        >
                            <option value="" disabled hidden>
                                Selecione o número de lugares
                            </option>
                            <option value="2">2</option>
                            <option value="4">4</option>
                            <option value="6">6</option>
                            <option value="8">8</option>
                        </SelectButton>
                    </div>

                    <Button type="submit" className="w-full">
                        Adicionar Mesa
                    </Button>
                </div>
            </form>
        </div>
    );
}