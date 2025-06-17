// Set your prefix here (must start and end with a slash)
const PREFIX = '/malang/';

fetch('redirects.json')
    .then(response => response.json())
    .then(redirects => {
        const pathname = window.location.pathname;

        if (pathname.startsWith(PREFIX)) {
            const slug = pathname.slice(PREFIX.length).replace(/\/+$/, ''); // remove trailing slashes
            const targetUrl = redirects[slug];

            if (targetUrl) {
                document.body.innerHTML = `
                <div class="container">
        <img src="malang.webp" alt="Malang">
        <h1>Redirecting...</h1>
        <p>If you are not redirected automatically, <a id="manualLink" href="${targetUrl}">click here</a>.</p>
        </div>
        `;
        window.location.replace(targetUrl);
            } else {
                document.body.innerHTML = `
                <div class="container">
        <img src="malang.webp" alt="Malang">
        <h1>404 - Page Not Found</h1>
        <p>No redirect found for "<code>${slug}</code>".</p>
        </div>
        `;
            }
        } else {
            document.body.innerHTML = `
            <div class="container">
        <img src="malang.webp" alt="Malang">
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
        <img src="malang.webp" alt="Malang">
        <h1>Something went wrong.</h1>
        </div>`;
    });
