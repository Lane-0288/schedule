import React, { useState, useMemo } from 'react';
import { Course, Grade } from '../types';
import { Plus, Trash2, Calculator, TrendingUp } from 'lucide-react';

const GRADE_POINTS: Record<Grade, number> = {
  [Grade.A]: 4.0,
  [Grade.B]: 3.0,
  [Grade.C]: 2.0,
  [Grade.D]: 1.0,
  [Grade.F]: 0.0,
};

const GPACalculator: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([
    { id: '1', name: 'Math', grade: Grade.A, credits: 1.0, isAP: false },
    { id: '2', name: 'History', grade: Grade.B, credits: 1.0, isAP: true },
  ]);

  const addCourse = () => {
    const newCourse: Course = {
      id: Math.random().toString(36).substr(2, 9),
      name: '',
      grade: Grade.A,
      credits: 1.0,
      isAP: false,
    };
    setCourses([...courses, newCourse]);
  };

  const removeCourse = (id: string) => {
    setCourses(courses.filter((c) => c.id !== id));
  };

  const updateCourse = (id: string, field: keyof Course, value: any) => {
    setCourses(courses.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  };

  const { weightedGPA, unweightedGPA, totalCredits } = useMemo(() => {
    let totalPointsWeighted = 0;
    let totalPointsUnweighted = 0;
    let totalCreds = 0;

    courses.forEach((course) => {
      const basePoints = GRADE_POINTS[course.grade];
      // AP Bump: +1.0 for passing grades (A-D) usually. 
      // Assuming scale: A=5, B=4, C=3, D=2, F=0 for AP.
      const weightedPoints = course.isAP && basePoints > 0 ? basePoints + 1 : basePoints;

      totalPointsWeighted += weightedPoints * course.credits;
      totalPointsUnweighted += basePoints * course.credits;
      totalCreds += course.credits;
    });

    return {
      weightedGPA: totalCreds ? (totalPointsWeighted / totalCreds).toFixed(3) : '0.000',
      unweightedGPA: totalCreds ? (totalPointsUnweighted / totalCreds).toFixed(3) : '0.000',
      totalCredits: totalCreds,
    };
  }, [courses]);

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-400/20 to-emerald-600/20 backdrop-blur-md border border-emerald-500/30 rounded-2xl p-6 text-center">
          <div className="text-emerald-200 text-sm font-medium uppercase tracking-wider mb-1">Weighted GPA</div>
          <div className="text-5xl font-bold text-white shadow-emerald-500/50 drop-shadow-lg">{weightedGPA}</div>
        </div>
        <div className="bg-gradient-to-br from-blue-400/20 to-indigo-600/20 backdrop-blur-md border border-blue-500/30 rounded-2xl p-6 text-center">
          <div className="text-blue-200 text-sm font-medium uppercase tracking-wider mb-1">Unweighted GPA</div>
          <div className="text-5xl font-bold text-white shadow-blue-500/50 drop-shadow-lg">{unweightedGPA}</div>
        </div>
        <div className="bg-gradient-to-br from-purple-400/20 to-pink-600/20 backdrop-blur-md border border-purple-500/30 rounded-2xl p-6 text-center">
          <div className="text-purple-200 text-sm font-medium uppercase tracking-wider mb-1">Total Credits</div>
          <div className="text-5xl font-bold text-white shadow-purple-500/50 drop-shadow-lg">{totalCredits}</div>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <h3 className="text-xl font-semibold text-white flex items-center">
            <Calculator className="mr-2 w-5 h-5 text-yellow-400" />
            Course Grades
          </h3>
          <button
            onClick={addCourse}
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center transition-all shadow-lg shadow-blue-500/30"
          >
            <Plus className="w-4 h-4 mr-1" /> Add Class
          </button>
        </div>

        <div className="p-0">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5 text-white/60 text-sm uppercase tracking-wider">
                <th className="p-4 font-medium">Course Name</th>
                <th className="p-4 font-medium w-32">Grade</th>
                <th className="p-4 font-medium w-32">Credits</th>
                <th className="p-4 font-medium w-24 text-center">AP?</th>
                <th className="p-4 w-16"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {courses.map((course) => (
                <tr key={course.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <input
                      type="text"
                      placeholder="Course Name"
                      value={course.name}
                      onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                      className="w-full bg-transparent text-white placeholder-white/20 focus:outline-none focus:text-blue-300"
                    />
                  </td>
                  <td className="p-4">
                    <select
                      value={course.grade}
                      onChange={(e) => updateCourse(course.id, 'grade', e.target.value as Grade)}
                      className="w-full bg-slate-800/80 border border-white/20 rounded-lg text-white p-2 focus:outline-none focus:border-blue-500"
                    >
                      {Object.keys(Grade).map((g) => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                  </td>
                  <td className="p-4">
                    <select
                      value={course.credits}
                      onChange={(e) => updateCourse(course.id, 'credits', parseFloat(e.target.value))}
                      className="w-full bg-slate-800/80 border border-white/20 rounded-lg text-white p-2 focus:outline-none focus:border-blue-500"
                    >
                      <option value={1.0}>1.0</option>
                      <option value={0.5}>0.5</option>
                      <option value={0.25}>0.25</option>
                    </select>
                  </td>
                  <td className="p-4 text-center">
                    <input
                      type="checkbox"
                      checked={course.isAP}
                      onChange={(e) => updateCourse(course.id, 'isAP', e.target.checked)}
                      className="w-5 h-5 rounded border-white/30 text-blue-500 focus:ring-blue-500 bg-slate-800/50 cursor-pointer"
                    />
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => removeCourse(course.id)}
                      className="text-white/40 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
              {courses.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-white/40">
                    No courses added yet. Click "Add Class" to start.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GPACalculator;
