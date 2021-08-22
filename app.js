const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');

const { getParsedUsers, addNewUserToJson } = require('./helpers/fsHelper');
const regExpHelper = require('./helpers/stringValidation');
const { PORT } = require('./configs/portConfig');
const statusCodes = require('./configs/statusCodes.enum');

const app = express();
const staticPath = path.join(__dirname, 'static');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(staticPath));
app.set('view engine', '.hbs');
app.engine('.hbs', hbs({ defaultLayout: false }));
app.set('views', staticPath);

app.post('/auth', async (req, res) => {
  const { email, password } = req.body;

  const sendErrorPage = () => {
    res.status(statusCodes.BAD_REQUEST).render('errorPage', {
      errorMessage:
        'Invalid credentials. Please check your email, password and try again. Or register',
      link: '/register',
      title: 'To register page',
    });

    return;
  };

  try {
    if (regExpHelper.checkIsValidLogin(email, password)) {
      const users = await getParsedUsers();
      const user = users.find(
        user => user.email === email && user.password === password
      );
      user ? res.redirect('/users') : sendErrorPage();

      return;
    }

    sendErrorPage();
  } catch (err) {
    console.log(err);
  }
});

app.post('/signup', async (req, res) => {
  const { name, age, email, password } = req.body;

  try {
    if (regExpHelper.checkIsValidRegister(name, age, email, password)) {
      const users = await getParsedUsers();
      const isUserExist = users.find(user => user.email === email);

      if (isUserExist) {
        res.status(statusCodes.BAD_REQUEST).render('errorPage', {
          errorMessage:
            'This email already exists. Please check your email and try again. Or login',
          link: '/login',
          title: 'To login page',
        });

        return;
      } else {
        addNewUserToJson(users, {
          user_id: users.length + 1,
          name,
          age,
          email,
          password,
        });
      }

      res.redirect('/login');
    } else {
      res.status(statusCodes.BAD_REQUEST).render('errorPage', {
        errorMessage:
          'Invalid credentials. Please check your name, age, email, password and try again.',
        link: '/login',
        title: 'To login page',
      });

      return;
    }
  } catch (err) {
    console.log(err);
  }
});

app.get('/users', async (req, res) => {
  const users = await getParsedUsers();
  res.render('users', { users });
});

app.get('/users/:user_id', async (req, res) => {
  const { user_id } = req.params;
  const userIdInt = Number(user_id);
  const users = await getParsedUsers();
  const user = users.find(item => item.user_id === userIdInt);
  res.render('user', { user });
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.use((req, res, next) => {
  res.status(statusCodes.BAD_REQUEST).render('errorPage', {
    errorMessage: 'Page not found',
    link: '/login',
    title: 'To Login page',
  });
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
