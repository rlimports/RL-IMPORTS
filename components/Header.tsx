
import React from 'react';
import { ViewState } from '../types';

interface HeaderProps {
  currentView: ViewState;
  setView: (v: ViewState) => void;
  isAuthenticated: boolean;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setView, isAuthenticated, onLogout }) => {
  return (
    <header className="sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-zinc-800">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => setView('HOME')}
        >
          <div className="w-10 h-10 bg-gold rounded flex items-center justify-center font-bold text-black text-xl">RL</div>
          <span className="text-xl font-bold tracking-widest text-white group-hover:text-gold transition-colors">IMPORTS</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <NavLink active={currentView === 'HOME'} onClick={() => setView('HOME')}>Início</NavLink>
          <NavLink active={currentView === 'INVENTORY'} onClick={() => setView('INVENTORY')}>Estoque</NavLink>
          <NavLink active={currentView === 'SELL_FORM'} onClick={() => setView('SELL_FORM')}>Venda Seu Carro</NavLink>
          <NavLink active={currentView === 'FINANCE_FORM'} onClick={() => setView('FINANCE_FORM')}>Financiamento</NavLink>
        </nav>

        <div className="flex items-center gap-4">
          {/* Admin Access Icon in Header */}
          <button 
            onClick={() => setView(isAuthenticated ? 'ADMIN_DASHBOARD' : 'ADMIN_LOGIN')}
            className={`p-2 rounded-full transition-all duration-300 ${currentView === 'ADMIN_LOGIN' || currentView === 'ADMIN_DASHBOARD' ? 'text-gold bg-gold/10' : 'text-zinc-500 hover:text-gold hover:bg-zinc-800'}`}
            title="Área do Lojista"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>

          {isAuthenticated ? (
            <button 
              onClick={onLogout}
              className="px-4 py-2 text-sm border border-zinc-700 hover:border-red-500 hover:text-red-500 rounded transition-all"
            >
              Sair
            </button>
          ) : (
            <button 
              onClick={() => setView('INVENTORY')}
              className="bg-gold hover:bg-amber-600 text-black px-4 md:px-6 py-2 rounded font-semibold text-sm md:text-base transition-premium gold-glow"
            >
              Ver Estoque
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

const NavLink: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode }> = ({ active, onClick, children }) => (
  <button 
    onClick={onClick}
    className={`text-sm font-medium uppercase tracking-wider transition-colors hover:text-gold ${active ? 'text-gold' : 'text-zinc-400'}`}
  >
    {children}
  </button>
);

export default Header;
