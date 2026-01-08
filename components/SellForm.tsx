
import React, { useState } from 'react';
import { SellLead } from '../types';

interface SellFormProps {
  onSubmit: (lead: Omit<SellLead, 'id' | 'date'>) => void;
  onCancel: () => void;
}

const SellForm: React.FC<SellFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    brand: '',
    model: '',
    year: '',
    mileage: '',
    intendedValue: '',
    observations: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      type: 'SELL',
      year: parseInt(formData.year),
      mileage: parseInt(formData.mileage),
      intendedValue: parseFloat(formData.intendedValue)
    } as Omit<SellLead, 'id' | 'date'>);
  };

  return (
    <div className="py-20 min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="max-w-4xl w-full bg-zinc-900 border border-zinc-800 rounded-3xl p-8 md:p-12 shadow-2xl">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-white mb-2">Venda Seu Carro</h2>
          <p className="text-zinc-500">Preencha os dados e receba uma proposta exclusiva em poucos minutos.</p>
        </div>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
          <div className="col-span-2 space-y-2">
            <label className="text-sm font-semibold text-zinc-400">Nome Completo</label>
            <input 
              required
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white focus:border-gold outline-none transition-colors"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-zinc-400">Telefone / WhatsApp</label>
            <input 
              required
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white focus:border-gold outline-none transition-colors"
              value={formData.phone}
              onChange={e => setFormData({...formData, phone: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-zinc-400">E-mail</label>
            <input 
              required
              type="email"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white focus:border-gold outline-none transition-colors"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-zinc-400">Marca do Veículo</label>
            <input 
              required
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white focus:border-gold outline-none transition-colors"
              value={formData.brand}
              onChange={e => setFormData({...formData, brand: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-zinc-400">Modelo</label>
            <input 
              required
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white focus:border-gold outline-none transition-colors"
              value={formData.model}
              onChange={e => setFormData({...formData, model: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-zinc-400">Ano</label>
            <input 
              required
              type="number"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white focus:border-gold outline-none transition-colors"
              value={formData.year}
              onChange={e => setFormData({...formData, year: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-zinc-400">Quilometragem</label>
            <input 
              required
              type="number"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white focus:border-gold outline-none transition-colors"
              value={formData.mileage}
              onChange={e => setFormData({...formData, mileage: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-zinc-400">Valor Pretendido (R$)</label>
            <input 
              required
              type="number"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white focus:border-gold outline-none transition-colors"
              value={formData.intendedValue}
              onChange={e => setFormData({...formData, intendedValue: e.target.value})}
            />
          </div>

          <div className="col-span-2 space-y-2">
            <label className="text-sm font-semibold text-zinc-400">Observações</label>
            <textarea 
              rows={4}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white focus:border-gold outline-none transition-colors resize-none"
              value={formData.observations}
              onChange={e => setFormData({...formData, observations: e.target.value})}
            ></textarea>
          </div>

          <div className="col-span-2 flex flex-col sm:flex-row gap-4 pt-6">
            <button 
              type="submit"
              className="flex-grow bg-gold hover:bg-amber-600 text-black font-bold py-4 rounded-xl transition-premium gold-glow"
            >
              Enviar Avaliação
            </button>
            <button 
              type="button"
              onClick={onCancel}
              className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-4 px-8 rounded-xl transition-premium"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellForm;
