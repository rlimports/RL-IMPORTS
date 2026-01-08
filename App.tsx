
import React, { useState, useEffect, useCallback } from 'react';
import { ViewState, Vehicle, Lead, AuthState } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Inventory from './components/Inventory';
import SellForm from './components/SellForm';
import FinanceForm from './components/FinanceForm';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import { supabase } from './services/supabase';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('HOME');
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [auth, setAuth] = useState<AuthState>({ isAuthenticated: false, email: null });
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load Session and Data
  useEffect(() => {
    const initApp = async () => {
      try {
        // Check current session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;

        if (session) {
          setAuth({ isAuthenticated: true, email: session.user.email || null });
        }

        // Fetch Vehicles
        const { data: vData, error: vError } = await supabase
          .from('vehicles')
          .select('*')
          .order('created_at', { ascending: false });

        if (vError) throw vError;

        if (vData) {
          setVehicles(vData.map(v => ({
            id: v.id,
            brand: v.brand,
            model: v.model,
            year: v.year,
            mileage: v.mileage,
            price: v.price,
            imageUrl: v.image_url,
            description: v.description
          })));
        }

        // Fetch Leads if authenticated
        if (session) {
          fetchLeads();
        }
      } catch (err) {
        console.error('App initialization error:', err);
      } finally {
        setLoading(false);
      }
    };

    initApp();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setAuth({ isAuthenticated: true, email: session.user.email || null });
        fetchLeads();
      } else {
        setAuth({ isAuthenticated: false, email: null });
        setLeads([]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchLeads = async () => {
    const { data } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) {
      setLeads(data.map(l => ({
        ...l,
        intendedValue: l.intended_value,
        vehicleValue: l.vehicle_value,
        downPayment: l.down_payment,
        date: new Date(l.created_at).toLocaleDateString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      })) as Lead[]);
    }
  };

  const handleLogin = async (email: string, pass: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password: pass });
    if (error) return false;
    setView('ADMIN_DASHBOARD');
    return true;
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setView('HOME');
  };

  const addLead = async (lead: Omit<Lead, 'id' | 'date'>) => {
    const dbLead = {
      type: lead.type,
      name: lead.name,
      phone: lead.phone,
      email: lead.email,
      brand: (lead as any).brand,
      model: (lead as any).model,
      year: (lead as any).year,
      mileage: (lead as any).mileage,
      intended_value: (lead as any).intendedValue,
      observations: (lead as any).observations,
      cpf: (lead as any).cpf,
      vehicle_value: (lead as any).vehicleValue,
      down_payment: (lead as any).downPayment,
      installments: (lead as any).installments
    };

    const { error } = await supabase.from('leads').insert([dbLead]);
    if (!error) {
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 3000);
      setView('HOME');
      if (auth.isAuthenticated) fetchLeads();
    }
  };

  const addVehicle = async (vehicle: Omit<Vehicle, 'id'>) => {
    const { data, error } = await supabase
      .from('vehicles')
      .insert([{
        brand: vehicle.brand,
        model: vehicle.model,
        year: vehicle.year,
        mileage: vehicle.mileage,
        price: vehicle.price,
        image_url: vehicle.imageUrl,
        description: vehicle.description
      }])
      .select();

    if (data && !error) {
      const newV = { ...vehicle, id: data[0].id };
      setVehicles(prev => [newV, ...prev]);
    }
  };

  const updateVehicle = async (updatedVehicle: Vehicle) => {
    const { error } = await supabase
      .from('vehicles')
      .update({
        brand: updatedVehicle.brand,
        model: updatedVehicle.model,
        year: updatedVehicle.year,
        mileage: updatedVehicle.mileage,
        price: updatedVehicle.price,
        image_url: updatedVehicle.imageUrl,
        description: updatedVehicle.description
      })
      .eq('id', updatedVehicle.id);

    if (!error) {
      setVehicles(prev => prev.map(v => v.id === updatedVehicle.id ? updatedVehicle : v));
    }
  };

  const deleteVehicle = async (id: string) => {
    const { error } = await supabase.from('vehicles').delete().eq('id', id);
    if (!error) {
      setVehicles(prev => prev.filter(v => v.id !== id));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-zinc-100 selection:bg-amber-500 selection:text-black">
      <Header
        currentView={view}
        setView={setView}
        isAuthenticated={auth.isAuthenticated}
        onLogout={handleLogout}
      />

      <main className="flex-grow">
        {loading ? (
          <div className="flex items-center justify-center p-20">
            <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {view === 'HOME' && (
              <Home
                onSellClick={() => setView('SELL_FORM')}
                onFinanceClick={() => setView('FINANCE_FORM')}
                onInventoryClick={() => setView('INVENTORY')}
              />
            )}

            {view === 'INVENTORY' && (
              <Inventory vehicles={vehicles} />
            )}

            {view === 'SELL_FORM' && (
              <SellForm onSubmit={addLead} onCancel={() => setView('HOME')} />
            )}

            {view === 'FINANCE_FORM' && (
              <FinanceForm onSubmit={addLead} onCancel={() => setView('HOME')} />
            )}

            {view === 'ADMIN_LOGIN' && (
              <AdminLogin onLogin={handleLogin} onCancel={() => setView('HOME')} />
            )}

            {view === 'ADMIN_DASHBOARD' && auth.isAuthenticated && (
              <AdminDashboard
                vehicles={vehicles}
                leads={leads}
                onAddVehicle={addVehicle}
                onUpdateVehicle={updateVehicle}
                onDeleteVehicle={deleteVehicle}
              />
            )}
          </>
        )}
      </main>

      <Footer />

      {/* Discreet Admin Access Icon */}
      <button
        onClick={() => setView(auth.isAuthenticated ? 'ADMIN_DASHBOARD' : 'ADMIN_LOGIN')}
        className="fixed bottom-4 right-4 p-3 bg-zinc-900/50 hover:bg-amber-500/20 rounded-full text-zinc-600 hover:text-amber-500 transition-all duration-300 z-50 group"
        title="Área do Lojista"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      </button>

      {/* Success Notification */}
      {showSuccessToast && (
        <div className="fixed top-24 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-xl animate-bounce z-[60]">
          Solicitação enviada com sucesso!
        </div>
      )}
    </div>
  );
};

export default App;
