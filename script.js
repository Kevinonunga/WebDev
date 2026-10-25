// script.js
console.log("JavaScript is working!");
document.addEventListener('DOMContentLoaded', () => {
    // 1. Grab element references
    const form = document.getElementById('regform');
    
    // Inputs & Selects
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmInput = document.getElementById('confirm-password');
    const genderSelect = document.getElementById('gender');
    const dobInput = document.getElementById('dob');
    const countryInput = document.getElementById('country');
    const phoneInput = document.getElementById('phone');
    const bioTextarea = document.getElementById('bio');

    // Error elements
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmError = document.getElementById('confirmError');
    const genderError = document.getElementById('genderError');
    const dobError = document.getElementById('dobError');
    const countryError = document.getElementById('countryError');
    const phoneError = document.getElementById('phoneError');
    const bioError = document.getElementById('bioError');

    // UI Feedback & Counters
    const successMsg = document.getElementById('successMsg');
    const memberList = document.getElementById('memberList');
    const memberCounter = document.getElementById('count');
    const emptyNote = document.getElementById('emptyNote');
    const darkModeBtn = document.getElementById('theme');

    // Log references to confirm they are all found
    console.log({
        form, nameInput, emailInput, passwordInput, confirmInput,
        genderSelect, dobInput, countryInput, phoneInput, bioTextarea,
        nameError, emailError, passwordError, confirmError, genderError,
        dobError, countryError, phoneError, bioError, successMsg,
        memberList, memberCounter, emptyNote, darkModeBtn
    });

    // 3. Capture the form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // 4. Validate each field
        if (validateForm()) {
            // 6. Register the member (DOM creation)
            registerMember();

            // 8. Show the success message and reset
            successMsg.textContent = 'Member registered successfully!';
            successMsg.classList.remove('hidden');
            form.reset();

            // Hide success message after 4 seconds
            setTimeout(() => {
                successMsg.classList.add('hidden');
            }, 4000);
        }
    });

    // 5. Clear errors as the user fixes them (real-time listeners)
    const fields = [
        { input: nameInput, error: nameError, validate: val => val.trim() !== '' ? '' : 'Name is required.' },
        { input: emailInput, error: emailError, validate: val => val.includes('@') ? '' : 'Enter a valid email.' },
        { input: passwordInput, error: passwordError, validate: val => val.length >= 6 ? '' : 'Password must be at least 6 characters.' },
        { 
            input: confirmInput, 
            error: confirmError, 
            validate: val => val === passwordInput.value && val !== '' ? '' : 'Passwords must match.' 
        },
        { input: genderSelect, error: genderError, validate: val => val !== '' ? '' : 'Please select a gender.' },
        { input: dobInput, error: dobError, validate: val => val !== '' ? '' : 'Date of birth is required.' },
        { input: countryInput, error: countryError, validate: val => val.trim() !== '' ? '' : 'Country is required.' },
        { input: phoneInput, error: phoneError, validate: val => val.trim() !== '' ? '' : 'Phone number is required.' },
        { input: bioTextarea, error: bioError, validate: val => val.trim() !== '' ? '' : 'Bio cannot be empty.' }
    ];

    fields.forEach(field => {
        field.input.addEventListener('input', () => {
            field.error.textContent = field.validate(field.input.value);
        });
        field.input.addEventListener('change', () => {
            field.error.textContent = field.validate(field.input.value);
        });
    });

    function validateForm() {
        let isValid = true;
        fields.forEach(field => {
            const errMsg = field.validate(field.input.value);
            field.error.textContent = errMsg;
            if (errMsg !== '') {
                isValid = false;
            }
        });
        return isValid;
    }

    // 6 & 7. Register member and Update counter
    function registerMember() {
        // Remove empty placeholder note if it exists
        if (emptyNote) {
            emptyNote.remove();
        }

        const li = document.createElement('li');
        li.classList.add('member-item');
        
        // Member info structure
        li.innerHTML = `
            <div class="member-info">
                <strong>${nameInput.value}</strong> (${emailInput.value}) - <em>${countryInput.value}</em>
            </div>
            <button type="button" class="delete-btn">Remove</button>
        `;

        memberList.appendChild(li);
        updateCounter();
    }

    function updateCounter() {
        const count = memberList.querySelectorAll('li:not(#emptyNote)').length;
        memberCounter.textContent = count;
    }

    // 9. Remove a member using Event Delegation
    memberList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const li = e.target.closest('li');
            li.remove();
            updateCounter();

            // If list becomes empty, restore the note
            if (memberList.children.length === 0) {
                const note = document.createElement('li');
                note.classList.add('empty');
                note.id = 'emptyNote';
                note.textContent = 'No members yet. Register someone to begin.';
                memberList.appendChild(note);
            }
        }
    });

    // 10. Dark Mode toggle
    darkModeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            darkModeBtn.textContent = 'Light Mode';
        } else {
            darkModeBtn.textContent = 'Dark Mode';
        }
    });
});