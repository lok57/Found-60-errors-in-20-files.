import { useState } from 'react';
import { Bell, Mail, MessageSquare, Smartphone } from 'lucide-react';

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  email: boolean;
  sms: boolean;
  push: boolean;
}

const defaultSettings: NotificationSetting[] = [
  {
    id: 'orders',
    title: 'Order Updates',
    description: 'Get notified about your order status and delivery updates',
    email: true,
    sms: true,
    push: true
  },
  {
    id: 'promotions',
    title: 'Promotions & Deals',
    description: 'Receive updates about sales, discounts, and special offers',
    email: true,
    sms: false,
    push: true
  },
  {
    id: 'security',
    title: 'Security Alerts',
    description: 'Important updates about your account security',
    email: true,
    sms: true,
    push: true
  },
  {
    id: 'newsletter',
    title: 'Newsletter',
    description: 'Weekly updates about new products and trends',
    email: true,
    sms: false,
    push: false
  }
];

export default function NotificationSettings() {
  const [settings, setSettings] = useState<NotificationSetting[]>(defaultSettings);

  const handleToggle = (id: string, type: 'email' | 'sms' | 'push') => {
    setSettings(current =>
      current.map(setting =>
        setting.id === id
          ? { ...setting, [type]: !setting[type] }
          : setting
      )
    );
  };

  return (
    <div className="text-white">
      <h2 className="text-2xl font-bold mb-6">Notification Settings</h2>

      <div className="bg-white/10 rounded-xl p-6 mb-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-accent-600 rounded-full flex items-center justify-center">
            <Bell className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">Manage Notifications</h3>
            <p className="text-white/70">Choose how you want to be notified</p>
          </div>
        </div>

        <div className="space-y-6">
          {settings.map(setting => (
            <div key={setting.id} className="pb-6 border-b border-white/10 last:border-0">
              <div className="mb-4">
                <h4 className="font-medium">{setting.title}</h4>
                <p className="text-sm text-white/70">{setting.description}</p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={setting.email}
                      onChange={() => handleToggle(setting.id, 'email')}
                      className="rounded border-white/20 bg-white/10 text-accent-600 focus:ring-accent-500"
                    />
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4" />
                      <span className="text-sm">Email</span>
                    </div>
                  </label>
                </div>

                <div>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={setting.sms}
                      onChange={() => handleToggle(setting.id, 'sms')}
                      className="rounded border-white/20 bg-white/10 text-accent-600 focus:ring-accent-500"
                    />
                    <div className="flex items-center space-x-2">
                      <Smartphone className="w-4 h-4" />
                      <span className="text-sm">SMS</span>
                    </div>
                  </label>
                </div>

                <div>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={setting.push}
                      onChange={() => handleToggle(setting.id, 'push')}
                      className="rounded border-white/20 bg-white/10 text-accent-600 focus:ring-accent-500"
                    />
                    <div className="flex items-center space-x-2">
                      <MessageSquare className="w-4 h-4" />
                      <span className="text-sm">Push</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white/10 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Quiet Hours</h3>
        <p className="text-white/70 mb-4">
          During these hours, you won't receive any notifications except for critical security alerts
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Start Time</label>
            <input
              type="time"
              defaultValue="22:00"
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">End Time</label>
            <input
              type="time"
              defaultValue="07:00"
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20"
            />
          </div>
        </div>
      </div>
    </div>
  );
}