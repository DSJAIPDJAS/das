// في بداية الملف
if (localStorage.getItem('isLoggedIn')) {
    // توجيه المستخدم إلى الصفحة الرئيسية أو إخفاء أزرار التسجيل
}
document.addEventListener('DOMContentLoaded', function() {
    // تعريف المتغيرات العامة
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const forgotModal = document.getElementById('forgotModal');
    const forgotEmail = document.getElementById('forgotEmail');

    // التحقق من صحة البريد الإلكتروني
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    // التحقق من قوة كلمة المرور
    function validatePassword(password) {
        // على الأقل 8 أحرف، حرف كبير، حرف صغير، رقم
        const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return re.test(password);
    }

    // التحقق من رقم الهاتف
    function validatePhone(phone) {
        // يقبل الأرقام فقط، على الأقل 10 أرقام
        const re = /^\d{10,}$/;
        return re.test(phone);
    }

    // إنشاء رسائل الخطأ ديناميكيًا
    function createErrorMessage(element, message) {
        let errorElement = element.nextElementSibling;
        if (!errorElement || !errorElement.classList.contains('error-message')) {
            errorElement = document.createElement('span');
            errorElement.className = 'error-message';
            element.parentNode.insertBefore(errorElement, element.nextSibling);
        }
        errorElement.textContent = message;
        return errorElement;
    }

     // دالة التحقق من تسجيل الدخول
     function validateLogin() {
        let isValid = true;
        
        const username = document.getElementById('loginUsername');
        if (!username.value.trim()) {
            createErrorMessage(username, 'يجب إدخال اسم المستخدم أو البريد الإلكتروني');
            username.classList.add('invalid');
            isValid = false;
        }
        
        const password = document.getElementById('loginPassword');
        if (!password.value.trim()) {
            createErrorMessage(password, 'يجب إدخال كلمة المرور');
            password.classList.add('invalid');
            isValid = false;
        }
        
        return isValid;
    }

    // دالة التحقق من التسجيل
    function validateRegister() {
        let isValid = true;
        
        const name = document.getElementById('regName');
        if (!name.value.trim()) {
            createErrorMessage(name, 'يجب إدخال الاسم الكامل');
            name.classList.add('invalid');
            isValid = false;
        }
        
        const email = document.getElementById('regEmail');
        if (!validateEmail(email.value)) {
            createErrorMessage(email, 'البريد الإلكتروني غير صالح');
            email.classList.add('invalid');
            isValid = false;
        }
        
        const phone = document.getElementById('regPhone');
        if (!validatePhone(phone.value)) {
            createErrorMessage(phone, 'رقم الهاتف يجب أن يحتوي على 10 أرقام على الأقل');
            phone.classList.add('invalid');
            isValid = false;
        }
        
        const password = document.getElementById('regPassword');
        if (!validatePassword(password.value)) {
            createErrorMessage(password, 'كلمة المرور يجب أن تحتوي على 8 أحرف على الأقل، حرف كبير، حرف صغير، ورقم');
            password.classList.add('invalid');
            isValid = false;
        }
        
        const confirmPassword = document.getElementById('regConfirmPassword');
        if (password.value !== confirmPassword.value) {
            createErrorMessage(confirmPassword, 'كلمتا المرور غير متطابقتين');
            confirmPassword.classList.add('invalid');
            isValid = false;
        }
        
        return isValid;
    }

    // إضافة التحقق أثناء الكتابة
    document.getElementById('regEmail')?.addEventListener('input', function() {
        const email = this.value;
        if (email && !validateEmail(email)) {
            this.classList.add('invalid');
        } else {
            this.classList.remove('invalid');
        }
    });

    document.getElementById('regPassword')?.addEventListener('input', function() {
        const password = this.value;
        if (password && !validatePassword(password)) {
            this.classList.add('invalid');
        } else {
            this.classList.remove('invalid');
        }
    });

    document.getElementById('regPhone')?.addEventListener('input', function() {
        const phone = this.value;
        if (phone && !validatePhone(phone)) {
            this.classList.add('invalid');
        } else {
            this.classList.remove('invalid');
        }
    });

    document.getElementById('regConfirmPassword')?.addEventListener('input', function() {
        const password = document.getElementById('regPassword').value;
        const confirmPassword = this.value;
        
        if (confirmPassword && password !== confirmPassword) {
            this.classList.add('invalid');
        } else {
            this.classList.remove('invalid');
        }
    });

    // معالجة نماذج المصادقة
    document.getElementById('loginForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        if(validateLogin()) {
            alert('تم تسجيل الدخول بنجاح!');
            loginModal.classList.remove('active');
            // يمكن إضافة redirect أو تحديث الواجهة هنا
        }
    });

    document.getElementById('registerForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        if(validateRegister()) {
            alert('تم إنشاء الحساب بنجاح!');
            registerModal.classList.remove('active');
        }
    });

    document.getElementById('forgotForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        if(forgotEmail && validateEmail(forgotEmail.value)) {
            alert('تم إرسال رابط الاستعادة!');
            forgotModal.classList.remove('active');
        }
    });

    // تهيئة النوافذ المنبثقة
    initAuthModals();
});

function initAuthModals() {
    const loginBtn = document.querySelector('.login-btn');
    const registerBtn = document.querySelector('.register-btn');
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const forgotModal = document.getElementById('forgotModal');
    const closeModals = document.querySelectorAll('.close-modal');
    const showRegister = document.querySelector('.button2.show-register');
    const showLogin = document.querySelector('.button2.show-login');
    const forgotPassword = document.querySelector('.button3.forgot-password');

    if (!loginBtn || !registerBtn || !loginModal || !registerModal || !forgotModal) return;

    // فتح نافذة تسجيل الدخول
    loginBtn?.addEventListener('click', function(e) {
        e.preventDefault();
        loginModal.classList.add('active');
    });

    // فتح نافذة إنشاء حساب
    registerBtn?.addEventListener('click', function(e) {
        e.preventDefault();
        registerModal.classList.add('active');
    });

    // إغلاق جميع النوافذ
    closeModals.forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            loginModal.classList.remove('active');
            registerModal.classList.remove('active');
            forgotModal.classList.remove('active');
        });
    });

    // التبديل بين النوافذ
    showRegister?.addEventListener('click', function(e) {
        e.preventDefault();
        loginModal.classList.remove('active');
        registerModal.classList.add('active');
    });

    showLogin?.addEventListener('click', function(e) {
        e.preventDefault();
        registerModal.classList.remove('active');
        loginModal.classList.add('active');
    });

    forgotPassword?.addEventListener('click', function(e) {
        e.preventDefault();
        loginModal.classList.remove('active');
        forgotModal.classList.add('active');
    });

    // إغلاق النوافذ عند النقر خارجها
    window.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            loginModal.classList.remove('active');
        }
        if (e.target === registerModal) {
            registerModal.classList.remove('active');
        }
        if (e.target === forgotModal) {
            forgotModal.classList.remove('active');
        }
    });
}
document.addEventListener('DOMContentLoaded', function() {
    // تعريف المتغيرات
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const forgotForm = document.getElementById('forgotForm');
  
      // تسجيل الدخول
      document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        if(validateLogin()) {
            const email = document.getElementById('loginUsername').value.trim();
            const password = document.getElementById('loginPassword').value;
            
            try {
                const response = await fetch('http://localhost:5000/api/auth/login', {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password })
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'فشل تسجيل الدخول');
                }

                const data = await response.json();
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userEmail', email);
                
                alert('تم تسجيل الدخول بنجاح!');
                loginModal.classList.remove('active');
                window.location.reload();
            } catch (error) {
                console.error('حدث خطأ:', error);
                alert(error.message || 'حدث خطأ أثناء تسجيل الدخول');
            }
        }
    });

    // التسجيل
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('regName').value;
      const email = document.getElementById('regEmail').value;
      const phone = document.getElementById('regPhone').value;
      const password = document.getElementById('regPassword').value;
  
      try {
        const response = await fetch('http://localhost:5000/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, phone, password })
        });
        const data = await response.json();
        if (response.ok) {
          alert('تم إنشاء الحساب بنجاح!');
          registerModal.classList.remove('active');
        } else {
          throw new Error(data.message || 'فشل التسجيل');
        }
      } catch (error) {
        alert(error.message);
      }
    });
});
function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(401);
  
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  }
  
  