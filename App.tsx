import React, { useState } from 'react';
import ScheduleView from './components/ScheduleView';
import GPACalculator from './components/GPACalculator';
import GraduationAdvisor from './components/GraduationAdvisor';
import { Calendar, Calculator, GraduationCap } from 'lucide-react';

type Tab = 'schedule' | 'gpa' | 'advisor';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('schedule');

  return (
    <div className="min-h-screen bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-purple-900 to-slate-900 text-slate-100 font-sans selection:bg-purple-500 selection:text-white overflow-x-hidden">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/30 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>
        <div className="absolute top-[20%] right-[20%] w-[20%] h-[20%] bg-pink-500/20 rounded-full blur-[100px] animate-pulse delay-700"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 flex flex-col min-h-screen">
        {/* Header */}
        <header className="mb-8 flex flex-col md:flex-row justify-between items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center gap-3 mb-4 md:mb-0">
            <div className="bg-gradient-to-tr from-blue-400 to-purple-500 p-2 rounded-lg shadow-lg">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                GlassyGrad Scholar
              </h1>
              <p className="text-xs text-white/50 uppercase tracking-widest font-semibold">High School Companion</p>
            </div>
          </div>

          <nav className="flex bg-black/20 p-1 rounded-xl backdrop-blur-md">
            <button
              onClick={() => setActiveTab('schedule')}
              className={`flex items-center px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === 'schedule'
                  ? 'bg-white/10 text-white shadow-lg border border-white/10'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Schedule
            </button>
            <button
              onClick={() => setActiveTab('gpa')}
              className={`flex items-center px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === 'gpa'
                  ? 'bg-white/10 text-white shadow-lg border border-white/10'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Calculator className="w-4 h-4 mr-2" />
              GPA Calc
            </button>
            <button
              onClick={() => setActiveTab('advisor')}
              className={`flex items-center px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === 'advisor'
                  ? 'bg-white/10 text-white shadow-lg border border-white/10'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <GraduationCap className="w-4 h-4 mr-2" />
              AI Advisor
            </button>
          </nav>
        </header>

        {/* Content Area */}
        <main className="flex-1 relative">
          {activeTab === 'schedule' && <ScheduleView />}
          {activeTab === 'gpa' && <GPACalculator />}
          {activeTab === 'advisor' && <GraduationAdvisor />}
        </main>
        
        <footer className="mt-12 text-center text-white/20 text-sm">
            <p>&copy; {new Date().getFullYear()} GlassyGrad Scholar. All computations are estimates.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
