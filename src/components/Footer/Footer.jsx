import './Footer.css';
function Footer() {

  return (
    <footer className="footer ">
      <div className="footer__container">
        <p className="footer__text">Developed by Name Surname</p>
        <span className='footer__span'>
          {new Date().getFullYear()}
       </span>
      </div>
    </footer>
  );
}
export default Footer;