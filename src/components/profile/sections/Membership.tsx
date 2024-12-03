import { Crown, Check } from 'lucide-react';

export default function Membership() {
  return (
    <div className="text-white">
      <h2 className="text-2xl font-bold mb-6">Prime Membership</h2>

      <div className="bg-white/10 rounded-xl p-6 mb-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-accent-600 rounded-full flex items-center justify-center">
            <Crown className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">Premium Member</h3>
            <p className="text-white/70">Valid until Dec 31, 2024</p>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center space-x-3">
            <Check className="w-5 h-5 text-accent-400" />
            <span>Free 2-day shipping on eligible items</span>
          </div>
          <div className="flex items-center space-x-3">
            <Check className="w-5 h-5 text-accent-400" />
            <span>Access to exclusive deals and discounts</span>
          </div>
          <div className="flex items-center space-x-3">
            <Check className="w-5 h-5 text-accent-400" />
            <span>Priority customer support</span>
          </div>
          <div className="flex items-center space-x-3">
            <Check className="w-5 h-5 text-accent-400" />
            <span>Early access to new products</span>
          </div>
        </div>

        <button className="w-full px-6 py-3 bg-accent-600 rounded-lg hover:bg-accent-700">
          Renew Membership
        </button>
      </div>

      <div className="bg-white/10 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Membership History</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-4 border-b border-white/10">
            <div>
              <p className="font-medium">Annual Membership</p>
              <p className="text-sm text-white/70">Jan 1, 2023 - Dec 31, 2023</p>
            </div>
            <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">
              Completed
            </span>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Annual Membership</p>
              <p className="text-sm text-white/70">Jan 1, 2024 - Dec 31, 2024</p>
            </div>
            <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
              Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}