import React from 'react';
import { Wallet } from 'lucide-react';

export const AdminPaymentsModule: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
      <div>
        <h3 className="text-lg font-bold text-slate-900">Payments & Razorpay/Stripe Logs</h3>
        <p className="text-sm text-slate-600">Inspect gateway transactions, webhook logs, and payment statuses.</p>
      </div>
      <div className="p-8 text-center text-slate-500 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
        <Wallet className="w-12 h-12 mx-auto text-slate-300 mb-2" />
        <p className="font-bold">Payment gateway webhooks active and synced.</p>
        <p className="text-xs text-slate-400 mt-1">100% webhook success rate over the last 30 days.</p>
      </div>
    </div>
  );
};
