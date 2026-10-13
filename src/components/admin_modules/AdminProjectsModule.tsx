import React from 'react';
import { Briefcase, Shield } from 'lucide-react';

interface AdminProjectsModuleProps {
  allProjects: any[];
}

export const AdminProjectsModule: React.FC<AdminProjectsModuleProps> = ({ allProjects }) => {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Projects & RFP Moderation</h3>
          <p className="text-sm text-slate-600">Review and moderate client project postings and RFPs.</p>
        </div>
        <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold">
          {allProjects.length} Projects
        </span>
      </div>

      <div className="space-y-3">
        {allProjects.map((p) => (
          <div key={p.id} className="p-4 rounded-2xl border border-slate-100 bg-slate-50 flex items-center justify-between">
            <div>
              <h4 className="font-bold text-slate-900">{p.title}</h4>
              <p className="text-xs text-slate-500 mt-0.5">{p.clientName || 'Client'} • Budget: ${p.budget || 'N/A'}</p>
            </div>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-bold">Active</span>
          </div>
        ))}
      </div>
    </div>
  );
};
