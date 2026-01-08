
import React from 'react';

interface HomeProps {
  onSellClick: () => void;
  onFinanceClick: () => void;
  onInventoryClick: () => void;
}

const Home: React.FC<HomeProps> = ({ onSellClick, onFinanceClick, onInventoryClick }) => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1600" 
            className="w-full h-full object-cover scale-105"
            alt="Porsche"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <span className="text-gold font-bold tracking-[0.3em] uppercase mb-4 block animate-slide-up">RL Imports Lifestyle</span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight animate-slide-up">
              Excelência em <br />
              <span className="text-gold">veículos</span> selecionados
            </h1>
            <p className="text-zinc-300 text-lg mb-10 max-w-lg animate-slide-up delay-100">
              Sua jornada para o automóvel dos sonhos começa aqui. Segurança, procedência e exclusividade em cada detalhe.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up delay-200">
              <button 
                onClick={onInventoryClick}
                className="bg-gold hover:bg-amber-600 text-black px-8 py-4 rounded font-bold text-lg transition-premium gold-glow"
              >
                Ver Estoque
              </button>
              <button 
                onClick={onSellClick}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/20 px-8 py-4 rounded font-bold text-lg transition-premium"
              >
                Vender Meu Carro
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured CTA Section */}
      <section className="py-24 bg-zinc-950 border-y border-zinc-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              title="Financiamento Facilitado"
              desc="As melhores taxas do mercado com aprovação rápida e sem burocracia."
              icon={(
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.406 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.406-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
              onClick={onFinanceClick}
            />
            <FeatureCard 
              title="Avaliação Justa"
              desc="Pagamos o preço justo pelo seu seminovo. Entre em contato agora."
              icon={(
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
              onClick={onSellClick}
            />
            <FeatureCard 
              title="Curadoria Especial"
              desc="Cada carro em nosso pátio passa por uma rigorosa perícia cautelar."
              icon={(
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" />
                </svg>
              )}
              onClick={onInventoryClick}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard: React.FC<{ title: string; desc: string; icon: React.ReactNode; onClick: () => void }> = ({ title, desc, icon, onClick }) => (
  <div 
    onClick={onClick}
    className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-gold group cursor-pointer transition-premium"
  >
    <div className="mb-6 group-hover:scale-110 transition-transform">{icon}</div>
    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
    <p className="text-zinc-400 mb-6">{desc}</p>
    <div className="text-gold font-semibold flex items-center gap-2">
      Saber Mais
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </div>
  </div>
);

export default Home;
