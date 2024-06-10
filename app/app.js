import LocalStorageHandler from '../js/services/LocalStorageHandler.js';
import Authorization from '../js/authorization/Authorization.js';
import Logout from '../js/logout/Logout.js';
import RegistValidator from '../js/registration/RegistValidator.js';

class App {
    localStorageHandler = new LocalStorageHandler();

    init() {

        const registrationValidator = new RegistValidator();
        registrationValidator.init();

        const authorization = new Authorization();
        authorization.init();

        const logout = new Logout();
        logout.init();

        this.isLogined();
    }

    isLogined() {
        const user = JSON.parse(this.localStorageHandler.get('user'));
        if(!user) {
            return;
        }
        else {
            document.querySelectorAll('.log-in')?.forEach((elem) => {
                elem.classList.add('hidden');
            });
            document.querySelectorAll('.sign-up')?.forEach((elem) => {
                elem.classList.add('hidden');
            });
    
            document.querySelectorAll('.logout')?.forEach((elem) => {
                elem.classList.remove('hidden');
            });
            document.querySelector('.get-free-alerts').style.display = "flex";
            document.querySelector('.sixth-section')?.classList.remove('hidden');
    
            document.querySelector('.sign-up-btn')?.classList.add('hidden');
            // document.querySelector('.get-going-btn').style.display = "flex";
            // document.querySelector('.input-field').style.display = "flex";
        }
    }
}

export default App;
