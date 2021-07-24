import { useUIState } from '../../hooks/useUiState';

const navItems = [
  { label: 'React', isActive: false },
  { label: 'Dobry kod', isActive: false },
  { label: 'Opinie', isActive: true },
  { label: 'O mnie', isActive: false },
];

export const MainNav = () => {
  const { uiState } = useUIState();

  return (
    <nav
      className={`${
        uiState.isMenuOpen ? 'translate-x-0' : 'translate-x-full'
      } left-0 top-0 z-40 transform-gpu lg:transform-none lg:flex lg:bg-transparent lg:static lg:w-auto lg:h-auto fixed w-full h-screen transition-transform bg-gray-100 flex lg:flex-1 lg:items-stretch`}
    >
      <ul className="flex flex-1 flex-col gap-8 items-center justify-center -mt-16 text-3xl lg:flex-row lg:gap-0 lg:items-stretch lg:justify-around lg:mt-0 lg:text-base">
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
