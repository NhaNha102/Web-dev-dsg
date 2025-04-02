/// Js/Profile.js
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('Profile.html')) {
        // Check if user is logged in
        if (!checkLogin()) {
            showNotification('Please login to view your profile!', () => {
                window.location.href = '../HTML/Login.html';
            });
            return;
        }

        const infoEmail = document.getElementById('info-email');
        const infoName = document.getElementById('info-name');
        const infoPhone = document.getElementById('info-phone');
        const infoAddress = document.getElementById('info-address');
        const infoForm = document.getElementById('info-form');
        const passwordForm = document.getElementById('password-form');
        const cancelBtn = document.getElementById('cancel-btn');
        const logoutSectionBtn = document.getElementById('logout-section-btn');

        if (!infoEmail || !infoName || !infoPhone || !infoAddress || !infoForm || !passwordForm || !cancelBtn || !logoutSectionBtn) {
            console.error('Required elements not found in Profile.html');
            return;
        }

        // Display user information
        try {
            infoEmail.textContent = localStorage.getItem('currentEmail') || 'Not provided';
            infoName.textContent = localStorage.getItem('name') || 'Not provided';
            infoPhone.textContent = localStorage.getItem('phone') || 'Not provided';
            infoAddress.textContent = localStorage.getItem('address') || 'Not provided';

            document.getElementById('edit-name').value = localStorage.getItem('name') || '';
            document.getElementById('edit-phone').value = localStorage.getItem('phone') || '';
            document.getElementById('edit-address').value = localStorage.getItem('address') || '';
        } catch (error) {
            console.error('Error accessing localStorage:', error);
            showNotification('An error occurred while loading your profile.');
            return;
        }

        // Handle form submission for editing information
        infoForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const name = document.getElementById('edit-name').value.trim();
            const phone = document.getElementById('edit-phone').value.trim();
            const address = document.getElementById('edit-address').value.trim();

            // Validate phone number (basic check)
            const phoneRegex = /^\d{10,}$/;
            if (phone && !phoneRegex.test(phone)) {
                showNotification('Please enter a valid phone number (at least 10 digits)!');
                return;
            }

            try {
                localStorage.setItem('name', name);
                localStorage.setItem('phone', phone);
                localStorage.setItem('address', address);

                infoName.textContent = name || 'Not provided';
                infoPhone.textContent = phone || 'Not provided';
                infoAddress.textContent = address || 'Not provided';

                showNotification('Information updated successfully!');
            } catch (error) {
                console.error('Error saving to localStorage:', error);
                showNotification('An error occurred while saving your information.');
            }
        });

        // Handle cancel button
        cancelBtn.addEventListener('click', () => {
            try {
                document.getElementById('edit-name').value = localStorage.getItem('name') || '';
                document.getElementById('edit-phone').value = localStorage.getItem('phone') || '';
                document.getElementById('edit-address').value = localStorage.getItem('address') || '';
            } catch (error) {
                console.error('Error accessing localStorage:', error);
                showNotification('An error occurred while resetting the form.');
            }
        });

        // Handle password change
        passwordForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const currentPassword = document.getElementById('current-password').value;
            const newPassword = document.getElementById('new-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            try {
                const storedPassword = localStorage.getItem('password');

                if (currentPassword !== storedPassword) {
                    showNotification('Current password is incorrect!');
                    return;
                }

                if (newPassword.length < 6) {
                    showNotification('New password must be at least 6 characters long!');
                    return;
                }

                if (newPassword !== confirmPassword) {
                    showNotification('New password and confirmation do not match!');
                    return;
                }

                localStorage.setItem('password', newPassword);
                showNotification('Password changed successfully!');
                passwordForm.reset();
            } catch (error) {
                console.error('Error accessing localStorage:', error);
                showNotification('An error occurred while changing your password.');
            }
        });

        // Handle logout button in Profile section
        logoutSectionBtn.addEventListener('click', (event) => {
            event.preventDefault();
            logout();
        });
    }
});