export default class SiteService {
    apiUrl = '';
    constructor(apiUrl = '/api') {
        this.apiUrl = apiUrl;
    }

    async getPosts() {
        if (this.apiUrl === 'test')
        {
            return await (new Promise((resolve) => {
                const data = getTestData();
                resolve(data);
            }));
        }

        const response = await fetch(this.apiUrl + '/posts.php?operation=getPosts');
        return await response.json();
    }
}

function getTestData() {
    return [
        {
            id: 1,
            title: 'Some good site',
            desc: 'some big desc',
            encode: 'utf-8',
            language: 'Русский',
            created: '03-02-2001',
            updated: '05-12-2021',
            danger: true,
            genre: [
                {
                    id: 1,
                    name: 'Фильмы',
                }
            ]
        },
        {
            id: 2,
            title: 'Some good site',
            desc: 'some big desc',
            encode: 'utf-8',
            language: 'Русский',
            created: '03-02-2001',
            updated: '05-12-2021',
            danger: false,
            genre: [
                {
                    id: 1,
                    name: 'Фильмы',
                }
            ]
        },
    ];
}