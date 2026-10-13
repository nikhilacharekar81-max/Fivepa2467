import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface AdminEscrowModuleProps {
  escrowAccounts: any[];
}

export const AdminEscrowModule: React.FC<AdminEscrowModuleProps> = ({ escrowAccounts }) => {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
      <div>
        <h3 className="text-lg font-bold text-slate-900">Escrow Management (Mandatory 14-Day Protection)</h3>
        <p className="text-sm text-slate-600">Manage 14-day mandatory escrow protection holds and release approvals.</p>
      </div>

      <div className="space-y-3">
        {escrowAccounts?.length > 0 ? (
          escrowAccounts.map((e) => (
            <div key={e.id} className="p-4 rounded-2xl border border-slate-100 bg-slate-50 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-900">Escrow #{e.id} - ${e.amount}</h4>
                <p className="text-xs text-slate-500 mt-0.5">Status: {e.status} • Hold Period: 14 Days</p>
              </div>
              <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-xl text-xs font-bold">Secured</span>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-slate-500 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <ShieldCheck className="w-12 h-12 mx-auto text-slate-300 mb-2" />
            <p className="font-bold">No active escrow holds requiring manual intervention.</p>
          </div>
        )}
      </div>
    </div>
  );
};
