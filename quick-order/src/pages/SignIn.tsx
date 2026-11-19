import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import logo from "../assets/Logo-Laranja.svg";

export function SignIn() {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const [restaurante, setRestaurante] = useState("");
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [manterConectado, setManterConectado] = useState(false);
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

  const label = "block text-lg text-white";

  const campo =
    "w-full rounded-2xl bg-gray-100 px-5 py-3.5 text-gray-800 shadow placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-orange-500";

  return (
    <main className="grid min-h-screen bg-[#201C3B] md:grid-cols-[46fr_54fr]">
      <div className="hidden md:block">
       <div className="sticky top-0 h-screen">
         <img
           src="/sanduiche.jpg"
           alt=""
           aria-hidden="true"
           className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/25" />
       </div>
     </div>

      <section className="flex items-center justify-center px-6 py-10">
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <img src={logo} alt="QuickOrder" className="mx-auto mb-12 h-40" />

          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="restaurante" className={label}>
                Restaurante
              </label>
              <input
                id="restaurante"
                type="text"
                value={restaurante}
                onChange={(e) => setRestaurante(e.target.value)}
                placeholder="Digite o nome do restaurante"
                pattern="[a-z0-9]+(-[a-z0-9]+)*"
                title="Use letras minúsculas, números e hífen. Ex.: meu-restaurante"
                required
                className={campo}
              />
            </div>


            <div className="space-y-2">
              <label htmlFor="login" className={label}>
                Login
              </label>
              <input
                id="login"
                type="text"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                placeholder="Digite o seu login"
                minLength={3}
                required
                className={campo}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="senha" className={label}>
                Senha
              </label>
              <input
                id="senha"
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Digite a sua senha"
                required
                className={campo}
              />
              <div className="text-right">
                <button

                  type="button"
                  className="text-sm text-white underline hover:text-orange-400"
                >
                  Esqueci minha senha
                </button>
              </div>
            </div>
          </div>

          <label className="mt-4 flex items-center gap-2 text-sm text-white">
            <input
              type="checkbox"
              checked={manterConectado}
              onChange={(e) => setManterConectado(e.target.checked)}
              className="h-5 w-5 accent-orange-500"
            />
            Manter-me conectado
          </label>

          {erro && (
            <p
              role="alert"
              className="mt-4 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-300"
            >
              {erro}
            </p>
          )}

          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              disabled={carregando}

              className="rounded-full bg-orange-500 px-12 py-2.5 text-xl font-medium text-white hover:bg-orange-600 disabled:opacity-60"
            >
              {carregando ? "Entrando..." : "Entrar"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}