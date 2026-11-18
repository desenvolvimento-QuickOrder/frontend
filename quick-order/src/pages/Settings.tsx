import { useNavigate } from "react-router-dom";
import { User } from "iconoir-react";

export function Settings() {
    const navigate = useNavigate();

    return (
        <section className="text-blue-500">
            <h1 className="text-3xl font-semibold">Configurações</h1>
            <button
                type="button"
                onClick={() => navigate("/configuracoes/gerenciar-usuarios")}
                className="mt-8 flex w-full max-w-sm items-center gap-4 rounded-xl bg-white p-6 text-left shadow-md transition hover:shadow-lg"
            >
                <User className="h-7 w-7 text-orange-500" />
                <span className="text-xl font-medium">Gerenciar Usuários</span>
            </button>
        </section>
    );
}