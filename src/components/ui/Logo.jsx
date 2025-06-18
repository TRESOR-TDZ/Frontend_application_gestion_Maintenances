import logo from '../../assets/logo.png';

function Logo() {
    return (
      <div className="flex items-center">
        <img src={logo} alt="logo de l'application" className='h-20 w-auto mx-auto mb-4'/>
      </div>
    )
  }
  
  export default Logo