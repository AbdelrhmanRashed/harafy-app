import Navbar from '@/components/dashboard/Navbar';
import Sidebar from '@/components/dashboard/Sidebar';

const AdminLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Header */}
      <header>
        <Navbar />
      </header>

      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <main className="flex-1 p-4">
        <div className="rounded-lg border p-4">
          <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
          <p className="mt-2">This is the main content area.</p>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
