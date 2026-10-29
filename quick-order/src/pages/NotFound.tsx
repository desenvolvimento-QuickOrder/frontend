export function NotFound() {
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="flex flex-col">
                <h1 className="font-semibold text-2xl mb-5">
                    Ops! Essa página não existe. 🥲
                </h1>

                <a href="/" className="font-semibold text-center text-orange-500 hover:opacity-80 transition ease-linear">
                    Voltar para o início
                </a>
            </div>
        </div>
    );
}