import React from 'react';
import { ShoppingBag } from 'lucide-react';

interface AdminGigsModuleProps {
  allGigs: any[];
}

export const AdminGigsModule: React.FC<AdminGigsModuleProps> = ({ allGigs }) => {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Services & Gigs Management</h3>
          <p className="text-sm text-slate-600">Review freelancer gig catalogs and service offerings.</p>
        </div>
        <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-bold">
          {allGigs.length} Gigs
        </span>
      </div>

      <div className="space-y-3">
        {allGigs.map((g) => (
          <div key={g.id} className="p-4 rounded-2xl border border-slate-100 bg-slate-50 flex items-center justify-between">
            <div>
              <h4 className="font-bold text-slate-900">{g.title}</h4>
              <p className="text-xs text-slate-500 mt-0.5">{g.category} • ${g.price}</p>
            </div>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-bold">Approved</span>
          </div>
        ))}
      </div>
    </div>
  );
};
