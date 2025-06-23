const PREFIX = '/go/';
const pathname = window.location.pathname;

if (pathname.startsWith(PREFIX)) {
    const slug = decodeURIComponent(pathname.slice(PREFIX.length).replace(/\/+$/, ''));

    const cached = localStorage.getItem('redirects');
    if (cached) {
        const redirects = JSON.parse(cached);
        redirectToSlug(slug, redirects);
    } else {
        fetch('redirects.json')
            .then(res => res.json())
            .then(data => {
                localStorage.setItem('redirects', JSON.stringify(data));
                redirectToSlug(slug, data);
            })
            .catch(error => {
                console.error('Redirect failed:', error);
                showMessage('Something went wrong.', '');
            });
    }
} else {
    showMessage('Invalid URL.', `This redirect only works under "<code>${PREFIX}</code>".`);
}

function redirectToSlug(slug, redirects) {
    const targetUrl = redirects[slug];

    if (targetUrl) {
        window.location.replace(targetUrl);
    } else {
        showMessage('404 - Page Not Found', `No redirect found for "<code>${slug}</code>".`);
    }
}

function showMessage(title, message) {
    document.body.innerHTML = `
    <div class="container">
        <img src="malang.png" alt="Malang">
        <h1>${title}</h1>
        <p>${message}</p>
    </div>`;
}
