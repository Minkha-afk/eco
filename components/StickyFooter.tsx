import { ReactNode } from 'react';

type StickyFooterProps = {
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  backLabel?: string;
  nextDisabled?: boolean;
  children?: ReactNode;
};

export default function StickyFooter({
  onBack,
  onNext,
  nextLabel = 'Continue',
  backLabel = 'Back',
  nextDisabled = false,
  children
}: StickyFooterProps) {
  return (
    <>
      {/* Spacer to prevent content overlap when sticky footer is fixed */}
      <div className="h-[120px] md:h-[100px]" />

      {/* Sticky footer */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white shadow-lg">
        <div className="mx-auto max-w-6xl px-4 py-4 md:py-5">
          {children ? (
            children
          ) : (
            <div className="flex flex-col gap-3 sm:flex-row">
              {onBack && (
                <button
                  onClick={onBack}
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 font-medium text-gray-700 transition hover:bg-gray-50 md:flex-none md:px-6"
                >
                  {backLabel}
                </button>
              )}
              {onNext && (
                <button
                  onClick={onNext}
                  disabled={nextDisabled}
                  className="flex-1 rounded-lg bg-emerald-600 px-4 py-2.5 font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60 md:flex-none md:px-6"
                >
                  {nextLabel}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
