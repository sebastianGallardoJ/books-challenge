const express = require('express');
const mainRouter = require('./routes/main');
const methodOverride = require('method-override');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.use('/', mainRouter);

app.use(methodOverride('_method'));

app.listen(3001, () => {
  console.log('listening in http://localhost:3001');
});
