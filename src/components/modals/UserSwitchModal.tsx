import React from 'react';
import { Users, CheckCircle } from 'lucide-react';
import { UserAccount } from '../../types';

interface UserSwitchModalProps {
  isOpen: boolean;
  onClose: () => void;
  usersList: UserAccount[];
  currentUser: UserAccount | null;
  impersonatedUser: UserAccount | null;
  onSelectUser: (user: UserAccount) => void;
}

export const UserSwitchModal: React.FC<UserSwitchModalProps> = ({
  isOpen,
  onClose,
  usersList,
  currentUser,
  impersonatedUser,
  onSelectUser
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl border border-slate-200">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-fiverr-dark flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-600" />
              <span>Switch User Account</span>
            </h3>
            <p className="text-xs text-fiverr-muted mt-0.5">Instantly switch between registered users, freelancers, clients, and administrators.</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-fiverr-dark hover:bg-slate-100 rounded-xl transition-colors text-xs font-bold cursor-pointer"
          >
            ✕ Close
          </button>
        </div>

        <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
          {usersList.map((u) => {
            const isActive = (impersonatedUser ? impersonatedUser.id : (currentUser ? currentUser.id : '')) === u.id;
            return (
              <div 
                key={u.id}
                onClick={() => {
                  console.log('Switching user:', u.name);
                  onSelectUser(u);
                }}
                className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer ${isActive ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-fiverr-dark'}`}
              >
                <div className="flex items-center gap-3">
                  <img src={u.avatar} className="w-10 h-10 rounded-full object-cover border border-slate-300" alt={u.name} />
                  <div>
                    <span className="font-bold text-xs block">{u.name}</span>
                    <span className={`text-[11px] ${isActive ? 'text-slate-300' : 'text-fiverr-muted'}`}>{u.email} · <span className="uppercase font-mono">{u.role}</span></span>
                  </div>
                </div>
                {isActive && (
                  <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Active
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
