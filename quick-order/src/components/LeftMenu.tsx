import { useLocation, useNavigate } from "react-router-dom";
import orangeLogo from "../assets/Logo-Laranja.svg"

import { CreditCard, Cutlery, HomeAltSlim, HomeTable, Page, Settings } from 'iconoir-react';

const menuItems = [
    { id: 'dashboard', label: 'Dashboard', Icon: HomeAltSlim },
    { id: 'comandas', label: 'Comandas', Icon: Page },
    { id: 'cardapio', label: 'Cardápio', Icon: Cutlery },
    { id: 'mesas', label: 'Mesas', Icon: HomeTable },
    { id: 'pagamentos', label: 'Pagamentos', Icon: CreditCard },
    { id: 'configuracoes', label: 'Configurações', Icon: Settings },
];

export function LeftMenu() {
    const navigate = useNavigate();
    const location = useLocation();
    
    return (
        <div className="md:w-90 h-dvh flow-root bg-white shadow-xl fixed left-0 top-0">
            <div className="flex justify-center mt-15 pb-7.5 border-b-[3px] border-gray-100">
                <img src={orangeLogo} alt="Logo" className="w-32.5" />
            </div>

            <section className="mx-13.75 mt-7.5 flex flex-col gap-4">
                {menuItems.map((item) => {
                    const path = item.id === 'dashboard' ? '/' : `/${item.id}`;
                    const isActive = location.pathname === path;
                    const IconComponent = item.Icon;

                    return (
                        <div
                            key={item.id}
                            onClick={() => navigate(path)}
                            className={`pl-2.5 py-3 w-full rounded-[10px] cursor-pointer transition-colors duration-200 ${
                                isActive 
                                    ? 'bg-purple-500'
                                    : 'hover:bg-gray-100'
                            }`}
                        >
                            <div 
                                className={`flex items-center ${
                                    isActive 
                                        ? 'text-purple-900'
                                        : 'text-black'
                                }`}
                            >
                                <IconComponent className="w-7.5 h-7.5" />
                                <p className="ml-3.75 text-2xl">{item.label}</p>
                            </div>
                        </div>
                    );
                })}
            </section>
        </div>
    );
}