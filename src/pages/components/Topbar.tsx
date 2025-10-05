const Topbar: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-amber-600 via-rose-600 to-violet-600 text-white px-6 py-4 flex items-center justify-between shadow-lg animate-fade-in">
      <h2 className="text-xl font-semibold tracking-wide">Dashboard Overview</h2>
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium">Welcome, SuperAdmin</span>
        <img
          src="/lms.jpeg"
          alt="LMS Logo"
          className="w-9 h-9 rounded-full border-2 border-white hover:scale-105 transition-transform duration-300"
        />    
      </div>
    </header>
  );
};

export default Topbar;