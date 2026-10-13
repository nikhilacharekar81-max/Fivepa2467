import React from 'react';
import { DollarSign } from 'lucide-react';

export const AdminPayoutsModule: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
      <div>
        <h3 className="text-lg font-bold text-slate-900">Freelancer Payouts & Disbursements</h3>
        <p className="text-sm text-slate-600">Approve and track freelancer earnings withdrawals and bank payouts.</p>
      </div>
      <div className="p-8 text-center text-slate-500 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
        <DollarSign className="w-12 h-12 mx-auto text-slate-300 mb-2" />
        <p className="font-bold">All scheduled payouts successfully disbursed.</p>
      </div>
    </div>
  );
};
