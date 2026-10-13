import React from 'react';
import { ShoppingBag } from 'lucide-react';

interface AdminOrdersModuleProps {
  allOrders: any[];
}

export const AdminOrdersModule: React.FC<AdminOrdersModuleProps> = ({ allOrders }) => {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900">All Orders Management</h3>
          <p className="text-sm text-slate-600">Track and manage client orders across all categories.</p>
        </div>
        <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-bold">
          {allOrders.length} Orders
        </span>
      </div>

      <div className="space-y-3">
        {allOrders.map((o) => (
          <div key={o.id} className="p-4 rounded-2xl border border-slate-100 bg-slate-50 flex items-center justify-between">
            <div>
              <h4 className="font-bold text-slate-900">Order #{o.id} - {o.gigTitle || o.projectTitle}</h4>
              <p className="text-xs text-slate-500 mt-0.5">Amount: ${o.amount} • Status: {o.status}</p>
            </div>
            <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-xl text-xs font-bold">{o.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
