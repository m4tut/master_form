const form = document.getElementById('form');

const messages = {
    firstName: {
        empty: 'First Name cannot be empty',
        invalid: 'First Name can only contain letters',
    },
    lastName: {
        empty: 'Last Name cannot be empty',
        invalid: 'Last Name can only contain letters',
    },
    emailAddress: {
        empty: 'Email cannot be empty',
        invalid: 'Looks like this is not an email',
    },
    password: {
        empty: 'Password cannot be empty',
        invalid:
            'Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter and one number',
    },
};

const validateField = (field, messages) => {
    if (!field.validity.valid) {
        let message = field.value === '' ? messages[field.name].empty : messages[field.name].invalid;
        field.classList.add('form_input--invalid');
        field.setAttribute('aria-invalid', 'true');

        updateAlert(field.nextElementSibling, message);

        return false;
    } else {
        field.classList.remove('form_input--invalid');
        field.setAttribute('aria-invalid', 'false');
        updateAlert(field.nextElementSibling);

        return true;
    }
};

const updateAlert = (target, message = false) => {
    if (message) {
        target.setAttribute('role', 'alert');
        target.innerText = message;
    } else {
        target.removeAttribute('role');
        target.innerText = '';
    }
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = [];
    form.querySelectorAll('.form_input').forEach((field) => {
        valid.push(validateField(field, messages));
    });

    if (!valid.every((isValid) => isValid)) {
        e.preventDefault();
        console.log('invalid');
    }
});

form.addEventListener(
    'focus',
    (e) => {
        let field = e.target;
        field.classList.remove('form_input--invalid');
    },
    true
);

form.addEventListener(
    'blur',
    (e) => {
        let field = e.target;
        if (field.value !== '') {
            field.value = field.value.trim().replace(/\s+/g, ' ');
            validateField(field, messages);
        }
    },
    true
);

form.password.addEventListener('input', () => {
    validateField(form.password, messages);
});
