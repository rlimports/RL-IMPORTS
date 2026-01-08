
import React from 'react';
import { Vehicle } from '../types';

interface InventoryProps {
  vehicles: Vehicle[];
}

const Inventory: React.FC<InventoryProps> = ({ vehicles }) => {
  return (
    <div className="py-20 bg-[#0a0a0a]">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Nosso Estoque</h2>
          <div className="w-20 h-1 bg-gold"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {vehicles.map(vehicle => (
            <div key={vehicle.id} className="bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-premium flex flex-col group">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={vehicle.imageUrl} 
                  alt={`${vehicle.brand} ${vehicle.model}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm text-gold px-3 py-1 rounded-full text-sm font-bold border border-gold/30">
                  {vehicle.year}
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="mb-4">
                  <h3 className="text-sm uppercase tracking-widest text-zinc-500 font-bold mb-1">{vehicle.brand}</h3>
                  <h4 className="text-xl font-bold text-white">{vehicle.model}</h4>
                </div>
                
                <div className="flex items-center justify-between text-zinc-400 text-sm mb-6 pb-6 border-b border-zinc-800">
                  <span className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    {vehicle.mileage.toLocaleString()} km
                  </span>
                  <span className="font-bold text-white text-lg">
                    {vehicle.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </span>
                </div>

                <button className="w-full py-3 bg-zinc-800 hover:bg-gold hover:text-black text-white font-bold rounded-lg transition-premium mt-auto">
                  Tenho Interesse
                </button>
              </div>
            </div>
          ))}
        </div>

        {vehicles.length === 0 && (
          <div className="text-center py-20">
            <p className="text-zinc-500 text-xl">Nenhum veículo disponível no momento.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inventory;
