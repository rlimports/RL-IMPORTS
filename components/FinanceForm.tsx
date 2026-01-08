
import React, { useState } from 'react';
import { FinanceLead } from '../types';

interface FinanceFormProps {
  onSubmit: (lead: Omit<FinanceLead, 'id' | 'date'>) => void;
  onCancel: () => void;
}

const FinanceForm: React.FC<FinanceFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    phone: '',
    email: '',
    vehicleValue: '',
    downPayment: '',
    installments: '48'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      type: 'FINANCE',
      vehicleValue: parseFloat(formData.vehicleValue),
      downPayment: parseFloat(formData.downPayment),
      installments: parseInt(formData.installments)
    } as Omit<FinanceLead, 'id' | 'date'>);
  };

  return (
    <div className="py-20 min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="max-w-3xl w-full bg-zinc-900 border border-zinc-800 rounded-3xl p-8 md:p-12 shadow-2xl">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-white mb-2 text-gold">Financiamento Premium</h2>
          <p className="text-zinc-500">Simule agora e receba uma análise de crédito personalizada.</p>
        </div>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
          <div className="col-span-2 space-y-2">
            <label className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Nome Completo</label>
            <input 
              required
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white focus:border-gold outline-none transition-colors"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">CPF</label>
            <input 
              required
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white focus:border-gold outline-none transition-colors"
              placeholder="000.000.000-00"
              value={formData.cpf}
              onChange={e => setFormData({...formData, cpf: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Telefone</label>
            <input 
              required
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white focus:border-gold outline-none transition-colors"
              value={formData.phone}
              onChange={e => setFormData({...formData, phone: e.target.value})}
            />
          </div>

          <div className="col-span-2 space-y-2">
            <label className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">E-mail</label>
            <input 
              required
              type="email"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white focus:border-gold outline-none transition-colors"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Valor do Veículo (R$)</label>
            <input 
              required
              type="number"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white focus:border-gold outline-none transition-colors"
              value={formData.vehicleValue}
              onChange={e => setFormData({...formData, vehicleValue: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Entrada (R$)</label>
            <input 
              required
              type="number"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white focus:border-gold outline-none transition-colors"
              value={formData.downPayment}
              onChange={e => setFormData({...formData, downPayment: e.target.value})}
            />
          </div>

          <div className="col-span-2 space-y-2">
            <label className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Parcelas</label>
            <select 
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white focus:border-gold outline-none transition-colors"
              value={formData.installments}
              onChange={e => setFormData({...formData, installments: e.target.value})}
            >
              <option value="12">12x</option>
              <option value="24">24x</option>
              <option value="36">36x</option>
              <option value="48">48x</option>
              <option value="60">60x</option>
            </select>
          </div>

          <div className="col-span-2 pt-6 flex flex-col sm:flex-row gap-4">
            <button 
              type="submit"
              className="flex-grow bg-gold hover:bg-amber-600 text-black font-bold py-4 rounded-xl transition-premium gold-glow"
            >
              Solicitar Análise
            </button>
            <button 
              type="button"
              onClick={onCancel}
              className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-4 px-8 rounded-xl transition-premium"
            >
              Voltar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FinanceForm;
