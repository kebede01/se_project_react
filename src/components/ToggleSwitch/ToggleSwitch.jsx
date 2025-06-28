import './ToggleSwitch.css'
 const ToggleSwitch = () => {
   return (
     <>
       <label htmlFor="toggle" className="toggle-switch__label">
          <input type="checkbox" id="toggle" name="toggle" className="toggle-switch__checkbox" />
         <span className='toggle__switch-circle'></span>
         <span className=' toggle__switch-text toggle__switch-text_F'>F</span>
         <span className=' toggle__switch-text toggle__switch-text_C'>C</span>
        
       </label>
     </>
  )
}
export default ToggleSwitch