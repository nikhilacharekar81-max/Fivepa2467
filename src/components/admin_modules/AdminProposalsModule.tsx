import React from 'react';
import { FileText } from 'lucide-react';

export const AdminProposalsModule: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
      <div>
        <h3 className="text-lg font-bold text-slate-900">Proposals & Bid Audit</h3>
        <p className="text-sm text-slate-600">Audit proposals and freelancer bids across client projects.</p>
      </div>
      <div className="p-8 text-center text-slate-500 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
        <FileText className="w-12 h-12 mx-auto text-slate-300 mb-2" />
        <p className="font-bold">No flagged proposals or suspicious bids.</p>
        <p className="text-xs text-slate-400 mt-1">All proposal submissions meet compliance standards.</p>
      </div>
    </div>
  );
};
