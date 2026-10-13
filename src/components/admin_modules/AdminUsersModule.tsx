import React from 'react';
import { Users, Shield, UserCheck } from 'lucide-react';

interface AdminUsersModuleProps {
  allUsers: any[];
  onImpersonateUser?: (userId: string) => void;
  onToggleUserStatus?: (userId: string) => void;
}

export const AdminUsersModule: React.FC<AdminUsersModuleProps> = ({
  allUsers,
  onImpersonateUser,
  onToggleUserStatus,
}) => {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900">User Management & Impersonation</h3>
          <p className="text-sm text-slate-600">Manage registered users, freelancers, clients, and role permissions.</p>
        </div>
        <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold">
          {allUsers.length} Total Users
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-400 uppercase text-xs font-bold border-b border-slate-200">
            <tr>
              <th className="py-3 px-4">User</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {allUsers.map((u) => (
              <tr key={u.id} className="hover:bg-slate-50/50">
                <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                    {u.name?.[0] || 'U'}
                  </div>
                  {u.name}
                </td>
                <td className="py-3 px-4 text-slate-600">{u.email}</td>
                <td className="py-3 px-4">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-700">
                    {u.role || 'Freelancer'}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-700">
                    Active
                  </span>
                </td>
                <td className="py-3 px-4 text-right space-x-2">
                  {onImpersonateUser && (
                    <button
                      onClick={() => onImpersonateUser(u.id)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs cursor-pointer"
                    >
                      Impersonate
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
