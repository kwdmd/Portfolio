const entry = document.createElement('script');
if (location.protocol === 'file:') {
  entry.src = 'assets/js/local-preview.js';
} else {
  entry.type = 'module';
  entry.src = 'assets/js/app.js';
}
document.body.append(entry);
