function checkDarkMode () {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
}

function watchDarkMode () {
  if (!window.matchMedia) return

  window.matchMedia('(prefers-color-scheme: dark)').addListener(addDarkModeSelector)
}

function addDarkModeSelector () {
  if (checkDarkMode()) {
    document.documentElement.classList.add('mode-dark')
  } else {
    document.documentElement.classList.remove('mode-dark')
  }
}

module.exports = {
  watchDarkMode: watchDarkMode,
  addDarkModeSelector: addDarkModeSelector
}
