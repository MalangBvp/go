// Set your prefix here (must start and end with a slash)
const PREFIX = '/go/';

fetch('redirects.json')
  .then(response => response.json())
  .then(redirects => {
    const pathname = window.location.pathname;

    // Create minimal HTML with only the logo initially
    document.body.innerHTML = `
      <div class="container" id="container">
        <img src="malang.png" alt="Malang" id="malangLogo">
        <p id="manualLinkContainer" style="opacity:0; transition: opacity 0.3s;">
          <a id="manualLink" href="#">Go</a>
        </p>
      </div>
    `;

    if (pathname.startsWith(PREFIX)) {
      const slug = pathname.slice(PREFIX.length).replace(/\/+$/, ''); // remove trailing slashes
      const targetUrl = redirects[slug];

      if (targetUrl) {
        const manualLink = document.getElementById('manualLink');
        const manualLinkContainer = document.getElementById('manualLinkContainer');
        const container = document.getElementById('container');

        // Set the href for manual link
        manualLink.href = targetUrl;

        // Show fallback manual link after 3 seconds if redirect doesn't complete
        setTimeout(() => {
          manualLinkContainer.style.opacity = 1;
        }, 3000);

        // Start fade after 1 second
        setTimeout(() => {
          container.style.transition = "opacity 1s";
          container.style.opacity = 0;

          // Redirect after fade completes (1s duration)
          setTimeout(() => {
            window.location.replace(targetUrl);
          }, 1000);
        }, 1000);

      } else {
        document.body.innerHTML = `
          <div class="container">
            <img src="malang.png" alt="Malang">
            <h1>404 - Page Not Found</h1>
            <p>No redirect found for "<code>${slug}</code>".</p>
          </div>
        `;
      }
    } else {
      document.body.innerHTML = `
        <div class="container">
          <img src="malang.png" alt="Malang">
          <h1>Invalid URL.</h1>
          <p>This redirect only works under "<code>${PREFIX}</code>".</p>
        </div>
      `;
    }
  })
  .catch(error => {
    console.error('Redirect failed:', error);
    document.body.innerHTML = `
      <div class="container">
        <img src="malang.png" alt="Malang">
        <h1>Something went wrong.</h1>
      </div>`;
  });
