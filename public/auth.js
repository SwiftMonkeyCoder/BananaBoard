(() => {
  'use strict';
  let mode = 'login';
  let csrf = '';
  const $ = selector => document.querySelector(selector);

  let csrfRequest;

  async function getCsrf() {
    if (csrf) return csrf;
    if (!csrfRequest) {
      csrfRequest = fetch('/api/csrf', { credentials: 'same-origin', cache: 'no-store' })
        .then(response => {
          if (!response.ok) throw new Error('Could not prepare a secure sign-in request. Refresh and try again.');
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
    document.title = `${registering ? 'Create account' : 'Sign in'} · BananaBoard`;
    $('#authTitle').textContent = registering ? 'Create your space' : 'Welcome back';
    $('#authIntro').textContent = registering ? 'Start with an email, password, and the name you want shown in BananaBoard.' : 'Sign in to open your personal BananaBoard.';
    $('#displayNameField').hidden = !registering;
    $('#displayName').required = registering;
    $('#passwordHelp').hidden = !registering;
    $('#password').autocomplete = registering ? 'new-password' : 'current-password';
    $('#authSubmit').textContent = registering ? 'Create account' : 'Sign in';
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
    if (!email || !password || (mode === 'register' && !displayName)) {
      error.textContent = 'Please complete every required field.';
      error.hidden = false;
      return;
    }
    if (mode === 'register' && password.length < 12) {
      error.textContent = 'Use at least 12 characters for your password.';
      error.hidden = false;
      return;
    }
    submit.disabled = true;
    submit.textContent = mode === 'register' ? 'Creating account…' : 'Signing in…';
    error.hidden = true;
    try {
      await getCsrf();
      const response = await fetch(mode === 'register' ? '/api/auth/register' : '/api/auth/login', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'content-type': 'application/json', 'x-csrf-token': csrf },
        body: JSON.stringify(mode === 'register' ? { email, password, displayName } : { email, password })
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.error || 'Please try again.');
      window.location.assign('/');
    } catch (requestError) {
      error.textContent = requestError.message || 'Please try again.';
      error.hidden = false;
      submit.disabled = false;
      submit.textContent = mode === 'register' ? 'Create account' : 'Sign in';
    }
  });
  setMode('login');
  getCsrf().catch(() => { $('#authError').textContent = 'Could not prepare a secure sign-in request. Refresh and try again.'; $('#authError').hidden = false; });
})();
