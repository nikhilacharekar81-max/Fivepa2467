import React from 'react';
import { Activity } from 'lucide-react';

export const AdminActivityModule: React.FC = () => {
  const auditLogs = [
    { id: '1', action: 'Admin login detected', admin: 'Super Admin', time: '10 mins ago', ip: '192.168.1.1' },
    { id: '2', action: 'Platform fee updated to 5%', admin: 'Super Admin', time: '2 hours ago', ip: '192.168.1.1' },
    { id: '3', action: 'New category created: AI & ML', admin: 'Super Admin', time: '1 day ago', ip: '192.168.1.1' },
  ];

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
      <div>
        <h3 className="text-lg font-bold text-slate-900">Admin Activity Logs & Security Audit Trail</h3>
        <p className="text-sm text-slate-600">Track administrative actions, security events, and audit logs.</p>
      </div>

      <div className="space-y-3">
        {auditLogs.map((log) => (
          <div key={log.id} className="p-4 rounded-2xl border border-slate-100 bg-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">{log.action}</h4>
                <p className="text-xs text-slate-500 mt-0.5">{log.admin} • IP: {log.ip}</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-slate-400">{log.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
