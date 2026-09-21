(() => {
  'use strict';
  const supported = ['en', 'de', 'tr', 'ru', 'uk', 'es'];
  const deviceLanguages = Array.isArray(navigator.languages) && navigator.languages.length ? navigator.languages : [navigator.language];
  let language = deviceLanguages.map(value => String(value || '').toLowerCase().split('-')[0]).find(value => supported.includes(value)) || 'en';
  const translations = {
    de: { 'Sign in': 'Anmelden', 'Create account': 'Konto erstellen', 'Welcome back': 'Willkommen zurück', 'Create your space': 'Erstelle deinen Bereich', 'Sign in to open your personal BananaBoard.': 'Melde dich an, um dein persönliches BananaBoard zu öffnen.', 'Start with an email, password, and the name you want shown in BananaBoard.': 'Beginne mit einer E-Mail-Adresse, einem Passwort und dem Namen, der in BananaBoard erscheinen soll.', 'YOUR CALM STUDY SPACE': 'DEIN RUHIGER LERNBEREICH', 'Plan your work, keep your notes together, and make steady progress.': 'Plane deine Arbeit, behalte deine Notizen zusammen und mache stetige Fortschritte.', 'Account access': 'Kontozugang', 'Display name': 'Anzeigename', 'What should we call you?': 'Wie sollen wir dich nennen?', 'Email address': 'E-Mail-Adresse', 'Password': 'Passwort', 'Your password': 'Dein Passwort', 'Use at least 12 characters to protect your account.': 'Verwende mindestens 12 Zeichen, um dein Konto zu schützen.', 'BananaBoard does not offer password recovery yet. Keep your password somewhere safe.': 'BananaBoard bietet noch keine Passwortwiederherstellung an. Bewahre dein Passwort sicher auf.', 'Please complete every required field.': 'Bitte fülle alle Pflichtfelder aus.', 'Use at least 12 characters for your password.': 'Verwende mindestens 12 Zeichen für dein Passwort.', 'Creating account…': 'Konto wird erstellt…', 'Signing in…': 'Anmeldung läuft…', 'Please try again.': 'Bitte versuche es erneut.', 'Could not prepare a secure sign-in request. Refresh and try again.': 'Die sichere Anmeldung konnte nicht vorbereitet werden. Aktualisiere die Seite und versuche es erneut.' },
    tr: { 'Sign in': 'Giriş yap', 'Create account': 'Hesap oluştur', 'Welcome back': 'Tekrar hoş geldin', 'Create your space': 'Alanını oluştur', 'Sign in to open your personal BananaBoard.': 'Kişisel BananaBoard’unu açmak için giriş yap.', 'Start with an email, password, and the name you want shown in BananaBoard.': 'Bir e-posta, parola ve BananaBoard’da görünmesini istediğin adla başla.', 'YOUR CALM STUDY SPACE': 'SAKİN ÇALIŞMA ALANIN', 'Plan your work, keep your notes together, and make steady progress.': 'Çalışmanı planla, notlarını bir arada tut ve istikrarlı ilerleme kaydet.', 'Account access': 'Hesap erişimi', 'Display name': 'Görünen ad', 'What should we call you?': 'Sana nasıl hitap edelim?', 'Email address': 'E-posta adresi', 'Password': 'Parola', 'Your password': 'Parolan', 'Use at least 12 characters to protect your account.': 'Hesabını korumak için en az 12 karakter kullan.', 'BananaBoard does not offer password recovery yet. Keep your password somewhere safe.': 'BananaBoard henüz parola kurtarma sunmuyor. Parolanı güvenli bir yerde sakla.', 'Please complete every required field.': 'Lütfen tüm gerekli alanları doldur.', 'Use at least 12 characters for your password.': 'Parolan için en az 12 karakter kullan.', 'Creating account…': 'Hesap oluşturuluyor…', 'Signing in…': 'Giriş yapılıyor…', 'Please try again.': 'Lütfen tekrar dene.', 'Could not prepare a secure sign-in request. Refresh and try again.': 'Güvenli giriş isteği hazırlanamadı. Sayfayı yenileyip tekrar dene.' },
    ru: { 'Sign in': 'Войти', 'Create account': 'Создать аккаунт', 'Welcome back': 'С возвращением', 'Create your space': 'Создайте своё пространство', 'Sign in to open your personal BananaBoard.': 'Войдите, чтобы открыть свой личный BananaBoard.', 'Start with an email, password, and the name you want shown in BananaBoard.': 'Укажите адрес электронной почты, пароль и имя, которое будет отображаться в BananaBoard.', 'YOUR CALM STUDY SPACE': 'ВАШЕ СПОКОЙНОЕ ПРОСТРАНСТВО ДЛЯ УЧЁБЫ', 'Plan your work, keep your notes together, and make steady progress.': 'Планируйте работу, храните заметки вместе и уверенно двигайтесь вперёд.', 'Account access': 'Доступ к аккаунту', 'Display name': 'Отображаемое имя', 'What should we call you?': 'Как к вам обращаться?', 'Email address': 'Адрес электронной почты', 'Password': 'Пароль', 'Your password': 'Ваш пароль', 'Use at least 12 characters to protect your account.': 'Используйте не менее 12 символов для защиты аккаунта.', 'BananaBoard does not offer password recovery yet. Keep your password somewhere safe.': 'В BananaBoard пока нет восстановления пароля. Храните пароль в надёжном месте.', 'Please complete every required field.': 'Заполните все обязательные поля.', 'Use at least 12 characters for your password.': 'Используйте для пароля не менее 12 символов.', 'Creating account…': 'Создаём аккаунт…', 'Signing in…': 'Выполняем вход…', 'Please try again.': 'Попробуйте ещё раз.', 'Could not prepare a secure sign-in request. Refresh and try again.': 'Не удалось подготовить безопасный запрос на вход. Обновите страницу и попробуйте ещё раз.' },
    uk: { 'Sign in': 'Увійти', 'Create account': 'Створити обліковий запис', 'Welcome back': 'З поверненням', 'Create your space': 'Створіть свій простір', 'Sign in to open your personal BananaBoard.': 'Увійдіть, щоб відкрити свій особистий BananaBoard.', 'Start with an email, password, and the name you want shown in BananaBoard.': 'Почніть з адреси електронної пошти, пароля та імені, яке має відображатися в BananaBoard.', 'YOUR CALM STUDY SPACE': 'ВАШ СПОКІЙНИЙ ПРОСТІР ДЛЯ НАВЧАННЯ', 'Plan your work, keep your notes together, and make steady progress.': 'Плануйте роботу, зберігайте нотатки разом і впевнено рухайтеся вперед.', 'Account access': 'Доступ до облікового запису', 'Display name': 'Відображуване ім’я', 'What should we call you?': 'Як до вас звертатися?', 'Email address': 'Адреса електронної пошти', 'Password': 'Пароль', 'Your password': 'Ваш пароль', 'Use at least 12 characters to protect your account.': 'Використовуйте щонайменше 12 символів, щоб захистити свій обліковий запис.', 'BananaBoard does not offer password recovery yet. Keep your password somewhere safe.': 'BananaBoard поки не пропонує відновлення пароля. Зберігайте пароль у безпечному місці.', 'Please complete every required field.': 'Будь ласка, заповніть усі обов’язкові поля.', 'Use at least 12 characters for your password.': 'Використовуйте для пароля щонайменше 12 символів.', 'Creating account…': 'Створюємо обліковий запис…', 'Signing in…': 'Виконуємо вхід…', 'Please try again.': 'Спробуйте ще раз.', 'Could not prepare a secure sign-in request. Refresh and try again.': 'Не вдалося підготувати безпечний запит на вхід. Оновіть сторінку та спробуйте ще раз.' },
    es: { 'Sign in': 'Iniciar sesión', 'Create account': 'Crear cuenta', 'Welcome back': 'Te damos la bienvenida', 'Create your space': 'Crea tu espacio', 'Sign in to open your personal BananaBoard.': 'Inicia sesión para abrir tu BananaBoard personal.', 'Start with an email, password, and the name you want shown in BananaBoard.': 'Empieza con un correo electrónico, una contraseña y el nombre que quieres mostrar en BananaBoard.', 'YOUR CALM STUDY SPACE': 'TU ESPACIO TRANQUILO PARA ESTUDIAR', 'Plan your work, keep your notes together, and make steady progress.': 'Planifica tu trabajo, guarda tus apuntes juntos y avanza con constancia.', 'Account access': 'Acceso a la cuenta', 'Display name': 'Nombre visible', 'What should we call you?': '¿Cómo debemos llamarte?', 'Email address': 'Dirección de correo', 'Password': 'Contraseña', 'Your password': 'Tu contraseña', 'Use at least 12 characters to protect your account.': 'Usa al menos 12 caracteres para proteger tu cuenta.', 'BananaBoard does not offer password recovery yet. Keep your password somewhere safe.': 'BananaBoard aún no ofrece recuperación de contraseña. Guarda tu contraseña en un lugar seguro.', 'Please complete every required field.': 'Completa todos los campos obligatorios.', 'Use at least 12 characters for your password.': 'Usa al menos 12 caracteres para tu contraseña.', 'Creating account…': 'Creando cuenta…', 'Signing in…': 'Iniciando sesión…', 'Please try again.': 'Vuelve a intentarlo.', 'Could not prepare a secure sign-in request. Refresh and try again.': 'No se pudo preparar una solicitud de inicio de sesión segura. Actualiza la página e inténtalo de nuevo.' }
  };
  const accountPreferencesTranslations = {
    de: { 'Language': 'Sprache', 'Grade system': 'Notensystem', 'Number scale (1 is best · 6 is worst)': 'Zahlenskala (1 ist am besten · 6 am schlechtesten)', 'Percentage (0–100%)': 'Prozent (0–100 %)', 'Letter (A–F)': 'Buchstaben (A–F)', 'Choose your grade system now; you can change it later.': 'Lege dein Notensystem jetzt fest. Du kannst es später ändern.' },
    tr: { 'Language': 'Dil', 'Grade system': 'Not sistemi', 'Number scale (1 is best · 6 is worst)': 'Sayı sistemi (1 en iyi · 6 en kötü)', 'Percentage (0–100%)': 'Yüzde (0–100%)', 'Letter (A–F)': 'Harf (A–F)', 'Choose your grade system now; you can change it later.': 'Not sistemini şimdi seç. Daha sonra değiştirebilirsin.' },
    ru: { 'Language': 'Язык', 'Grade system': 'Система оценок', 'Number scale (1 is best · 6 is worst)': 'Числовая шкала (1 — лучшая · 6 — худшая)', 'Percentage (0–100%)': 'Проценты (0–100%)', 'Letter (A–F)': 'Буквы (A–F)', 'Choose your grade system now; you can change it later.': 'Выберите систему оценок сейчас. Её можно изменить позже.' },
    uk: { 'Language': 'Мова', 'Grade system': 'Система оцінювання', 'Number scale (1 is best · 6 is worst)': 'Числова шкала (1 — найкраща · 6 — найгірша)', 'Percentage (0–100%)': 'Відсотки (0–100%)', 'Letter (A–F)': 'Літери (A–F)', 'Choose your grade system now; you can change it later.': 'Виберіть систему оцінювання зараз. Її можна змінити пізніше.' },
    es: { 'Language': 'Idioma', 'Grade system': 'Sistema de calificaciones', 'Number scale (1 is best · 6 is worst)': 'Escala numérica (1 es mejor · 6 es peor)', 'Percentage (0–100%)': 'Porcentaje (0–100%)', 'Letter (A–F)': 'Letras (A–F)', 'Choose your grade system now; you can change it later.': 'Elige ahora el sistema de calificaciones. Podrás cambiarlo más adelante.' }
  };
  const t = value => accountPreferencesTranslations[language]?.[value] || translations[language]?.[value] || value;
  let mode = 'login';
  let languageWasChosen = false;
  let csrf = '';
  const $ = selector => document.querySelector(selector);

  function applyLanguageContent() {
    document.documentElement.lang = language;
    document.querySelectorAll('[data-i18n]').forEach(element => { element.textContent = t(element.dataset.i18n); });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => { element.placeholder = t(element.dataset.i18nPlaceholder); });
    document.querySelectorAll('[data-i18n-aria-label]').forEach(element => { element.setAttribute('aria-label', t(element.dataset.i18nAriaLabel)); });
  }

  let csrfRequest;

  async function getCsrf() {
    if (csrf) return csrf;
    if (!csrfRequest) {
      csrfRequest = fetch('/api/csrf', { credentials: 'same-origin', cache: 'no-store' })
        .then(response => {
          if (!response.ok) throw new Error(t('Could not prepare a secure sign-in request. Refresh and try again.'));
          return response.json();
        })
        .then(payload => {
          csrf = payload.token;
          return csrf;
        })
        .finally(() => { csrfRequest = null; });
    }
    return csrfRequest;
  }

  function setMode(nextMode) {
    mode = nextMode;
    const registering = mode === 'register';
    document.title = `${t(registering ? 'Create account' : 'Sign in')} · BananaBoard`;
    $('#authTitle').textContent = t(registering ? 'Create your space' : 'Welcome back');
    $('#authIntro').textContent = t(registering ? 'Start with an email, password, and the name you want shown in BananaBoard.' : 'Sign in to open your personal BananaBoard.');
    $('#displayNameField').hidden = !registering;
    $('#displayName').required = registering;
    $('#accountPreferences').hidden = !registering;
    $('#passwordHelp').hidden = !registering;
    $('#password').autocomplete = registering ? 'new-password' : 'current-password';
    $('#authSubmit').textContent = t(registering ? 'Create account' : 'Sign in');
    $('#authError').hidden = true;
    document.querySelectorAll('[data-auth-mode]').forEach(button => {
      const active = button.dataset.authMode === mode;
      button.classList.toggle('active', active);
      button.setAttribute('aria-selected', String(active));
    });
  }

  document.querySelectorAll('[data-auth-mode]').forEach(button => button.addEventListener('click', () => setMode(button.dataset.authMode)));
  $('#authForm').addEventListener('submit', async event => {
    event.preventDefault();
    const error = $('#authError');
    const submit = $('#authSubmit');
    const email = $('#email').value.trim();
    const password = $('#password').value;
    const displayName = $('#displayName').value.trim();
    const accountLanguage = $('#authLanguage').value;
    const gradeSystem = $('#accountGradeSystem').value;
    if (!email || !password || (mode === 'register' && !displayName)) {
      error.textContent = t('Please complete every required field.');
      error.hidden = false;
      return;
    }
    if (mode === 'register' && password.length < 12) {
      error.textContent = t('Use at least 12 characters for your password.');
      error.hidden = false;
      return;
    }
    submit.disabled = true;
    submit.textContent = mode === 'register' ? t('Creating account…') : t('Signing in…');
    error.hidden = true;
    try {
      await getCsrf();
      const response = await fetch(mode === 'register' ? '/api/auth/register' : '/api/auth/login', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'content-type': 'application/json', 'x-csrf-token': csrf },
        body: JSON.stringify(mode === 'register' ? { email, password, displayName, language: accountLanguage, languagePreference: languageWasChosen ? 'manual' : 'auto', gradeSystem } : { email, password })
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.error || t('Please try again.'));
      window.location.assign('/');
    } catch (requestError) {
      error.textContent = requestError.message || t('Please try again.');
      error.hidden = false;
      submit.disabled = false;
      submit.textContent = t(mode === 'register' ? 'Create account' : 'Sign in');
    }
  });
  $('#authLanguage').value = language;
  $('#authLanguage').addEventListener('change', event => {
    languageWasChosen = true;
    language = event.target.value;
    applyLanguageContent();
    setMode(mode);
  });
  applyLanguageContent();
  setMode('login');
  getCsrf().catch(() => { $('#authError').textContent = t('Could not prepare a secure sign-in request. Refresh and try again.'); $('#authError').hidden = false; });
})();
