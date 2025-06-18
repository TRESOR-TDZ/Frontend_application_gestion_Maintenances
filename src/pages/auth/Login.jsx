import { useState } from 'react';
import { Lock, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import Logo from '../../components/ui/Logo';
import { NavLink } from 'react-router-dom';


function Login() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  })
  const { login, error, loading } = useAuth()

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      await login(credentials)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-primary">
      <div className='flex items-center justify-center flex-grow w-full'>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full  max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
          <div className="text-center">
            {/* LOGO AJOUTÉ ICI  */}
            <Logo className="mx-auto h-24 w-auto mb-4 text-primary" />

            <h2 className="text-3xl font-bold text-primary">Connexion</h2>
          </div>

          {error && (
            <div className="p-4 text-sm text-accent bg-red-50 rounded-lg">
              {error}
            </div>
          )}

          <form className="mt-8 space-y-6 w-full" onSubmit={handleSubmit}>
            <div className="space-y-4 ">
  
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700"> Email </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input id="email" name="email" type="email" autoComplete="email" required value={credentials.email} onChange={handleChange} className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" placeholder="email@exemple.com"/>
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Mot de passe
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input id="password" name="password" type="password" autoComplete="current-password" required  value={credentials.password} onChange={handleChange} className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" placeholder="••••••••" />
                </div>
              </div>
            </div>

            <div>
              <button type="submit" disabled={loading} className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                {loading ? 'Connexion en cours...' : 'Se connecter'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>

      {/* pied de page */}
      <div className=" flex justify-between p-10 space-x-6 max-w-screen-xl px-10 md:px-6 mx-auto w-full ">
        <p className="text-white">Gestion Maintenance &copy; Aril 2025 </p>
        <NavLink to=""  className="text-white hover:underline cursor-pointer">Politique de confidentialite</NavLink>
        <NavLink to=""  className="text-white hover:underline cursor-pointer">Aide</NavLink>
        <p className="text-white ">Copyright by Tresor Zigna</p>
      </div>
    </div>
  )
}

export default Login

