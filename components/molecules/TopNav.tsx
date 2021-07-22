const navItems = [
  { label: 'React', isActive: false },
  { label: 'Dobry kod', isActive: false },
  { label: 'Opinie', isActive: true },
  { label: 'O mnie', isActive: false },
];

export const TopNav = () => {
  return (
    <nav className="hidden lg:flex lg:flex-1 lg:items-stretch">
      <ul className="flex flex-1 flex-row justify-around">
        {navItems.map((item) => {
          return (
            <li key={item.label} className="flex items-stretch">
              <a
                className={`inline-flex items-center transition-colors ${
                  item.isActive
                    ? 'text-green-500 font-semibold border-b-2 border-green-500 hover:border-green-700 hover:text-green-700'
                    : 'text-gray-800 hover:text-green-500 border-b-2 border-transparent hover:border-green-500'
                }`}
                href="#"
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
