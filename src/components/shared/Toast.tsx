/**
 * Toast Notification System
 * Provider and hook for displaying toast messages
 */

'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

interface ToastContextValue {
  showToast: (type: ToastType, message: string, duration?: number) => void;
  hideToast: (id: string) => void;
  toasts: Toast[];
}

const ToastContext = createContext<ToastContextValue | null>(null);

/**
 * Hook to access toast functions
 */
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}

/**
 * Toast Provider Component
 */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback(
    (type: ToastType, message: string, duration: number = 4000) => {
      const id = Math.random().toString(36).substring(7);
      const toast: Toast = { id, type, message, duration };

      setToasts((prev) => [...prev, toast]);

      // Auto-remove after duration
      if (duration > 0) {
        setTimeout(() => {
          hideToast(id);
        }, duration);
      }
    },
    []
  );

  const hideToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, hideToast, toasts }}>
      {children}
      <ToastContainer toasts={toasts} onHide={hideToast} />
    </ToastContext.Provider>
  );
}

/**
 * Toast Container - Renders all active toasts
 */
function ToastContainer({
  toasts,
  onHide,
}: {
  toasts: Toast[];
  onHide: (id: string) => void;
}) {
  if (toasts.length === 0) return null;

  return (
    <div className="toast toast-end z-50">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onHide={onHide} />
      ))}
    </div>
  );
}

/**
 * Individual Toast Item
 */
function ToastItem({
  toast,
  onHide,
}: {
  toast: Toast;
  onHide: (id: string) => void;
}) {
  const alertClass = {
    success: 'alert-success',
    error: 'alert-error',
    info: 'alert-info',
    warning: 'alert-warning',
  }[toast.type];

  const icon = {
    success: '✓',
    error: '✕',
    info: 'ℹ',
    warning: '⚠',
  }[toast.type];

  return (
    <div className={`alert ${alertClass} shadow-lg`}>
      <div className="flex items-center gap-2 flex-1">
        <span className="text-lg">{icon}</span>
        <span>{toast.message}</span>
      </div>
      <button
        className="btn btn-sm btn-ghost btn-circle"
        onClick={() => onHide(toast.id)}
      >
        ✕
      </button>
    </div>
  );
}

/**
 * Convenience hooks for specific toast types
 */
export function useSuccessToast() {
  const { showToast } = useToast();
  return useCallback(
    (message: string, duration?: number) => showToast('success', message, duration),
    [showToast]
  );
}

export function useErrorToast() {
  const { showToast } = useToast();
  return useCallback(
    (message: string, duration?: number) => showToast('error', message, duration),
    [showToast]
  );
}

export function useInfoToast() {
  const { showToast } = useToast();
  return useCallback(
    (message: string, duration?: number) => showToast('info', message, duration),
    [showToast]
  );
}

export function useWarningToast() {
  const { showToast } = useToast();
  return useCallback(
    (message: string, duration?: number) => showToast('warning', message, duration),
    [showToast]
  );
}
