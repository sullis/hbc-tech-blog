class jekyllSearch {
    constructor(dataSource, searchField, resultsList) {
        this.dataSource = dataSource;
        this.searchField = document.querySelector(searchField);
        this.resultsList = document.querySelector(resultsList);

        this.displayResults = this.displayResults.bind(this);
    }

    fetchedData() {
        return fetch(this.dataSource)
        .then(blob => blob.json())
    }

    async findResults() {
        const data = await this.fetchedData();
        const regex = new RegExp(this.searchField.value, 'gi');
        return data.filter(item => {
            return item.title.match(regex) || item.excerpt.match(regex);
        });
    }

    async displayResults() {
        const results = await this.findResults();
        const html = results.map(item => {
            return `
            <section class="snippet snippet--reveal">
                <div class="snippet__meta">
                    <a class="meta__category-link" href="/category/${item.category}">${item.category}</a>
                    <span class="meta__author">${item.author}</span>
                    <span class="meta__date">${item.date}</span>
                </div>
                <h1 class="snippet__title"><a class="snippet__title__link" title="${item.title}" href="${item.url}">${item.title}</a></h1>
                <a class="snippet__excerpt__link" href="${item.url}"><p class="snippet__excerpt">${item.excerpt}</p></a>
            </section>`;
        }).join('');

        this.resultsList.className += ' ' + 'header-search__results--active';

        if ((results.length == 0) || (this.searchField.value == '')) {
            this.resultsList.innerHTML = `<section class="snippet snippet--reveal"><p>Sorry, nothing was found</p></snippet>`;
        } else {
            this.resultsList.innerHTML = html;
        }
    }

    async clearPlaceholder() {
        this.searchField.placeholder = '';
    }

    init() {
        this.searchField.addEventListener('click', this.clearPlaceholder.bind(this));
        this.searchField.addEventListener('keyup', this.displayResults);
        this.searchField.addEventListener('keypress', event => {
            if (event.keyCode == 13) {
                event.preventDefault();
            }
        });
    }
}
