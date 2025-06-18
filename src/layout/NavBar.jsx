import { useState, useEffect } from 'react';
import { Menu, Bell, User as UserIcon, Search, Globe, Settings, LogOut, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSearch } from '../context/SearchContext';
import Dropdown from '../components/ui/Dropdown';
import SearchResults from '../components/search/SearchResults';
import useDebounce from '../hooks/useDebounce';

// import { useSearch } from '../context/SearchContext';


function NavBar({ toggleSidebar }) {
  const { user, logout } = useAuth();
  const { searchAll, searchResults, searchLoading, clearResults  } = useSearch();
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);

  const [notifications] = useState([
    { id: 1, message: 'Nouvelle maintenance planifiée', read: false },
    { id: 2, message: 'Rapport mensuel disponible', read: true }
  ]) ;

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const debouncedQuery = useDebounce(searchQuery, 300);
  // const { searchSuggestions } = useSearch();

  useEffect(() => {
  if (debouncedQuery.length > 1) {
    // Simulation d'appel API - À remplacer par votre implémentation réelle
      const mockSuggestions = [
        { id: 1, name: 'Utilisateur Test', type: 'user', detail: 'admin@test.com' },
        { id: 2, name: 'Salle 101', type: 'room', detail: 'Salle de classe' }
      ]
      setSuggestions(mockSuggestions.filter(item => 
        item.name.toLowerCase().includes(debouncedQuery.toLowerCase())
      ))
    } else {
      setSuggestions([])
    }
  }, [debouncedQuery])

  // const handleSelectSuggestion = (text) => {
  //   setSearchQuery(text)
  //   setShowSuggestions(false)
  // }

  const handleSearch = async (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      await searchAll(searchQuery)
      setShowResults(true)
      setShowSuggestions(false)
    }
  }
  const handleClearSearch = () => {
    setSearchQuery('')
    clearResults()
    setShowResults(false)
  }



  return (
    <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">

      {/* Bouton pour ouvrir la sidebar sur mobile */}
      <button type="button" className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary md:hidden" onClick={toggleSidebar}>
        <Menu className="h-6 w-6" />
      </button>

      {/* Zone de recherche */}
      {/* <div className="flex-1 px-4 flex justify-between items-center">*/}
      <div className="flex-1 px-4 flex items-center ">
        <form onSubmit={handleSearch} className="w-full max-w-lg relative">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input type="text" placeholder="Rechercher utilisateurs, locaux, équipements..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              value={searchQuery} 
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setShowSuggestions(e.target.value.length > 1)
              }}
              onFocus={() => setShowSuggestions(searchQuery.length > 1)}
            />

            {searchQuery && (
              <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={handleClearSearch} >
                <X className="h-5 w-5 text-gray-400 hover:text-gray-500" />
              </button>
            )}

            {searchLoading && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
            </div>
            )}
          </div>
            {/* suggestions */}
            {showSuggestions && suggestions.length > 0 && (
            <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50">
              <ul>
                {suggestions.map((item) => (
                  <li key={`${item.type}-${item.id}`}>
                    <button type="button" className="flex items-center w-full p-2 hover:bg-gray-50 text-left" onClick={() => {
                      setSearchQuery(item.name)
                      setShowSuggestions(false)
                      }}
>
                      <div className="flex-shrink-0 mr-3">
                        {item.type === 'user' && <UserIcon className="h-5 w-5 text-primary" />}
                        {item.type === 'room' && <Home className="h-5 w-5 text-secondary" />}
                      </div>
                      <div>
                        <p className="text-sm">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.detail}</p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </form>

        {/* resultats de recherches  */}
          {showResults && searchResults && (
            <>
              <SearchResults />
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setShowResults(false)}
              />
            </>
          )}
      </div>
      
      


      {/* Icônes de droite */}
      <div className="ml-4 flex items-center md:ml-6 space-x-3">

        {/* Bouton langue */}
        <Dropdown buttonContent={<span className="text-sm font-medium">FR</span>}
          items={[
            { label: 'Français', value: 'fr' },
            { label: 'English', value: 'en' },
            { label: 'Español', value: 'es' }
          ]}
          onSelect={(lang) => console.log('Langue sélectionnée:', lang)}
        />

        {/* Bouton notifications */}
        <Dropdown
          buttonContent={
            <div className="relative">
              <Bell className="h-6 w-6 text-gray-400 hover:text-gray-500" />
              {notifications.some(n => !n.read) && (
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-accent"></span>
              )}
            </div>
          }
          items={notifications.map(n => ({
            label: n.message,
            value: n.id,
            className: n.read ? '' : 'font-bold'
          }))}
          onSelect={(id) => console.log('Notification sélectionnée:', id)}
        />

        {/* Bouton paramètres */}
        <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary">
          <Settings className="h-6 w-6" />
        </button>

        {/* Menu profil */}
        <Dropdown
          buttonContent={
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">{user?.name}</span>
              <div className={`h-2 w-2 rounded-full ${
                user?.role === 'super_admin' ? 'bg-accent' : 
                user?.role === 'admin' ? 'bg-secondary' : 'bg-primary'
              }`} />
            </div>
          }
          items={[
            { label: 'Mon profil', value: 'profile', icon: <UserIcon className="h-4 w-4 mr-2" /> },
            { label: 'Paramètres', value: 'settings', icon: <Settings className="h-4 w-4 mr-2" /> },
            { label: 'Déconnexion', value: 'logout', icon: <LogOut className="h-4 w-4 mr-2" /> }
          ]}
          onSelect={(value) => value === 'logout' && logout()}
        />
      </div>
    </div>
  );
};

export default NavBar;
