document.getElementById('searchBar').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const bhajans = document.querySelectorAll('#bhajanList li');
    bhajans.forEach(bhajan => {
        const title = bhajan.textContent.toLowerCase();
        bhajan.style.display = title.includes(query) ? '' : 'none';
    });
});

document.getElementById('bhajanList').addEventListener('click', async function(event) {
    if (event.target.tagName === 'LI') {
        const fileName = event.target.getAttribute('data-file-name');
        if (fileName) {
            try {
                const lyrics = await fetchLyricsFromGitHub(fileName);
                displayLyrics(event.target.textContent, lyrics);
            } catch (error) {
                console.error('Error fetching lyrics:', error);
            }
        }
    }
});

async function fetchLyricsFromGitHub(fileName) {
    const repoUrl = 'https://raw.githubusercontent.com/samarth-jain28/BhajanSangrah/refs/heads/main/bhajans/';
    const response = await fetch(`${repoUrl}${"jhoola%20jhulaye%20rahi%20re.txt"}.txt`);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.text();
}

function displayLyrics(title, lyrics) {
    const lyricsContainer = document.getElementById('lyricsContainer');
    lyricsContainer.innerHTML = `<h2>${title}</h2><pre>${lyrics}</pre>`;
    lyricsContainer.style.display = 'block';
}
