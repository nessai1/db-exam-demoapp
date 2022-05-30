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

    async getEditorData() {
        if (this.apiUrl === 'test')
        {
            return await (new Promise((resolve) => {
                const data = getTestEditor();
                resolve(data);
            }));
        }
    }

    async setSite(siteData) {

    }

}

function getTestEditor() {
    return {
        lang: [[1, 'Русский'], [2, 'English']],
        encode: [[1, 'utf-8'], [2, 'windows-1251']]
    };
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
            language: 'English',
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