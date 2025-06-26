import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Lock, Mail, User as UserIcon, Eye, EyeOff, Check } from 'lucide-react';
import api from '../../config/axios';
import Logo from '../../components/ui/Logo';
import Image from '../../components/ui/Image'; // Assurez-vous que le chemin est correct

function Register() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', password_confirmation: '', token});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [invitationData, setInvitationData] = useState(null);


  useEffect(() => {
      if (token){
        CheckInvitation();
      }
  }, [token]);

  const CheckInvitation = async () => {
    try {
      const response = await api.get(`/accept-invitation/${token}`);
      setInvitationData(response.data);
      setFormData(prev => ({
        ...prev,
        email: response.data.email,
        role: response.data.role
      }));
    } catch (err) {
      setErrors({ general: 'L\'invitation n\'est pas valide ou a expiré' });
      console.error(err);
    };
  };

  // Désactive la modification du champ email si nous avons des données d'invitation
  const emailDisabled = invitationData !== null;

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrors({})

    try {
      const { data } = await api.post('/auth/register', formData)
      navigate('/login', { state: { successMessage: data.message } })
    } catch (err) {
      setErrors(err.response?.data?.errors || { general: err.response?.data?.message || 'Erreur lors de l\'inscription' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-items  lg:flex-row min-h-screen bg-white">
      {/* Partie gauche - Image (seulement sur desktop) */}
      <div className="h-screen hidden lg:flex lg:w-1/2  overflow-hidden">
          <Image className="absolute inset-0 w-full h-full object-cover opacity-90" />
      </div>

      {/* Partie droite - Formulaire */}
      <div className="h-screen w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 md:p-12">
        <div className="w-full max-w-md">
          <div className="mb-6 text-center lg:text-left">
            <Logo className="h-10 mx-auto lg:mx-0" />
          </div>

          <div className="bg-white rounded-lg">
            <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center lg:text-left"> Finalisez votre inscription </h1>
            
            {errors.general && (
              <div className="mb-4 p-2 text-sm text-white bg-accent rounded-lg">
                {errors.general}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Champ Nom */}
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input type="text" id="name" name="name" required value={formData.name}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-2.5 border ${errors.name ? 'border-accent' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                    placeholder="Nom complet"
                  />
                </div>
                {errors.name && <p className="mt-1 text-sm text-accent">{errors.name}</p>}
              </div>

              {/* Champ Email */}
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} disabled={emailDisabled}
                    className={`block w-full pl-10 pr-3 py-2.5 border ${errors.email ? 'border-accent' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                    placeholder="email@exemple.com"
                  />
                </div>
                {errors.email && <p className="mt-1 text-sm text-accent">{errors.email}</p>}
              </div>

              {/* Champ Role (si disponible) */}
              
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>  
                  <input type="text" id="role" name="role" required value={formData.role} onChange={handleChange} disabled={emailDisabled} placeholder='role'
                    className={`block w-full pl-10 pr-3 py-2.5 border ${errors.email ? 'border-accent' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                  />  
                </div>
              </div>
              

              {/* Champ Mot de passe */}
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input type={showPassword ? "text" : "password"} id="password" name="password" required minLength="8" value={formData.password} onChange={handleChange}
                    className={`block w-full pl-10 pr-10 py-2.5 border ${errors.password ? 'border-accent' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                    placeholder="Mot de passe ••••••••"/>
                  <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                    )}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-sm text-accent">{errors.password}</p>}
              </div>

              {/* Champ Confirmation mot de passe */}
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input type={showPassword ? "text" : "password"} id="password_confirmation" name="password_confirmation" required value={formData.password_confirmation} onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-2.5 border ${errors.password_confirmation ? 'border-accent' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                    placeholder="Confirmez le mot de passe ••••••••"
                  />
                </div>
              </div>

              {/* Bouton de soumission */}
              <div className="pt-2">
                <button type="submit" disabled={loading}
                  className={`w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-secondary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors ${loading ? 'opacity-80 cursor-not-allowed' : ''}`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Traitement...
                    </>
                  ) : 'Finaliser mon inscription'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;


// la question de saovir a present comment recuperer l'email et le role de l'url pour les mettre dans les input et les rendre disable 