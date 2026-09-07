import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LoginPage } from './components/auth/LoginPage';
import { AdminLayout } from './components/layout/AdminLayout';
import { NavTab } from './components/layout/Sidebar';
import { DashboardView } from './components/dashboard/DashboardView';
import { StudentsView } from './components/students/StudentsView';
import { TeachersView } from './components/teachers/TeachersView';
import { BatchesView } from './components/batches/BatchesView';
import { AssignmentsView } from './components/assignments/AssignmentsView';
import { AttendanceView } from './components/attendance/AttendanceView';
import { ReportsView } from './components/reports/ReportsView';
import { SettingsView } from './components/settings/SettingsView';
import { Shield } from 'lucide-react';

const AdminPortalContent: React.FC = () => {
  const { user, loading } = useAuth();
  const [currentTab, setCurrentTab] = useState<NavTab>('dashboard');
  const [refreshKey, setRefreshKey] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setRefreshKey(prev => prev + 1);
    setTimeout(() => setIsRefreshing(false), 600);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4">
        <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center mb-4">
          <Shield className="w-6 h-6 text-indigo-400 animate-pulse" />
        </div>
        <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mb-3" />
        <h2 className="text-sm font-bold text-white tracking-tight">AIM Tutorials</h2>
        <p className="text-xs text-slate-400">Loading Admin Portal...</p>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  return (
    <AdminLayout
      currentTab={currentTab}
      onSelectTab={setCurrentTab}
      onRefreshData={handleRefresh}
      isRefreshing={isRefreshing}
    >
      <div key={refreshKey}>
        {currentTab === 'dashboard' && <DashboardView onNavigate={setCurrentTab} />}
        {currentTab === 'students' && <StudentsView />}
        {currentTab === 'teachers' && <TeachersView />}
        {currentTab === 'batches' && <BatchesView />}
        {currentTab === 'assignments' && <AssignmentsView />}
        {currentTab === 'attendance' && <AttendanceView />}
        {currentTab === 'reports' && <ReportsView />}
        {currentTab === 'settings' && <SettingsView />}
      </div>
    </AdminLayout>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AdminPortalContent />
    </AuthProvider>
  );
}
