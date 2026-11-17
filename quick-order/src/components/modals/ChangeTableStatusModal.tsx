import { useState, type SubmitEvent } from "react";
import { Asterisk, Xmark } from "iconoir-react";

import { Label } from "../Label";
import { Input } from "../Input";
import { Button } from "../Button";

interface ChangeTableStatusModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (orderNumber: number) => void;
}

export function ChangeTableStatusModal({
    isOpen,
    onClose,
    onConfirm,
}: ChangeTableStatusModalProps) {
    const [orderInput, setOrderInput] = useState("");

    if (!isOpen) return null;

    function handleSubmit(e: SubmitEvent) {
        e.preventDefault();
        if (!orderInput.trim()) return;

        onConfirm(Number(orderInput));
        setOrderInput("");
    }

    function handleClose() {
        setOrderInput("");
        onClose();
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <form 
                onSubmit={handleSubmit}
                className="w-133.75 p-5 rounded-2xl bg-white shadow-xl"
            >
                <div className="flex justify-between items-center mb-7.5">
                    <h1 className="text-2xl font-bold">Mudar Status</h1>
                    <button
                        type="button"
                        onClick={handleClose}
                        className="cursor-pointer"
                    >
                        <Xmark />
                    </button>
                </div>

                <Label htmlFor="nComanda">
                    Número da comanda
                    <Asterisk className="w-2.5 h-2.5 mt-0.5 text-red" />
                </Label>
                <Input 
                    name="nComanda" 
                    id="nComanda" 
                    type="number" 
                    min="1"
                    placeholder="Digite o número da comanda" 
                    className="w-full mb-7.5" 
                    value={orderInput}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setOrderInput(e.target.value)
                    }
                    required
                />

                <Button className="w-full">
                    Mudar Status da Mesa
                </Button>
            </form>
        </div>
    )
}