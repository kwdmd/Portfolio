const entry = document.createElement('script');
if (location.protocol === 'file:') {
  entry.src = 'assets/js/local-preview.js';
} else {
  entry.type = 'module';
  entry.src = 'assets/js/app.js?v=20261126-stage-fade-fix';
}
document.body.append(entry);
