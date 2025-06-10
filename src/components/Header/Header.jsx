import './Header.css'
import logo from '../../assets/logo.svg'
import avatar from '../../assets/avatar.svg'
function Header() {
  return (
    <header className='header'>
      
        <img src={logo} alt='logo' className='header__logo' />
       <p className="header__location-date">DATE LOCATION</p>
        <button className="header__button">+ Add clothes</button>
        <p className="header__avatar-name">Terrence Tegegne</p>
        <img src={avatar} alt="avatar" className="header__avatar-img" />
    
      
   </header>
  )
}
export default Header;