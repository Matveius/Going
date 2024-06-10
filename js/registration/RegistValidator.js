import LocalStorageHandler from "../services/LocalStorageHandler.js";

class RegistValidator {
    localStorageHandler = new LocalStorageHandler();
    namePattern = /^[a-zA-Zа-яА-ЯёЁ]{2,}$/;
    numberPattern = /^\+375\d{9}$/;
    emailPattern = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    nicknamePattern = /^[a-z 0-9]{4,10}$/;
    passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    isFisrtNameValid = false;
    isLastNameValid = false;
    isPatronymicValid = true;
    isBirthdayValid = false;
    isNumberValid = false;
    isEmailValid = false;
    isNicknameValid = false;
    isPasswordValid = false;
    isConfirmPasswordValid = false;
    areTermsChecked = false;

    firstNameValue = null;
    lastNameValue = null;
    patronymicValue = null;
    birthdayValue = null;
    numberValue = null;
    emailValue = null;
    nicknameValue = null;
    passwordValue = null;


    init() {

        document.querySelector('.inputLastName')?.addEventListener('input', this.validateLastName.bind(this));

        document.querySelector('.inputFirstName')?.addEventListener('input', this.validateFirstName.bind(this));

        document.querySelector('.inputPatronymic')?.addEventListener('input', this.validatePatronymic.bind(this));
        
        document.querySelector('.inputBirthdate')?.addEventListener('input', this.validationBirthdate.bind(this));

        document.querySelector('.inputNumber')?.addEventListener('input', this.validateNumber.bind(this));

        document.querySelector('.inputEmail')?.addEventListener('input', this.validateEmail.bind(this));

        document.querySelector('.inputNickname')?.addEventListener('input', this.validateNickname.bind(this));
        document.querySelector('.generate-nickname')?.addEventListener('click', this.generateNickname.bind(this));

        document.querySelector('.inputPassword')?.addEventListener('input', this.validatePassword.bind(this));
        document.querySelector('.generate-password')?.addEventListener('click', this.generatePassword.bind(this));

        document.querySelector('.inputConfirmPassword')?.addEventListener('input', this.validateConfirmPassword.bind(this));

        document.querySelector('.terms-of-use')?.addEventListener('change', this.checkTerms.bind(this));
        document.querySelector('.close-icon')?.addEventListener('click', this.closeModal.bind(this));

        document.querySelector('.sign-up-submit')?.addEventListener('click', this.submit.bind(this));
    }

    validateLastName(event) {
        if(!this.namePattern.test(event.target.value)) {
            document.querySelector('.error-l-name').textContent = 'Minimal length is 2. Cannot use numbers, characters and spaces';
            this.isLastNameValid = false;
            event.target.classList.remove('correct');
        }
        else {
            document.querySelector('.error-l-name').textContent = '';
            this.isLastNameValid = true;
            event.target.classList.add('correct');
            this.lastNameValue = event.target.value;
        }

        this.checkValidation();
    }

    validateFirstName(event) {
        if(!this.namePattern.test(event.target.value)) {
            document.querySelector('.error-f-name').textContent = 'Minimal length is 2. Cannot use numbers, characters and spaces';
            this.isFisrtNameValid = false;
            event.target.classList.remove('correct');
        }
        else {
            document.querySelector('.error-f-name').textContent = '';
            this.isFisrtNameValid = true;
            event.target.classList.add('correct');
            this.firstNameValue = event.target.value;
        }

        this.checkValidation();
    }

    validatePatronymic(event) {
        if(!this.namePattern.test(event.target.value) && event.target.value !== '') {
            document.querySelector('.error-patr').textContent = 'Minimal length is 2. Cannot use numbers, characters and spaces';
            this.isPatronymicValid = false;
            event.target.classList.remove('correct');
            this.patronymicValue = null;
        }
        else {
            document.querySelector('.error-patr').textContent = '';
            this.isPatronymicValid = true;
            event.target.classList.add('correct');
            this.patronymicValue = event.target.value;
        }

        this.checkValidation();
    }

    validateEmail(event) {
        if(!this.emailPattern.test(event.target.value)) {
            document.querySelector('.error-email').textContent = 'Input your email correctly!';
            this.isEmailValid = false;
            event.target.classList.remove('correct');
        }
        else {
            document.querySelector('.error-email').textContent = '';
            this.isEmailValid = true;
            event.target.classList.add('correct');
            this.emailValue = event.target.value;
        }

        this.checkValidation();
    }

    validateNickname(event) {
        if(!this.nicknamePattern.test(event.target.value)) {
            document.querySelector('.error-nickname').textContent = 'Nickname must be from 4 up to 10 chars length. Use only latin letters and figures 0-9';
            this.isNicknameValid = false;
            event.target.classList.remove('correct');
        }
        else {
            document.querySelector('.error-nickname').textContent = '';
            this.isNicknameValid = true;
            event.target.classList.add('correct');
            this.nicknameValue = event.target.value;
        }

        this.checkValidation();
    }

    generateNickname() {
        
        var remainingAttempts = 5;
        if (remainingAttempts > 0) {

            var generatedNickname = this.generateRandomNickname();

            document.querySelector('.inputNickname').value = generatedNickname;
            remainingAttempts--;

            if (remainingAttempts === 0) {
              generateButton.disabled = true;
              document.querySelector('.error-nickname').textContent = 'Five attepmpts have expired. Input the nickname by yourself.';
              document.querySelector('.inputNickname').value = "";
            }
        }
    }

    generateRandomNickname() {
        var characters = "abcdefghijklmnopqrstuvwxyz0123456789";
        var nickname = "";
        for (var i = 0; i < 8; i++) {
          var randomIndex = Math.floor(Math.random() * characters.length);
          nickname += characters.charAt(randomIndex);
        }
        return nickname;
    }

    validateNumber(event) {
        if(!this.numberPattern.test(event.target.value)) {
            document.querySelector('.error-phone').textContent = 'Phone number must be belorussian (+375*********).';
            this.isNumberValid = false;
            event.target.classList.remove('correct');
        }
        else {
            document.querySelector('.error-phone').textContent = '';
            this.isNumberValid = true;
            event.target.classList.add('correct');
            this.numberValue = event.target.value;
        }

        this.checkValidation();
    }

    validatePassword(event) {
        if(!this.passwordPattern.test(event.target.value)) {
            document.querySelector('.error-password').textContent = 'Minimal length is 8. Maximal is 20. Must contain at least one UPPERCASE letter, one lowercase letter, one figure and one special character';
            this.isPasswordValid = false;
            event.target.classList.remove('correct');
        }
        else {
            document.querySelector('.error-password').textContent = '';
            this.isPasswordValid = true;
            event.target.classList.add('correct');
            this.passwordValue = event.target.value;
        }

        document.querySelector('.inputConfirmPassword').dispatchEvent(new Event("input"));
        this.checkValidation();
    }

    validateConfirmPassword(event) {
        if(event.target.value !== this.passwordValue) {
            document.querySelector('.error-confirm-password').textContent = 'Passwords do not match! Try again.';
            this.isConfirmPasswordValid = false;
            event.target.classList.remove('correct');
        }
        else {
            document.querySelector('.error-confirm-password').textContent = '';
            this.isConfirmPasswordValid = true;
            event.target.classList.add('correct');
        }

        this.checkValidation();
    }

    validationBirthdate(event) {
        const input = event.target;
        const value = this.formatDate(input.value);

        input.value = value;

        const isValidDate = this.validateDate(input.value);

        if (!isValidDate) {
            document.querySelector('.error-date').textContent = 'The date must be like DD-MM-YYYY. Input the correct value';
            event.target.classList.remove('correct');
            this.isBirthdayValid = false;
        } else {
            document.querySelector('.error-date').textContent = "";
            var userDate = this.getDate(input.value);
            var currentDate = new Date();
      
            if (this.getAge(userDate, currentDate) < 16) {
                document.querySelector('.error-date').textContent = 'You nust be at least 16 y.o.';
                event.target.classList.remove('correct');
                this.isBirthdayValid = false;
            }
            else {
                input.classList.add('correct');
                this.isBirthdayValid = true;
                this.birthdayValue = input.value;
            }
        }
    }

    formatDate(inputDate) {
        var formattedDate = inputDate.replace(/\D/g, "");
        formattedDate = formattedDate.slice(0, 8);
    
        if (formattedDate.length > 2) {
            formattedDate = formattedDate.slice(0, 2) + "-" + formattedDate.slice(2);
        }
        if (formattedDate.length > 5) {
            formattedDate = formattedDate.slice(0, 5) + "-" + formattedDate.slice(5);
        }
    
        return formattedDate;
    }

    validateDate(inputDate) {
        var dateRegex = /^(\d{2})-(\d{2})-(\d{4})$/;
        return dateRegex.test(inputDate);
    }

    getDate(inputDate) {
        var parts = inputDate.split("-");
        var day = parseInt(parts[0], 10);
        var month = parseInt(parts[1], 10) - 1;
        var year = parseInt(parts[2], 10);
    
        return new Date(year, month, day);
    }

    getAge(birthDate, currentDate) {
        var age = currentDate.getFullYear() - birthDate.getFullYear();
        var monthDiff = currentDate.getMonth() - birthDate.getMonth();
    
        if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
          age--;
        }
    
        return age;
    }

    generatePassword() {
        var password = "";
        var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@$!%*?&";

        while (!this.passwordPattern.test(password)) {
            password = "";
            for (var i = 0; i < 15; i++) {
                var randomIndex = Math.floor(Math.random() * characters.length);
                password += characters.charAt(randomIndex);
            }
        }

        document.querySelector('.inputPassword').value = password;
        document.querySelector('.inputConfirmPassword').value = password;
        document.querySelector('.inputPassword').dispatchEvent(new Event("input"));
    }

    checkTerms(event) {
        if (event.target.checked) {
            this.areTermsChecked = true;
            window.open('https://www.going.com/terms-of-use', '_blank');
        } else {
            this.areTermsChecked = false;
        }
        
        this.checkValidation();
    }

    closeModal() {
        document.querySelector('.modal-container').style.display = "none";
        document.body.classList.remove("no-scroll");
    }

    checkValidation() {
        
        if(this.isFisrtNameValid && this.isLastNameValid && this.isPatronymicValid && this.isBirthdayValid && this.isNumberValid && this.isEmailValid && this.isNicknameValid && this.isPasswordValid && this.isConfirmPasswordValid && this.areTermsChecked) {
            document.querySelector('.sign-up-submit').style.display = "flex";
        }
        else {
            document.querySelector('.sign-up-submit').style.display = "none";
            document.querySelector('.sign-up-submit').disabled = false;
        }
    }

    clearInputs() {
        document.querySelector('.inputLastName').value = '';
        document.querySelector('.inputFirstName').value = '';
        document.querySelector('.inputPatronymic').value = '';
        document.querySelector('.inputBirthdate').value = '';
        document.querySelector('.inputNumber').value = '';
        document.querySelector('.inputEmail').value = '';
        document.querySelector('.inputNickname').value = '';
        document.querySelector('.inputPassword').value = '';
        document.querySelector('.inputConfirmPassword').value = '';
        document.querySelector('.error-f-name').textContent = '';
        document.querySelector('.error-l-name').textContent = '';
        document.querySelector('.error-patr').textContent = '';
        document.querySelector('.error-email').textContent = '';
        document.querySelector('.error-date').textContent = '';
        document.querySelector('.error-phone').textContent = '';
        document.querySelector('.error-password').textContent = '';
        document.querySelector('.error-confirm-password').textContent = '';
        document.querySelector('.terms-of-use').checked = false;
        document.querySelector('.sign-up-submit').style.display = "none";
    }

    submit(event) {
        event.preventDefault();
        const user = {
            firstName: this.firstNameValue,
            lastName: this.lastNameValue,
            patronymic: this.patronymicValue,
            birthday: this.birthdayValue,
            number: this.numberValue,
            email: this.emailValue,
            nickname: this.nicknameValue,
            password: this.passwordValue,
            isLogined: true
        }

        const users = JSON.parse(this.localStorageHandler.get('users'));

        if(!users) {
            console.log('!users');
            this.localStorageHandler.set('users', JSON.stringify([user]));

            this.localStorageHandler.set('user', JSON.stringify(user));

            this.clearInputs();

            this.changePage();
            document.querySelector('.sign-up-submit').style.display = "none";
            
        }
        else {
            let isEmailAvailable = true;
            users.forEach((user) => {
                if(user.email === this.emailValue) {
                    isEmailAvailable = false;
                }
            });

            if(!isEmailAvailable) {
                document.querySelector('.error-email').textContent = 'This email is already taken';
            }
            else {
                this.localStorageHandler.set('users', JSON.stringify([...users, user]));

                this.localStorageHandler.set('user', JSON.stringify(user));

                this.clearInputs();

                this.changePage();

                document.querySelector('.sign-up-submit').style.display = "none";
            }            
        }

        window.location.href = "./../html/index.html";

        if(this.selectedLanguage === 'ru' && window.location.href === "./../html/index.html") {
            window.alert("Регистрация прошла успешно!");
        } 
        else {
            window.alert("Signed up successfully!");
        }
    }

    changePage() {
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

export default RegistValidator;