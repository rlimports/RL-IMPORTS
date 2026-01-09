
import React, { useState, useRef } from 'react';
import { Vehicle, Lead } from './types';
import { generateVehicleDescription } from './services/geminiService';

interface AdminDashboardProps {
  vehicles: Vehicle[];
  leads: Lead[];
  onAddVehicle: (v: Omit<Vehicle, 'id'>) => void;
  onUpdateVehicle: (v: Vehicle) => void;
  onDeleteVehicle: (id: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ vehicles, leads, onAddVehicle, onUpdateVehicle, onDeleteVehicle }) => {
  const [activeTab, setActiveTab] = useState<'STOCK' | 'LEADS'>('STOCK');
  const [isEditing, setIsEditing] = useState<Vehicle | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Vehicle form state
  const [vForm, setVForm] = useState<Omit<Vehicle, 'id'>>({
    brand: '',
    model: '',
    year: 2024,
    mileage: 0,
    price: 0,
    imageUrl: '',
    description: ''
  });

  const resetForm = () => {
    setVForm({
      brand: '',
      model: '',
      year: 2024,
      mileage: 0,
      price: 0,
      imageUrl: '',
      description: ''
    });
    setIsAdding(false);
    setIsEditing(null);
  };

  const handleSave = () => {
    if (isEditing) {
      onUpdateVehicle({ ...vForm, id: isEditing.id });
    } else {
      onAddVehicle(vForm);
    }
    resetForm();
  };

  const handleEditClick = (v: Vehicle) => {
    setVForm({
      brand: v.brand,
      model: v.model,
      year: v.year,
      mileage: v.mileage,
      price: v.price,
      imageUrl: v.imageUrl,
      description: v.description
    });
    setIsEditing(v);
    setIsAdding(true);
  };

  const handleGenerateAI = async () => {
    if (!vForm.brand || !vForm.model) {
      alert("Preencha Marca e Modelo primeiro.");
      return;
    }
    setIsGenerating(true);
    const desc = await generateVehicleDescription(vForm.brand, vForm.model, vForm.year);
    setVForm(prev => ({ ...prev, description: desc }));
    setIsGenerating(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setVForm(prev => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Painel de Gestão</h1>
          <p className="text-zinc-500">Controle total do seu estoque e leads recebidos.</p>
        </div>
        <div className="flex bg-zinc-900 p-1 rounded-xl border border-zinc-800">
          <button
            onClick={() => setActiveTab('STOCK')}
            className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === 'STOCK' ? 'bg-gold text-black' : 'text-zinc-400 hover:text-white'}`}
          >
            Estoque
          </button>
          <button
            onClick={() => setActiveTab('LEADS')}
            className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === 'LEADS' ? 'bg-gold text-black' : 'text-zinc-400 hover:text-white'}`}
          >
            Leads ({leads.length})
          </button>
        </div>
      </div>

      {activeTab === 'STOCK' && (
        <div className="space-y-8">
          <div className="flex justify-end">
            <button
              onClick={() => setIsAdding(true)}
              className="bg-gold hover:bg-amber-600 text-black px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-premium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Cadastrar Veículo
            </button>
          </div>

          {isAdding && (
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 animate-slide-up">
              <h3 className="text-xl font-bold text-white mb-6">{isEditing ? 'Editar Veículo' : 'Novo Veículo'}</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <Input label="Marca" value={vForm.brand} onChange={v => setVForm({ ...vForm, brand: v })} />
                <Input label="Modelo" value={vForm.model} onChange={v => setVForm({ ...vForm, model: v })} />
                <Input label="Ano" type="number" value={vForm.year.toString()} onChange={v => setVForm({ ...vForm, year: parseInt(v) })} />
                <Input label="Km" type="number" value={vForm.mileage.toString()} onChange={v => setVForm({ ...vForm, mileage: parseInt(v) })} />
                <Input label="Preço (R$)" type="number" value={vForm.price.toString()} onChange={v => setVForm({ ...vForm, price: parseFloat(v) })} />

                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest block">Imagem do Veículo</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="URL da imagem"
                      className="flex-grow bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white text-sm focus:border-gold outline-none transition-colors"
                      value={vForm.imageUrl}
                      onChange={e => setVForm({ ...vForm, imageUrl: e.target.value })}
                    />
                    <button
                      onClick={triggerFileUpload}
                      className="bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center"
                      title="Upload de Arquivo"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      className="hidden"
                      accept="image/*"
                    />
                  </div>
                  {vForm.imageUrl && (
                    <div className="mt-2 relative group w-24 h-16 rounded-lg overflow-hidden border border-zinc-700">
                      <img src={vForm.imageUrl} className="w-full h-full object-cover" alt="Preview" />
                      <button
                        onClick={() => setVForm(prev => ({ ...prev, imageUrl: '' }))}
                        className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>

                <div className="col-span-full space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Descrição Premium</label>
                    <button
                      onClick={handleGenerateAI}
                      disabled={isGenerating}
                      className="text-[10px] bg-indigo-600 hover:bg-indigo-500 text-white px-2 py-1 rounded-md uppercase font-bold flex items-center gap-1 disabled:opacity-50"
                    >
                      {isGenerating ? 'Gerando...' : '💡 Gerar com IA'}
                    </button>
                  </div>
                  <textarea
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-4 text-white focus:border-gold outline-none h-32 resize-none"
                    value={vForm.description}
                    onChange={e => setVForm({ ...vForm, description: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex gap-4 mt-8">
                <button
                  onClick={handleSave}
                  className="bg-gold hover:bg-amber-600 text-black font-bold px-8 py-3 rounded-lg transition-premium"
                >
                  Salvar
                </button>
                <button
                  onClick={resetForm}
                  className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold px-8 py-3 rounded-lg transition-premium"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map(v => (
              <div key={v.id} className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex gap-4">
                <img src={v.imageUrl} className="w-24 h-24 object-cover rounded-lg" alt="" />
                <div className="flex-grow">
                  <h4 className="font-bold text-white">{v.brand} {v.model}</h4>
                  <p className="text-xs text-zinc-500 mb-2">{v.year} • {v.mileage}km</p>
                  <p className="text-gold font-bold mb-3">{v.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditClick(v)}
                      className="p-2 text-zinc-400 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => onDeleteVehicle(v.id)}
                      className="p-2 text-red-500/50 hover:text-red-500 bg-zinc-800 hover:bg-red-500/10 rounded transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'LEADS' && (
        <div className="space-y-6">
          {leads.length === 0 ? (
            <div className="text-center py-20 bg-zinc-900/50 border border-zinc-800 rounded-2xl">
              <p className="text-zinc-500">Nenhum lead recebido ainda.</p>
            </div>
          ) : (
            leads.map(lead => (
              <div key={lead.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-premium">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${lead.type === 'SELL' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-green-500/20 text-green-400'}`}>
                      {lead.type === 'SELL' ? 'Vender Carro' : 'Financiamento'}
                    </span>
                    <span className="text-zinc-500 text-xs">{lead.date}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-zinc-300 font-bold">{lead.name}</p>
                    <p className="text-zinc-500 text-sm">{lead.email} | {lead.phone}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 pt-6 border-t border-zinc-800">
                  {lead.type === 'SELL' ? (
                    <>
                      <LeadData label="Veículo" value={`${lead.brand} ${lead.model} (${lead.year})`} />
                      <LeadData label="Km" value={`${lead.mileage} km`} />
                      <LeadData label="Preço Pretendido" value={lead.intendedValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} />
                      {lead.observations && <div className="col-span-full"><LeadData label="Obs" value={lead.observations} /></div>}
                    </>
                  ) : (
                    <>
                      <LeadData label="CPF" value={lead.cpf} />
                      <LeadData label="Valor Veículo" value={lead.vehicleValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} />
                      <LeadData label="Entrada" value={lead.downPayment.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} />
                      <LeadData label="Parcelas" value={`${lead.installments}x`} />
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

const Input: React.FC<{ label: string; value: string; onChange: (v: string) => void; type?: string }> = ({ label, value, onChange, type = "text" }) => (
  <div className="space-y-2">
    <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{label}</label>
    <input
      type={type}
      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white focus:border-gold outline-none transition-colors"
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  </div>
);

const LeadData: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div>
    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">{label}</p>
    <p className="text-zinc-200">{value}</p>
  </div>
);

export default AdminDashboard;
