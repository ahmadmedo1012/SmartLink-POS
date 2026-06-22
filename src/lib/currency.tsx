'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type CurrencyCode = 'LYD' | 'USD' | 'EUR' | 'TND';

export interface CurrencyInfo {
  code: CurrencyCode;
  symbol: string;
  name: string;
  flag?: string;
  rate: number; // 1 LYD = rate of this currency
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

export const CURRENCIES: Record<CurrencyCode, CurrencyInfo> = {
  LYD: { code: 'LYD', symbol: 'ل.د', name: 'Libyan Dinar', flag: '🇱🇾', rate: 1 },
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', flag: '🇺🇸', rate: 0.21 },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', flag: '🇪🇺', rate: 0.19 },
  TND: { code: 'TND', symbol: 'د.ت', name: 'Tunisian Dinar', flag: '🇹🇳', rate: 0.61 },
};

export const DEFAULT_CURRENCY: CurrencyCode = 'LYD';

const STORAGE_KEY = 'pos-currency-preference';

// ---------------------------------------------------------------------------
// Format helper (no hook needed)
// ---------------------------------------------------------------------------

/**
 * Format an amount stored in the base currency (LYD) into the target
 * currency's localized display string.
 *
 * When `currency` is omitted the result is plain LYD formatting.
 * Use this outside React components (e.g. server-side or plain utility).
 */
export function formatCurrency(
  amount: number,
  currency?: CurrencyCode,
): string {
  const target = currency ?? DEFAULT_CURRENCY;
  const info = CURRENCIES[target];
  const converted = amount * info.rate;

  return new Intl.NumberFormat(target === 'LYD' ? 'ar-LY' : 'en-US', {
    style: 'currency',
    currency: target,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(converted);
}

// ---------------------------------------------------------------------------
// React Context
// ---------------------------------------------------------------------------

interface CurrencyContextValue {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  formatCurrency: (amount: number, currencyOverride?: CurrencyCode) => string;
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>(DEFAULT_CURRENCY);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && (stored in CURRENCIES)) {
        setCurrencyState(stored as CurrencyCode);
      }
    } catch {
      // localStorage not available — use default
    }
    setHydrated(true);
  }, []);

  const setCurrency = useCallback((code: CurrencyCode) => {
    setCurrencyState(code);
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      // Storage unavailable — ignore
    }
  }, []);

  const fmt = useCallback(
    (amount: number, currencyOverride?: CurrencyCode): string => {
      const target = currencyOverride ?? currency;
      const info = CURRENCIES[target];
      const converted = amount * info.rate;

      return new Intl.NumberFormat(target === 'LYD' ? 'ar-LY' : 'en-US', {
        style: 'currency',
        currency: target,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(converted);
    },
    [currency],
  );

  // Prevent hydration mismatch: render children only after we've read localStorage
  if (!hydrated) {
    return <>{children}</>;
  }

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatCurrency: fmt }}>
      {children}
    </CurrencyContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useCurrency(): CurrencyContextValue {
  const ctx = useContext(CurrencyContext);
  if (!ctx) {
    throw new Error('useCurrency must be used within a <CurrencyProvider>');
  }
  return ctx;
}
