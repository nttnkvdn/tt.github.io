document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const nameError = document.getElementById('nameError');
    const phoneError = document.getElementById('phoneError');
    const successMessage = document.getElementById('successMessage');

    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.startsWith('7') || value.startsWith('8')) {
            value = value.substring(1);
        }
        
        let formattedValue = '+7 (';
        
        if (value.length > 0) {
            formattedValue += value.substring(0, 3);
        }
        if (value.length > 3) {
            formattedValue += ') ' + value.substring(3, 6);
        }
        if (value.length > 6) {
            formattedValue += '-' + value.substring(6, 8);
        }
        if (value.length > 8) {
            formattedValue += '-' + value.substring(8, 10);
        }
        
        e.target.value = formattedValue;
    });

    function validateName(name) {
        const nameRegex = /^[а-яА-ЯёЁa-zA-Z\s]{2,50}$/;
        return nameRegex.test(name.trim());
    }

    function validatePhone(phone) {
        const cleanPhone = phone.replace(/\D/g, '');
        return cleanPhone.length === 11;
    }

    function showError(input, errorElement, message) {
        input.classList.add('error');
        errorElement.textContent = message;
    }

    function hideError(input, errorElement) {
        input.classList.remove('error');
        errorElement.textContent = '';
    }

    nameInput.addEventListener('blur', function() {
        if (!validateName(this.value)) {
            showError(this, nameError, 'Введите корректное имя (2-50 символов, только буквы)');
        } else {
            hideError(this, nameError);
        }
    });

    phoneInput.addEventListener('blur', function() {
        if (!validatePhone(this.value)) {
            showError(this, phoneError, 'Введите корректный номер телефона');
        } else {
            hideError(this, phoneError);
        }
    });

   
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = nameInput.value.trim();
        const phone = phoneInput.value;
        
        let isValid = true;
        
     
        if (!validateName(name)) {
            showError(nameInput, nameError, 'Введите корректное имя');
            isValid = false;
        } else {
            hideError(nameInput, nameError);
        }
      
        if (!validatePhone(phone)) {
            showError(phoneInput, phoneError, 'Введите корректный номер телефона');
            isValid = false;
        } else {
            hideError(phoneInput, phoneError);
        }
        
        if (isValid) {
          
            const submitBtn = contactForm.querySelector('.submit-btn');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Отправка...';
            
           
            setTimeout(() => {
                successMessage.textContent = 'Спасибо! Ваша заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.';
                successMessage.style.display = 'block';
                contactForm.reset();
                
                submitBtn.disabled = false;
                submitBtn.textContent = 'Отправить заявку';
                
           
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
            }, 2000);
        }
    });


    nameInput.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            hideError(this, nameError);
        }
    });

    phoneInput.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            hideError(this, phoneError);
        }
    });
});