
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-16 border-t border-zinc-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-gold rounded flex items-center justify-center font-bold text-black">RL</div>
              <span className="text-xl font-bold tracking-widest text-white">IMPORTS</span>
            </div>
            <p className="text-zinc-500 max-w-sm mb-6">
              Líder em comercialização de veículos premium e esportivos. Atendimento exclusivo, procedência garantida e as melhores condições do Brasil.
            </p>
            <div className="flex gap-4">
              <SocialIcon d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              <SocialIcon d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63z" />
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Links Úteis</h4>
            <ul className="space-y-4">
              <li><FooterLink>Sobre Nós</FooterLink></li>
              <li><FooterLink>Estoque</FooterLink></li>
              <li><FooterLink>Venda seu Veículo</FooterLink></li>
              <li><FooterLink>Financiamento</FooterLink></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Contato</h4>
            <ul className="space-y-4">
              <li className="text-zinc-500 text-sm flex gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Av. das Nações Unidas, 12551 <br /> Brooklin, São Paulo - SP
              </li>
              <li className="text-zinc-500 text-sm flex gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                (11) 99999-9999
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-600 text-xs">
            © {new Date().getFullYear()} RL IMPORTS. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            <FooterLink className="text-[10px]">Políticas de Privacidade</FooterLink>
            <FooterLink className="text-[10px]">Termos de Uso</FooterLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon: React.FC<{ d: string }> = ({ d }) => (
  <a href="#" className="w-10 h-10 rounded-lg bg-zinc-900 flex items-center justify-center text-zinc-400 hover:text-gold hover:bg-zinc-800 transition-all">
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d={d} />
    </svg>
  </a>
);

const FooterLink: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <a href="#" className={`text-zinc-500 hover:text-gold transition-colors text-sm ${className}`}>
    {children}
  </a>
);

export default Footer;
