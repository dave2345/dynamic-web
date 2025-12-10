import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * StylishNotificationToast
 * A compact, modern success / error notification component using TailwindCSS + Framer Motion.
 * Default export is the React component.
 *
 * Props:
 * - type: 'success' | 'error' (default: 'success')
 * - title: string (optional)
 * - message: string (required)
 * - autoDismiss: boolean (default: true)
 * - duration: number in ms (default: 4000)
 * - action: { label: string, onClick: () => void } (optional)
 * - onClose: () => void (optional)
 *
 * Usage:
 * <StylishNotificationToast
 *   type="success"
 *   title="Saved"
 *   message="Your changes were saved successfully."
 *   autoDismiss={true}
 *   duration={3500}
 *   action={{ label: 'Undo', onClick: () => console.log('undo') }}
 *   onClose={() => setShow(false)}
 * />
 */

const ICONS = {
  success: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" aria-hidden className="w-6 h-6">
      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  error: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" aria-hidden className="w-6 h-6">
      <path d="M12 9v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

export function SuccessToast(props) {
  return <StylishNotificationToast type="success" {...props} />;
}

export function ErrorToast(props) {
  return <StylishNotificationToast type="error" {...props} />;
}

export default function StylishNotificationToast({
  type = 'success',
  title = null,
  message,
  autoDismiss = true,
  duration = 4000,
  action = null,
  onClose = () => {},
}) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!autoDismiss) return;
    const t = setTimeout(() => handleClose(), duration);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoDismiss, duration]);

  function handleClose() {
    setIsVisible(false);
    // ensure parent can react after animation
    setTimeout(() => onClose && onClose(), 300);
  }

  const bg = type === 'success' ? 'bg-emerald-50' : 'bg-rose-50';
  const border = type === 'success' ? 'border-emerald-100' : 'border-rose-100';
  const text = type === 'success' ? 'text-emerald-800' : 'text-rose-800';
  const accent = type === 'success' ? 'text-emerald-500' : 'text-rose-500';

  return (
    <div aria-live="polite" className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:items-start sm:p-6 z-[9999]">
      <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={{ opacity: 0, translateY: 20, scale: 0.98 }}
              animate={{ opacity: 1, translateY: 0, scale: 1 }}
              exit={{ opacity: 0, translateY: 20, scale: 0.98 }}
              transition={{ duration: 0.22 }}
              className={`pointer-events-auto max-w-sm w-full ${bg} ${border} border rounded-2xl shadow-lg overflow-hidden`}
              role="status"
            >
              <div className="p-4 flex gap-3">
                <div className={`flex-shrink-0 rounded-lg p-2 ${type === 'success' ? 'bg-emerald-100' : 'bg-rose-100'}`}>
                  <span className={`${accent} inline-flex`}>{ICONS[type]}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className={`flex items-start justify-between gap-4`}>
                    <div className="flex-1">
                      {title && <div className={`font-semibold ${text} truncate`}>{title}</div>}
                      <div className={`mt-1 text-sm ${text}`}>{message}</div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      {action && (
                        <button
                          onClick={() => action.onClick && action.onClick()}
                          className="inline-flex items-center px-3 py-1.5 text-sm rounded-md border border-transparent bg-white bg-opacity-60 backdrop-blur hover:bg-opacity-80 transition"
                        >
                          {action.label}
                        </button>
                      )}

                      <button
                        aria-label="Dismiss notification"
                        onClick={handleClose}
                        className="-mr-2 p-1 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${text}`} viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-1 w-full">
                <motion.div
                  initial={{ width: '100%' }}
                  animate={{ width: '0%' }}
                  transition={{ duration: autoDismiss ? duration / 1000 : 0, ease: 'linear' }}
                  className={type === 'success' ? 'h-1 bg-emerald-400' : 'h-1 bg-rose-400'}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
