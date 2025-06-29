import './SideBar.css'
import avatar from '../../assets/myavatar.jpg'
const SideBar = () => {
  return (
    <section className='side-bar'>
      <img  src={avatar} className='side-bar__avatar'/>
        
      
    <p className='side-bar__avatar-name'>
        kebede
    </p>
    </section>
  
  )
}
export default SideBar;