import React, { useState } from 'react';
import { ScheduleItem } from '../types';
import { MapPin, User, Grid, Copy } from 'lucide-react';

type Quarter = 'Q1' | 'Q2' | 'Q3' | 'Q4';
type ViewMode = Quarter | 'ALL';

const generateEmptySchedule = (): ScheduleItem[] =>
  Array.from({ length: 8 }, (_, i) => ({
    period: i + 1,
    className: '',
    room: '',
    teacher: '',
  }));

const ScheduleView: React.FC = () => {
  const [schedules, setSchedules] = useState<Record<Quarter, ScheduleItem[]>>({
    Q1: generateEmptySchedule(),
    Q2: generateEmptySchedule(),
    Q3: generateEmptySchedule(),
    Q4: generateEmptySchedule(),
  });

  const [activeView, setActiveView] = useState<ViewMode>('Q1');

  const updateSchedule = (quarter: Quarter, period: number, field: keyof ScheduleItem, value: string) => {
    setSchedules((prev) => ({
      ...prev,
      [quarter]: prev[quarter].map((item) =>
        item.period === period ? { ...item, [field]: value } : item
      ),
    }));
  };

  const copyToAll = (sourceQuarter: Quarter) => {
    if (window.confirm(`Overwrite Q1-Q4 with ${sourceQuarter} data?`)) {
      setSchedules((prev) => {
        const source = prev[sourceQuarter];
        // Deep copy needed for arrays of objects
        const clone = (items: ScheduleItem[]) => items.map((i) => ({ ...i }));
        return {
          Q1: clone(source),
          Q2: clone(source),
          Q3: clone(source),
          Q4: clone(source),
        };
      });
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Daily Schedule</h2>
          <p className="text-blue-200">
            Manage classes for {activeView === 'ALL' ? 'all quarters' : activeView}
          </p>
        </div>

        <div className="flex bg-black/20 p-1 rounded-xl backdrop-blur-md overflow-x-auto max-w-full">
          {(['Q1', 'Q2', 'Q3', 'Q4'] as Quarter[]).map((q) => (
            <button
              key={q}
              onClick={() => setActiveView(q)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeView === q
                  ? 'bg-white/20 text-white shadow-lg'
                  : 'text-white/60 hover:bg-white/5'
              }`}
            >
              {q}
            </button>
          ))}
          <div className="w-px bg-white/10 mx-1"></div>
          <button
            onClick={() => setActiveView('ALL')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap flex items-center ${
              activeView === 'ALL'
                ? 'bg-purple-500/40 text-white shadow-lg'
                : 'text-white/60 hover:bg-white/5'
              }`}
          >
            <Grid className="w-4 h-4 mr-1" /> All
          </button>
        </div>
      </div>

      {activeView === 'ALL' ? (
        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-xl">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-white/10 text-white/70 text-sm uppercase">
                <th className="p-4 w-16 text-center border-b border-white/10">#</th>
                {['Q1', 'Q2', 'Q3', 'Q4'].map((q) => (
                  <th key={q} className="p-4 border-b border-white/10">
                    {q}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {Array.from({ length: 8 }).map((_, idx) => {
                const period = idx + 1;
                return (
                  <tr key={period} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 text-center font-bold text-white/50">{period}</td>
                    {(['Q1', 'Q2', 'Q3', 'Q4'] as Quarter[]).map((q) => {
                      const item = schedules[q][idx];
                      return (
                        <td key={q} className="p-3 border-l border-white/5 align-top">
                          <div className="flex flex-col gap-2">
                            <input
                              type="text"
                              value={item.className}
                              onChange={(e) =>
                                updateSchedule(q, period, 'className', e.target.value)
                              }
                              placeholder="Class Name"
                              className="bg-transparent w-full text-white font-semibold placeholder-white/20 focus:outline-none focus:text-blue-300 text-sm border-b border-white/5 pb-1 focus:border-blue-400/50 transition-colors"
                            />
                            <div className="flex gap-2 text-xs">
                              <div className="flex items-center text-blue-200/70 flex-1 min-w-0">
                                <span className="mr-1">Rm:</span>
                                <input
                                  type="text"
                                  value={item.room}
                                  onChange={(e) =>
                                    updateSchedule(q, period, 'room', e.target.value)
                                  }
                                  className="bg-transparent w-full text-white/70 placeholder-white/10 focus:outline-none"
                                />
                              </div>
                              <div className="flex items-center text-purple-200/70 flex-1 min-w-0">
                                <span className="mr-1">By:</span>
                                <input
                                  type="text"
                                  value={item.teacher}
                                  onChange={(e) =>
                                    updateSchedule(q, period, 'teacher', e.target.value)
                                  }
                                  className="bg-transparent w-full text-white/70 placeholder-white/10 focus:outline-none"
                                />
                              </div>
                            </div>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              onClick={() => copyToAll(activeView)}
              className="flex items-center text-xs text-white/40 hover:text-white transition-colors bg-white/5 px-3 py-1.5 rounded-full border border-white/5 hover:border-white/20 hover:bg-white/10"
            >
              <Copy className="w-3 h-3 mr-1" /> Copy {activeView} to all quarters
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {schedules[activeView].map((item) => (
              <div
                key={item.period}
                className="group relative bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5 transition-all duration-300 hover:shadow-lg hover:border-white/20"
              >
                <div className="absolute -left-3 -top-3 w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg border-2 border-slate-900 z-10">
                  {item.period}
                </div>

                <div className="ml-4 space-y-3">
                  <input
                    type="text"
                    placeholder="Class Name (e.g., AP Biology)"
                    value={item.className}
                    onChange={(e) =>
                      updateSchedule(activeView, item.period, 'className', e.target.value)
                    }
                    className="w-full bg-transparent border-b border-white/20 text-xl font-semibold text-white placeholder-white/30 focus:outline-none focus:border-blue-400 pb-1 transition-colors"
                  />

                  <div className="flex gap-4">
                    <div className="flex items-center text-blue-200 flex-1">
                      <MapPin className="w-4 h-4 mr-2 opacity-70" />
                      <input
                        type="text"
                        placeholder="Room"
                        value={item.room}
                        onChange={(e) =>
                          updateSchedule(activeView, item.period, 'room', e.target.value)
                        }
                        className="w-full bg-transparent border-none text-sm text-white/80 placeholder-white/30 focus:outline-none"
                      />
                    </div>
                    <div className="flex items-center text-purple-200 flex-1">
                      <User className="w-4 h-4 mr-2 opacity-70" />
                      <input
                        type="text"
                        placeholder="Teacher"
                        value={item.teacher}
                        onChange={(e) =>
                          updateSchedule(activeView, item.period, 'teacher', e.target.value)
                        }
                        className="w-full bg-transparent border-none text-sm text-white/80 placeholder-white/30 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleView;