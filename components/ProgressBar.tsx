type ProgressBarProps = {
  currentStep: 1 | 2 | 3;
};

const steps = [
  { step: 1, label: 'Cart' },
  { step: 2, label: 'Shipping' },
  { step: 3, label: 'Payment' }
];

export default function ProgressBar({ currentStep }: ProgressBarProps) {
  return (
    <div className="bg-white py-6 md:py-8">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between">
          {steps.map((item, i) => (
            <div key={item.step} className="flex flex-1 items-center">
              {/* Circle */}
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition ${
                  item.step <= currentStep
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {item.step}
              </div>

              {/* Label */}
              <div className="ml-2 text-sm font-medium text-gray-700 md:ml-3 md:text-base">
                {item.label}
              </div>

              {/* Line */}
              {i < steps.length - 1 && (
                <div
                  className={`mx-2 flex-1 h-1 rounded transition md:mx-4 ${
                    item.step < currentStep ? 'bg-emerald-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
