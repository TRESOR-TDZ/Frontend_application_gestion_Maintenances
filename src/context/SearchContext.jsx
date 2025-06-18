import { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

function SearchProvider({ children }) {
  const [searchResults, setSearchResults] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);

  const searchAll = async (query) => {
    if (!query.trim()) {
      setSearchResults(null);
      return
    }

    try {
      setSearchLoading(true);
      setSearchError(null);
      
      // Simulation de requête API - À remplacer par l'appel réel
      console.log('Recherche en cours pour:', query)
      const mockResults = {
        users: [
          { id: 1, name: 'Jean Dupont', email: 'jean@exemple.com', role: 'admin' }
        ],
        rooms: [
          { id: 1, name: 'Salle 101', type: 'Salle de classe' }
        ],
        equipments: [
          { id: 1, name: 'PC-024', category: 'Informatique', status: 'Actif' }
        ]
    }
      
    setSearchResults(mockResults)
    } catch (err) {
      setSearchError(err.message)
      console.error('Erreur de recherche:', err)
    } finally {
      setSearchLoading(false)
    }
}

  const clearResults = () => {
    setSearchResults(null)
    setSearchError(null)
  }

//  implementation avec api reelle
// const searchAll = async (query) => {
//   if (!query.trim()) {
//     setSearchResults(null)
//     return
//   }

//   try {
//     setSearchLoading(true)
//     setSearchError(null)
    
//     const { data } = await api.get(`/search?q=${encodeURIComponent(query)}`)
//     setSearchResults(data)
//   } catch (err) {
//     setSearchError(err.response?.data?.message || 'Erreur lors de la recherche')
//   } finally {
//     setSearchLoading(false)
//   }
// }

  return (
    <SearchContext.Provider
      value={{
        searchResults,
        searchLoading,
        searchError,
        searchAll,
        clearResults
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;

export const useSearch = () => useContext(SearchContext)