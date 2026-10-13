import React from 'react';
import { Settings } from 'lucide-react';

export const AdminSettingsModule: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
      <div>
        <h3 className="text-lg font-bold text-slate-900">Site & Fee Settings</h3>
        <p className="text-sm text-slate-600">Configure global platform service fees, currency, and site parameters.</p>
      </div>

      <div className="space-y-4 max-w-xl">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Platform Service Fee (%)</label>
          <input type="number" defaultValue={5} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-emerald-600" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Default Currency</label>
          <select className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-emerald-600 bg-white">
            <option>USD ($)</option>
            <option>EUR (€)</option>
            <option>INR (₹)</option>
          </select>
        </div>
        <button className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs cursor-pointer">
          Save Settings
        </button>
      </div>
    </div>
  );
};
