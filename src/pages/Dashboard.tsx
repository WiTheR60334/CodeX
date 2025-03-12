
import React from 'react';
import Dashboard from '@/components/dashboard/Dashboard';
import Navbar from '@/components/Navbar';

const DashboardPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <Dashboard />
      </main>
    </div>
  );
};

export default DashboardPage;
