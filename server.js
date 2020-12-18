const bodyParser = require('body-parser'); //faz o parser de dados para notacao em objeto
const express = require('express'); //framework para recursos basicos como criacao de rotas
const cors = require('cors'); //define meios para que um recurso do servidor seja acessado remotamente via web
const morgan = require('morgan'); //mostra quais requisicoes estao chegando por HTTP
const Factory = require('./server/lib/territories/territories.factory'); //abstrai a criacao de um objeto
const { PORT } = require('./server/lib/config/config.app');
const MongoAdapter = require('./server/lib/adapters/adapters.mongo');
const Logger = require('./server/logger')('./server.js');
const territories = require('./server/lib/territories/territories.route');
const squares = require('./server/lib/squares/squares.route');
const errors = require('./server/lib/errors/errors.route');
const app = express();
const mongoAdapter = MongoAdapter();
global.factory = new Factory();

app.set('port', PORT);
app.use(morgan(':method :url - :status', { stream: Logger.stream }));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.set('views', './public/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.get('/dashboard', (req, res) => res.render('dashboard'));
app.get('/', (req, res) => res.render('home'));
app.get('/home', (req, res) => res.render('home'));
app.use('/territories', territories);
app.use('/squares', squares);
app.use('/errors', errors);

function upServer() {
    if (process.env.NODE_ENV !== 'test') {
        mongoAdapter.connect()
            .then(() => {
                try {
                    app.listen(app.get('port'), (err) => {
                        if (err) {
                            Logger.error('Error when trying to listen: %j', err);
                            process.exit(1);
                        }
                        console.log('Server is running');
                    });
                } catch (err) {
                    Logger.error('Error when trying to listen: %j', err);
                }
            })
            .catch((err) => {
                Logger.error('Error when trying to connect with database: %j', err);
                process.exit(1);
            });
    }
}

upServer();

module.exports = app;