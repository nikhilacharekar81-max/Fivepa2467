import React from 'react';
import { RefreshCw } from 'lucide-react';

export const AdminRefundsModule: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
      <div>
        <h3 className="text-lg font-bold text-slate-900">Refund Requests & Approvals</h3>
        <p className="text-sm text-slate-600">Review refund claims and process automated gateway reversals.</p>
      </div>
      <div className="p-8 text-center text-slate-500 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
        <RefreshCw className="w-12 h-12 mx-auto text-slate-300 mb-2" />
        <p className="font-bold">No pending refund requests.</p>
      </div>
    </div>
  );
};
