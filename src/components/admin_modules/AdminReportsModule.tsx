import React from 'react';
import { Shield } from 'lucide-react';

export const AdminReportsModule: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
      <div>
        <h3 className="text-lg font-bold text-slate-900">Flagged Reports & Cases</h3>
        <p className="text-sm text-slate-600">Review user reports regarding inappropriate content or behavior.</p>
      </div>
      <div className="p-8 text-center text-slate-500 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
        <Shield className="w-12 h-12 mx-auto text-slate-300 mb-2" />
        <p className="font-bold">No unresolved flagged reports.</p>
      </div>
    </div>
  );
};
