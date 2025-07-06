export default function Footer() {
  return (
    <footer className="bg-green-300 p-4 flex flex-col md:flex-row justify-between items-center">
      <div className="mb-2 md:mb-0">
        <span className="font-bold">Lily App</span> &copy; 2025
      </div>
      <nav className="flex space-x-4">
        <a href="#" className="hover:underline">About</a>
        <a href="#" className="hover:underline">Contact</a>
        <a href="#" className="hover:underline">Privacy Policy</a>
      </nav>
      <div className="text-sm text-gray-700 mt-2 md:mt-0">
        Email: info@lilyapp.com
      </div>
    </footer>
  );
}