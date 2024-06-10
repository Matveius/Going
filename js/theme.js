const themeSwitcher = document.getElementById('theme-switcher');
const root = document.documentElement;

function setTheme(theme) {
  root.classList.add(theme);
  localStorage.setItem('theme', theme);
}

function removeTheme(theme) {
  root.classList.remove(theme);
  localStorage.removeItem('theme');
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  setTheme(savedTheme);
}

if (savedTheme === 'darkmode') {
  themeSwitcher.classList.add('active');
}

themeSwitcher.addEventListener('click', function() {
  if (root.classList.contains('darkmode')) {
    removeTheme('darkmode');
    themeSwitcher.classList.remove('active');
  } else {
    setTheme('darkmode');
    themeSwitcher.classList.add('active');
  }
});