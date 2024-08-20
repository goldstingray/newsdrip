document.addEventListener("DOMContentLoaded", function () {
    const rssUrl = 'https://www.space.com/feeds/all';
    const newsContainer = document.getElementById('news-container');

    // Fetch the RSS feed
    fetch(rssUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.text();
        })
        .then(data => {
            // Parse the RSS feed using DOMParser
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, "application/xml");

            // Extract items from the RSS feed
            const items = xmlDoc.querySelectorAll("item");

            items.forEach(item => {
                const title = item.querySelector("title").textContent;
                const link = item.querySelector("link").textContent;

                // Create a new div for each news item
                const newsItem = document.createElement('div');
                newsItem.className = 'news-item';

                // Add the title to the news item
                const titleElement = document.createElement('h2');
                titleElement.textContent = title;
                newsItem.appendChild(titleElement);

                // Add the link to the news item
                const linkElement = document.createElement('a');
                linkElement.href = link;
                linkElement.textContent = 'Read more';
                linkElement.target = '_blank';  // Open in a new tab
                newsItem.appendChild(linkElement);

                // Append the news item to the news container
                newsContainer.appendChild(newsItem);
            });
        })
        .catch(error => {
            console.error('Error fetching or parsing the RSS feed:', error);
            newsContainer.textContent = 'Failed to load news. Please try again later.';
        });
});
