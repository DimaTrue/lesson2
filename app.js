const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');

const { PORT } = require('./configs/portConfig');
const { authRouter, userRouter } = require('./routers');
const { renderErrorPageController } = require('./controllers');

const app = express();
const staticPath = path.join(__dirname, 'static');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(staticPath));
app.set('view engine', '.hbs');
app.engine('.hbs', hbs({ defaultLayout: false }));
app.set('views', staticPath);

app.use('/', authRouter);

app.use('/users', userRouter);

app.use(renderErrorPageController);

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`🚀 Server running on port: ${PORT}`));
