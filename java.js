document.addEventListener("DOMContentLoaded", function () {
    const rssUrl = 'https://www.space.com/feeds/all'; // RSS feed URL for Space.com
    const newsContainer = document.getElementById('news-container');

    fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`)
        .then(response => response.json())
        .then(data => {
            if (data.status === 'ok') {
                data.items.forEach(item => {
                    const newsItem = document.createElement('div');
                    newsItem.className = 'news-item';

                    const title = document.createElement('h2');
                    title.textContent = item.title;
                    newsItem.appendChild(title);

                    const link = document.createElement('a');
                    link.href = item.link;
                    link.textContent = 'Read more';
                    newsItem.appendChild(link);

                    newsContainer.appendChild(newsItem);
                });
            }
        })
        .catch(error => console.error('Error fetching the RSS feed:', error));
});
