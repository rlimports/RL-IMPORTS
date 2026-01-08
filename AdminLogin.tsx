
import React, { useState } from 'react';

interface AdminLoginProps {
  onLogin: (email: string, pass: string) => Promise<boolean>;
  onCancel: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, onCancel }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await onLogin(email, password);
    if (!success) setError(true);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-10 rounded-2xl shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Acesso Restrito</h2>
          <p className="text-zinc-500 text-sm">Apenas administradores autorizados</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs uppercase font-bold text-zinc-400 tracking-widest">E-mail</label>
            <input
              required
              type="email"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-4 text-white focus:border-gold outline-none transition-colors"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase font-bold text-zinc-400 tracking-widest">Senha</label>
            <input
              required
              type="password"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-4 text-white focus:border-gold outline-none transition-colors"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">Credenciais inválidas. Tente novamente.</p>
          )}

          <div className="flex flex-col gap-4 pt-4">
            <button
              type="submit"
              className="w-full bg-gold hover:bg-amber-600 text-black font-bold py-4 rounded-xl transition-premium shadow-lg shadow-gold/10"
            >
              Entrar no Painel
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="w-full text-zinc-500 hover:text-white transition-colors text-sm font-medium"
            >
              Voltar para a loja
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
