const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');

const { addNewUserToJson, getParsedUsers } = require('./helpers/fsHelper');
const {
  NOT_FOUND,
  BAD_REQUEST,
  CONFLICT,
} = require('./configs/statusCodes.enum');
const { PORT } = require('./configs/portConfig');
const regExpHelper = require('./helpers/stringValidation');
const { renderErrorPage } = require('./helpers/sendErrorPage');
const {
  AUTH,
  REGISTER,
  USERS,
  SIGNUP,
  LOGIN,
} = require('./configs/routesConstants');
const {
  EMAIL_ALREADY_EXIST,
  INVALID_ID,
  PAGE_NOT_FOUND,
  WRONG_LOGIN,
  WRONG_SIGNUP,
  TO_LOGIN,
  TO_USERS,
  TO_SIGNUP,
} = require('./configs/stringConstants');

const app = express();
const staticPath = path.join(__dirname, 'static');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(staticPath));
app.set('view engine', '.hbs');
app.engine('.hbs', hbs({ defaultLayout: false }));
app.set('views', staticPath);

app.post(AUTH, async (req, res) => {
  const { email, password } = req.body;
  const sendErrorPage = () => {
    renderErrorPage(res, BAD_REQUEST, WRONG_LOGIN, REGISTER, TO_SIGNUP);
  };

  try {
    if (regExpHelper.checkIsValidLogin(email, password)) {
      const users = await getParsedUsers();
      const user = users.find(
        user => user.email === email && user.password === password
      );
      user ? res.redirect(USERS) : sendErrorPage();
    } else {
      sendErrorPage();
    }
  } catch (err) {
    console.log(err);
  }
});

app.post(SIGNUP, async (req, res) => {
  const { name, age, email, password } = req.body;

  try {
    if (regExpHelper.checkIsValidRegister(name, age, email, password)) {
      const users = await getParsedUsers();
      const isUserExist = users.find(user => user.email === email);

      if (isUserExist) {
        renderErrorPage(res, CONFLICT, EMAIL_ALREADY_EXIST, LOGIN, TO_LOGIN);

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

      res.redirect(LOGIN);
    } else {
      renderErrorPage(res, BAD_REQUEST, WRONG_SIGNUP, LOGIN, TO_LOGIN);
    }
  } catch (err) {
    console.log(err);
  }
});

app.get(USERS, async (req, res) => {
  const users = await getParsedUsers();
  res.render('users', { users });
});

app.get(`${USERS}/:user_id`, async (req, res) => {
  const { user_id } = req.params;
  const userIdInt = Number(user_id);
  const users = await getParsedUsers();
  const user = users.find(item => item.user_id === userIdInt);
  user
    ? res.render('user', { user })
    : renderErrorPage(res, BAD_REQUEST, INVALID_ID, USERS, TO_USERS);
});

app.get(LOGIN, (req, res) => {
  res.render('login');
});

app.get(REGISTER, (req, res) => {
  res.render('register');
});

app.use((req, res, next) => {
  renderErrorPage(res, NOT_FOUND, PAGE_NOT_FOUND, LOGIN, TO_LOGIN);
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
