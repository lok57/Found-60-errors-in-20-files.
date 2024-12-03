import { CheckCircle } from 'lucide-react';

interface CheckoutProgressProps {
  currentStep: 'address' | 'payment' | 'review' | 'confirm';
}

const steps = [
  { id: 'address', label: 'Address' },
  { id: 'payment', label: 'Payment' },
  { id: 'review', label: 'Review' },
  { id: 'confirm', label: 'Confirm' }
];

export default function CheckoutProgress({ currentStep }: CheckoutProgressProps) {
  const getCurrentStepIndex = () => steps.findIndex(step => step.id === currentStep);

  return (
    <div className="relative">
      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 dark:bg-gray-700 -translate-y-1/2" />
      
      <div className="relative flex justify-between">
        {steps.map((step, index) => {
          const currentIndex = getCurrentStepIndex();
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <div
              key={step.id}
              className={`flex flex-col items-center ${
                isCompleted || isCurrent ? 'text-accent-600' : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isCompleted
                      ? 'bg-accent-600 text-white'
                      : isCurrent
                      ? 'bg-white dark:bg-gray-800 border-2 border-accent-600'
                      : 'bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
              </div>
              <span className="mt-2 text-sm font-medium">{step.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}