import { useContext } from 'react';
import './ToggleSwitch.css'
import CurrentTemperatureUnitContext from '../../contexts/CurrentTemperatureUnitContext'
const ToggleSwitch = () => {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(CurrentTemperatureUnitContext);

   return (
     <>
       <label htmlFor="toggle" className="toggle-switch__label">
         <input type="checkbox" id="toggle" name="toggle" className="toggle-switch__checkbox" onChange={ handleToggleSwitchChange} />
         <span className='toggle__switch-circle'></span>
         <span className={`toggle__switch-text toggle__switch-text_F ${currentTemperatureUnit === "F"
           ? 'toggle__switch-text_color-white'
           : ""
         }`}>F</span>
         <span className={`toggle__switch-text toggle__switch-text_C ${currentTemperatureUnit === "C"
           ? 'toggle__switch-text_color-white'
           : ""}`}>C</span>
        
       </label>
     </>
  )
}
export default ToggleSwitch