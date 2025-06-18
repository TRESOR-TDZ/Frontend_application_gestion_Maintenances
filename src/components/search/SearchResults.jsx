import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, Home, HardDrive } from 'lucide-react';
import { useSearch } from '../../context/SearchContext';

function SearchResults() {
  const { searchResults, searchError } = useSearch();

  if (searchError) return (
    <div className="p-4 text-red-500 bg-red-50 rounded-lg">
      {searchError}
    </div>
  )

  if (!searchResults) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="absolute left-0 right-0 mt-2 bg-white rounded-md shadow-lg z-50"
    >
      <div className="p-4">
        {Object.entries(searchResults).map(([category, items]) => (
          <div key={category} className="mb-4 last:mb-0">
            <h3 className="text-sm font-medium text-gray-500 mb-2 capitalize">
              {category} ({items.length})
            </h3>
            <ul className="space-y-2">
              {items.map((item) => (
                <li key={item.id}>
                  <Link
                    to={`/${category}/${item.id}`}
                    className="flex items-center p-2 hover:bg-gray-50 rounded-md"
                  >
                    <div className="flex-shrink-0 mr-3">
                      {category === 'users' && <Users className="h-5 w-5 text-primary" />}
                      {category === 'rooms' && <Home className="h-5 w-5 text-secondary" />}
                      {category === 'equipments' && <HardDrive className="h-5 w-5 text-accent" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-gray-500">
                        {item.email || item.type || item.category}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default SearchResults;