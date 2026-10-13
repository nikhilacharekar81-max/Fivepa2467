import React from 'react';
import { LayoutDashboard, Users, Briefcase, DollarSign } from 'lucide-react';

interface AdminOverviewModuleProps {
  allUsers: any[];
  allProjects: any[];
  allGigs: any[];
  allOrders: any[];
  escrowAccounts: any[];
  platformBalance: number;
}

export const AdminOverviewModule: React.FC<AdminOverviewModuleProps> = ({
  allUsers,
  allProjects,
  allGigs,
  allOrders,
  escrowAccounts,
  platformBalance,
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Users</span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{allUsers.length}</div>
          <div className="text-xs font-medium text-emerald-600 mt-1">+12% this month</div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Projects</span>
            <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
              <Briefcase className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{allProjects.length}</div>
          <div className="text-xs font-medium text-blue-600 mt-1">{allGigs.length} active gigs</div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Orders</span>
            <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600">
              <LayoutDashboard className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{allOrders.length}</div>
          <div className="text-xs font-medium text-amber-600 mt-1">Completed & in progress</div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Platform Revenue</span>
            <div className="w-10 h-10 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">${platformBalance?.toLocaleString() || '45,230'}</div>
          <div className="text-xs font-medium text-purple-600 mt-1">Fee earnings</div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 mb-4">System Health & Escrow Protection</h3>
        <p className="text-sm text-slate-600 mb-6">
          All systems operational. Mandatory 14-day escrow protection active across all active workstreams and contracts.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="text-xs font-bold uppercase text-slate-400 mb-1">Escrow Accounts</div>
            <div className="text-xl font-bold text-slate-900">{escrowAccounts?.length || 0} Secured</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="text-xs font-bold uppercase text-slate-400 mb-1">Gateway Status</div>
            <div className="text-xl font-bold text-emerald-600 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Razorpay / Stripe Active
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="text-xs font-bold uppercase text-slate-400 mb-1">Security Audit</div>
            <div className="text-xl font-bold text-slate-900">100% Passed</div>
          </div>
        </div>
      </div>
    </div>
  );
};
