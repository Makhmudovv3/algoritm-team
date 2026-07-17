import React, { useState, Suspense } from 'react';
import { SettingsHeader } from './components/SettingsHeader';
import { SettingsSidebar } from './components/SettingsSidebar';

import { GeneralTab } from './components/tabs/GeneralTab';
import { ProfileTab } from './components/tabs/ProfileTab';
import { PermissionsTab } from './components/tabs/PermissionsTab';
import { NotificationsTab } from './components/tabs/NotificationsTab';
import { AppearanceTab } from './components/tabs/AppearanceTab';
import { SecurityTab } from './components/tabs/SecurityTab';

// Eager load inner admin modules or lazy load them? We'll lazy load to keep bundle small
const UsersPage = React.lazy(() => import('../Users'));
const RolesPage = React.lazy(() => import('../Roles'));
const BranchesPage = React.lazy(() => import('../Branches'));

export default function Settings() {
  const [activeTab, setActiveTab] = useState('general');

  const renderContent = () => {
    switch (activeTab) {
      case 'general': return <GeneralTab />;
      case 'users': return <Suspense fallback={<div className="p-8 flex justify-center"><div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div></div>}><UsersPage /></Suspense>;
      case 'roles': return <Suspense fallback={<div className="p-8 flex justify-center"><div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div></div>}><RolesPage /></Suspense>;
      case 'permissions': return <PermissionsTab />;
      case 'branches': return <Suspense fallback={<div className="p-8 flex justify-center"><div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div></div>}><BranchesPage /></Suspense>;
      case 'profile': return <ProfileTab />;
      case 'notifications': return <NotificationsTab />;
      case 'appearance': return <AppearanceTab />;
      case 'security': return <SecurityTab />;
      default: return <GeneralTab />;
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto pb-12 animate-in fade-in duration-300">
      <SettingsHeader />
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-64 flex-shrink-0">
          <SettingsSidebar activeTab={activeTab} onChange={setActiveTab} />
        </div>
        <div className="flex-1 min-w-0">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
