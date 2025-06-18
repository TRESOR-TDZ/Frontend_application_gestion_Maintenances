import { Loader2 } from 'lucide-react'

const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  onClick,
  className = '',
  isLoading = false,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors disabled:opacity-50'

  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary-600 focus:ring-primary',
    secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-primary',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
  }

  return (
    <button type={type} className={`${baseClasses} ${variantClasses[variant]} ${className}`} onClick={onClick}  disabled={isLoading} {...props}>
      {isLoading ? (
        <>
          <Loader2 className="animate-spin mr-2 h-4 w-4" />
          Chargement...
        </>
      ) : (
        children
      )}
    </button>
  )
}

export default Button