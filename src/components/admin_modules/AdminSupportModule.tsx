import React from 'react';
import { HelpCircle } from 'lucide-react';

export const AdminSupportModule: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
      <div>
        <h3 className="text-lg font-bold text-slate-900">Support Ticket Help Desk</h3>
        <p className="text-sm text-slate-600">Manage customer support inquiries and ticket responses.</p>
      </div>
      <div className="p-8 text-center text-slate-500 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
        <HelpCircle className="w-12 h-12 mx-auto text-slate-300 mb-2" />
        <p className="font-bold">All support tickets resolved.</p>
        <p className="text-xs text-slate-400 mt-1">Average response time: &lt; 15 minutes.</p>
      </div>
    </div>
  );
};
