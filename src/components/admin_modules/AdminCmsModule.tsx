import React from 'react';
import { FileText } from 'lucide-react';

export const AdminCmsModule: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
      <div>
        <h3 className="text-lg font-bold text-slate-900">CMS Pages & Legal Policies</h3>
        <p className="text-sm text-slate-600">Manage terms of service, privacy policy, and landing page content.</p>
      </div>
      <div className="space-y-3">
        <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50 flex items-center justify-between">
          <div>
            <h4 className="font-bold text-slate-900">Terms of Service</h4>
            <p className="text-xs text-slate-500 mt-0.5">Last updated: Oct 2026</p>
          </div>
          <button className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs cursor-pointer">Edit</button>
        </div>
        <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50 flex items-center justify-between">
          <div>
            <h4 className="font-bold text-slate-900">Privacy Policy</h4>
            <p className="text-xs text-slate-500 mt-0.5">Last updated: Oct 2026</p>
          </div>
          <button className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs cursor-pointer">Edit</button>
        </div>
      </div>
    </div>
  );
};
