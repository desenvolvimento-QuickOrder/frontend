import { useState } from "react";
import type { FormEvent, ReactNode } from "react";
import {
    ArrowLeft,
    Calendar,
    EditPencil,
    Mail,
    Plus,
    Trash,
    User as UserIcon,
    Xmark,
} from "iconoir-react";
import { useNavigate } from "react-router-dom";

export interface User {
    nome: string;
    email: string;
    ativo: boolean;
    dataCadastro: string;
}

type UserFilter = "todos" | "ativos" | "inativos";

const mockUsers: User[] = [
    { nome: "João Silva", email: "joao.silva@restaurante.com", ativo: true, dataCadastro: "2024-01-14" },
    { nome: "Maria Santos", email: "maria.santos@restaurante.com", ativo: true, dataCadastro: "2024-02-19" },
    { nome: "Carlos Oliveira", email: "carlos.oliveira@restaurante.com", ativo: true, dataCadastro: "2024-01-09" },
    { nome: "Ana Paula", email: "ana.paula@restaurante.com", ativo: true, dataCadastro: "2024-03-04" },
    { nome: "Pedro Costa", email: "pedro.costa@restaurante.com", ativo: false, dataCadastro: "2023-11-19" },
];

interface UserFiltersProps {
    selected: UserFilter;
    counts: { todos: number; ativos: number; inativos: number };
    onChange: (filter: UserFilter) => void;
}

function UserFilters({ selected, counts, onChange }: UserFiltersProps) {
    const filters: { id: UserFilter; label: string }[] = [
        { id: "todos", label: "Todos" },
        { id: "ativos", label: "Ativos" },
        { id: "inativos", label: "Inativos" },
    ];

    return (
        <div className="mb-4 flex flex-wrap gap-2.5">
            {filters.map(({ id, label }) => (
                <button
                    key={id}
                    type="button"
                    onClick={() => onChange(id)}
                    aria-pressed={selected === id}
                    className={`rounded-lg border border-orange-500 px-3 py-1.5 text-sm transition ${
                        selected === id
                            ? "bg-orange-500 text-white"
                            : "bg-transparent text-orange-500 hover:bg-orange-500/10"
                    }`}
                >
                    {label} ({counts[id]})
                </button>
            ))}
        </div>
    );
}

interface UserTableProps {
    users: User[];
    onEdit: (user: User) => void;
    onRemove: (user: User) => void;
}

function UserTable({ users, onEdit, onRemove }: UserTableProps) {
    return (
        <div className="overflow-x-auto rounded-2xl bg-white shadow-md">
            <table className="w-full min-w-[700px] border-collapse text-left text-sm">
                <thead className="bg-gray-100 text-blue-500">
                    <tr>
                        <th className="px-5 py-4 font-semibold">Status</th>
                        <th className="px-5 py-4 font-semibold">Nome</th>
                        <th className="px-5 py-4 font-semibold">E-mail</th>
                        <th className="px-5 py-4 font-semibold">Data de Cadastro</th>
                        <th className="px-5 py-4 text-center font-semibold">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => {
                        const inactiveClass = user.ativo ? "" : "text-gray-500";

                        return (
                            <tr key={user.email} className="border-b border-gray-100 last:border-b-0">
                                <td className="whitespace-nowrap px-5 py-4">
                                    <span className={`inline-flex items-center gap-1.5 ${user.ativo ? "text-green-500" : "text-red-500"}`}>
                                        <UserIcon className="h-4 w-4" />
                                        {user.ativo ? "Ativo" : "Inativo"}
                                    </span>
                                </td>
                                <td className={`whitespace-nowrap px-5 py-4 ${inactiveClass}`}>{user.nome}</td>
                                <td className={`whitespace-nowrap px-5 py-4 ${inactiveClass}`}>
                                    <span className="inline-flex items-center gap-2">
                                        <Mail className="h-4 w-4" />
                                        {user.email}
                                    </span>
                                </td>
                                <td className={`whitespace-nowrap px-5 py-4 ${inactiveClass}`}>
                                    <span className="inline-flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        {new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC" }).format(
                                            new Date(`${user.dataCadastro}T00:00:00Z`),
                                        )}
                                    </span>
                                </td>
                                <td className="px-5 py-4">
                                    <div className="flex items-center justify-center gap-3">
                                        <button
                                            type="button"
                                            aria-label={`Editar ${user.nome}`}
                                            onClick={() => onEdit(user)}
                                            className="text-blue-400 transition hover:opacity-70"
                                        >
                                            <EditPencil className="h-5 w-5" />
                                        </button>
                                        <button
                                            type="button"
                                            aria-label={`Remover ${user.nome}`}
                                            onClick={() => onRemove(user)}
                                            className="text-red-500 transition hover:opacity-70"
                                        >
                                            <Trash className="h-5 w-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                    {users.length === 0 && (
                        <tr>
                            <td colSpan={5} className="px-5 py-8 text-center text-gray-500">
                                Nenhum usuário encontrado.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

interface UserModalProps {
    mode: "create" | "edit";
    user?: User;
    onClose: () => void;
}

function UserModal({ mode, user, onClose }: UserModalProps) {
    const [name, setName] = useState(user?.nome ?? "");
    const [email, setEmail] = useState(user?.email ?? "");
    const [password, setPassword] = useState("");
    const [active, setActive] = useState(user?.ativo ?? true);
    const [attemptedSubmit, setAttemptedSubmit] = useState(false);

    const createMode = mode === "create";
    const invalidName = attemptedSubmit && !name.trim();
    const invalidEmail = attemptedSubmit && !email.trim();
    const invalidPassword = createMode && attemptedSubmit && !password.trim();

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setAttemptedSubmit(true);
        if (!name.trim() || !email.trim() || (createMode && !password.trim())) return;
        onClose();
    }

    return (
        <ModalShell onClose={onClose} title={createMode ? "Criar Usuário" : "Editar Usuário"}>
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <FormField
                    label="Nome"
                    value={name}
                    placeholder="Nome Completo"
                    invalid={invalidName}
                    onChange={setName}
                />
                <FormField
                    label="E-mail"
                    value={email}
                    placeholder="usuario@email.com"
                    type="email"
                    invalid={invalidEmail}
                    onChange={setEmail}
                />
                {createMode ? (
                    <FormField
                        label="Senha"
                        value={password}
                        placeholder="Digite a senha do usuário"
                        type="password"
                        invalid={invalidPassword}
                        onChange={setPassword}
                    />
                ) : (
                    <label className="flex cursor-pointer items-center gap-2 text-blue-500">
                        <input
                            type="checkbox"
                            checked={active}
                            onChange={(event) => setActive(event.target.checked)}
                            className="h-4 w-4 accent-blue-500"
                        />
                        Usuário ativo
                    </label>
                )}
                <button
                    type="submit"
                    className="w-full rounded-lg bg-orange-500 px-4 py-3 font-semibold text-white transition hover:bg-orange-700"
                >
                    {createMode ? "Cadastrar Usuário" : "Salvar Alterações"}
                </button>
            </form>
        </ModalShell>
    );
}

interface FormFieldProps {
    label: string;
    value: string;
    placeholder: string;
    type?: string;
    invalid: boolean;
    onChange: (value: string) => void;
}

function FormField({ label, value, placeholder, type = "text", invalid, onChange }: FormFieldProps) {
    return (
        <label className="block text-blue-500">
            <span className="mb-2 block">{label} <span className="text-red-500">*</span></span>
            <input
                type={type}
                value={value}
                placeholder={placeholder}
                aria-invalid={invalid}
                onChange={(event) => onChange(event.target.value)}
                className={`w-full rounded-lg border bg-white px-3 py-2.5 text-blue-500 outline-none placeholder:text-gray-500 focus:border-orange-500 ${
                    invalid ? "border-red-500" : "border-gray-500"
                }`}
            />
            {invalid && <span className="mt-1 block text-sm text-red-500">Este campo é obrigatório.</span>}
        </label>
    );
}

interface ModalShellProps {
    title: string;
    onClose: () => void;
    children: ReactNode;
}

function ModalShell({ title, onClose, children }: ModalShellProps) {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) onClose();
            }}
        >
            <section
                role="dialog"
                aria-modal="true"
                aria-label={title}
                className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
            >
                <div className="mb-5 flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-blue-500">{title}</h2>
                    <button type="button" onClick={onClose} aria-label="Fechar" className="text-black hover:opacity-60">
                        <Xmark className="h-5 w-5" />
                    </button>
                </div>
                {children}
            </section>
        </div>
    );
}

interface ConfirmRemoveModalProps {
    user: User;
    onCancel: () => void;
}

function ConfirmRemoveModal({ user, onCancel }: ConfirmRemoveModalProps) {
    return (
        <ModalShell onClose={onCancel} title="Remover Usuário">
            <p className="text-blue-500">Tem certeza que deseja remover este usuário?</p>
            <p className="mt-2 text-sm text-gray-500">{user.nome}</p>
            <div className="mt-6 flex justify-end gap-3">
                <button
                    type="button"
                    onClick={onCancel}
                    className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                    Cancelar
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="rounded-lg bg-red-500 px-4 py-2 text-white hover:opacity-80"
                >
                    Remover
                </button>
            </div>
        </ModalShell>
    );
}

export function ManageUsers() {
    const navigate = useNavigate();
    const [selectedFilter, setSelectedFilter] = useState<UserFilter>("todos");
    const [modalMode, setModalMode] = useState<"create" | "edit" | null>(null);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [userToRemove, setUserToRemove] = useState<User | null>(null);

    const counts = {
        todos: mockUsers.length,
        ativos: mockUsers.filter((user) => user.ativo).length,
        inativos: mockUsers.filter((user) => !user.ativo).length,
    };
    const visibleUsers = mockUsers.filter((user) => {
        if (selectedFilter === "ativos") return user.ativo;
        if (selectedFilter === "inativos") return !user.ativo;
        return true;
    });

    function closeUserModal() {
        setModalMode(null);
        setSelectedUser(null);
    }

    return (
        <section className="pb-10 text-blue-500">
            <button
                type="button"
                onClick={() => navigate("/configuracoes")}
                className="mb-5 inline-flex items-center gap-1 text-orange-500 hover:underline"
            >
                <ArrowLeft className="h-4 w-4" />
                Voltar para configurações
            </button>
            <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-semibold">Gerenciar Usuários</h1>
                    <p className="mt-1 text-gray-500">
                        Total: {counts.todos} | Ativos: {counts.ativos} | Inativos: {counts.inativos}
                    </p>
                </div>
                <button
                    type="button"
                    onClick={() => setModalMode("create")}
                    className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2.5 font-semibold text-white transition hover:bg-orange-700"
                >
                    <Plus className="h-5 w-5" />
                    Novo Usuário
                </button>
            </div>
            <UserFilters selected={selectedFilter} counts={counts} onChange={setSelectedFilter} />
            <UserTable
                users={visibleUsers}
                onEdit={(user) => {
                    setSelectedUser(user);
                    setModalMode("edit");
                }}
                onRemove={setUserToRemove}
            />
            {modalMode && (
                <UserModal mode={modalMode} user={selectedUser ?? undefined} onClose={closeUserModal} />
            )}
            {userToRemove && (
                <ConfirmRemoveModal user={userToRemove} onCancel={() => setUserToRemove(null)} />
            )}
        </section>
    );
}
