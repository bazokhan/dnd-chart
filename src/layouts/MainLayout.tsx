const MainLayout: React.FC = ({ children }) => (
  <main className="w-screen h-screen bg-gray-800 text-white flex flex-col">
    <nav className="p-4">
      <h1 className="w-full font-black text-2xl text-center">Plotter</h1>
    </nav>
    {children}
  </main>
);

export default MainLayout;
