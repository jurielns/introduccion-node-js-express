const { countries, languages } = require('countries-list');

const route = (app) => {
    app.get('/', (request, response) => {
        response.status(200).send('HELLO');
    });

    app.get('/info', (request, response) => {
        response.send('INFO nodemon');
    });

    app.get('/country', (request, response) => {
        // console.log('request', request.query);
        response.json(countries[request.query.code]);
    });

    app.get('/languages/:lang', (request, response) => {
        // console.log('request', request.params);
        const lang = languages[request.params.lang];
        if (lang) {
            response.json({
                status: 'OK',
                data: lang,
            });
        } else {
            response.status(404).json({
                status: 'NOT_FOUND',
                message: `Language ${request.params.lang} not found`,
            });
        }
    });

    app.get('*', (request, response) => {
        response.status(404).send('NO FOUND');
    });
};

module.exports = route;
