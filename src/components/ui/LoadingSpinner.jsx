// import { Loader2 } from 'lucide-react'

// function LoadingSpinner({ fullScreen = false }) {
//   return (
//     <div className={`flex items-center justify-center ${fullScreen ? 'h-screen' : 'h-full'}`}>
//       <Loader2 className="h-8 w-8 animate-spin text-primary" />
//     </div>
//   )
// }

// export default LoadingSpinner

import { Loader2 } from 'lucide-react'

function LoadingSpinner() {
  return (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />  
    </div>
  </div>
)};

export default LoadingSpinner;