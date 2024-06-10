import LocalStorageHandler from "../services/LocalStorageHandler.js";

class Logout {
    localStorageHandler = new LocalStorageHandler();

    init() {
        document.querySelector('.logout')?.addEventListener('click', this.logout.bind(this));
    }

    logout() {
        

        const users = JSON.parse(this.localStorageHandler.get('users'));
        const user = JSON.parse(this.localStorageHandler.get('user'));

        for(let i = 0; i < users.length; i++) {
            if(users[i].email === user.email) {
                users[i].lang = user.lang;
                users[i].theme = user.theme;

                break;
            } 
        }
        this.changePage();
        this.localStorageHandler.set('users', JSON.stringify(users));
        this.localStorageHandler.remove('user');

        window.location.href = "./../html/index.html";
    }

    changePage() {
        document.querySelectorAll('.log-in')?.forEach((elem) => {
            elem.classList.remove('hidden');
        });
        document.querySelectorAll('.sign-up')?.forEach((elem) => {
            elem.classList.remove('hidden');
        });

        document.querySelectorAll('.logout')?.forEach((elem) => {
            elem.classList.add('hidden');
        });
        document.querySelector('.get-free-alerts').style.display = "none";
        document.querySelector('.sixth-section')?.classList.add('hidden');

        document.querySelector('.sign-up-btn')?.classList.remove('hidden');
        // document.querySelector('.get-going-btn').style.display = "none";
        // document.querySelector('.input-field').style.display = "none";
    }
}

export default Logout;