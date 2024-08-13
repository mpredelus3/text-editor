const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the mini-infobar from appearing on mobile
  event.preventDefault();
  // Stash the event so it can be triggered later.
  window.deferredPrompt = event;
  // Update UI to show the install button
  butInstall.style.display = 'block';
});

butInstall.addEventListener('click', async () => {
  const promptEvent = window.deferredPrompt;
  if (!promptEvent) {
    return;
  }
  // Show the install prompt
  promptEvent.prompt();
  // Wait for the user to respond to the prompt
  const result = await promptEvent.userChoice;
  // Optionally, handle the user's response to the prompt
  console.log(`User response to the install prompt: ${result.outcome}`);
  // Clear the deferredPrompt so it can be garbage collected
  window.deferredPrompt = null;
  // Hide the install button
  butInstall.style.display = 'none';
});

window.addEventListener('appinstalled', (event) => {
  // Log install to analytics
  console.log('PWA was installed', event);
  // Optionally, hide the install button or take other action
  butInstall.style.display = 'none';
});
