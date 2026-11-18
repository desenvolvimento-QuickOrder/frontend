import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export function SignIn() {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const [restaurante, setRestaurante] = useState("");
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErro("");
    setCarregando(true);

    try {
      await signIn({ restaurante, login, senha });
      navigate("/");
    } catch (e) {
      setErro(e instanceof Error ? e.message : "Erro ao fazer login.");
    } finally {
      setCarregando(false);
    }
  }

  const campo =
    "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-orange-500";


  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-4 rounded-xl bg-white p-8 shadow"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-800">QuickOrder</h1>
          <p className="text-sm text-gray-500">Entre na sua conta</p>
        </div>

        <div className="space-y-1">
          <label htmlFor="restaurante" className="text-sm font-medium text-gray-700">
            Restaurante
          </label>
          <input
            id="restaurante"
            type="text"
            value={restaurante}
            onChange={(e) => setRestaurante(e.target.value)}
            placeholder="meu-restaurante"
            pattern="[a-z0-9]+(-[a-z0-9]+)*"
            title="Use letras minúsculas, números e hífen. Ex.: meu-restaurante"
            required
            className={campo}
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="login" className="text-sm font-medium text-gray-700">
            Login
          </label>

          <input
            id="login"
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            placeholder="Seu login"
            minLength={3}
            required
            className={campo}
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="senha" className="text-sm font-medium text-gray-700">
            Senha
          </label>
          <input
            id="senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Sua senha"
            required
            className={campo}
          />
        </div>

        {erro && (
          <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
            {erro}
          </p>
        )}


        <button
          type="submit"
          disabled={carregando}
          className="w-full rounded-lg bg-orange-500 py-2 font-medium text-white hover:bg-orange-600 disabled:opacity-60"
        >
          {carregando ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </main>
  );
}