import React, { useEffect } from 'react';
import { CheckCircle2, X, AlertTriangle, Info } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'warning' | 'info';
  title: string;
  description?: string;
}

interface ToastProps {
  toast: ToastMessage | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm bg-slate-900 text-white rounded-lg shadow-xl border border-slate-800 p-4 flex items-start space-x-3 transition-all animate-in slide-in-from-bottom-5 duration-200">
      {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />}
      {toast.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />}
      {toast.type === 'info' && <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />}
      
      <div className="flex-1 text-sm">
        <h4 className="font-semibold text-slate-100">{toast.title}</h4>
        {toast.description && <p className="text-xs text-slate-300 mt-0.5">{toast.description}</p>}
      </div>

      <button
        onClick={onClose}
        className="text-slate-400 hover:text-white transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
