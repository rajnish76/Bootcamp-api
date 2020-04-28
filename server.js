const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const cors = require('cors');
const morgan = require('morgan');
const fileupload = require('express-fileupload');
const path = require('path');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');

const connectdb = require('./config/db');
const Bootcamp = require('./routes/bootcamp');
const errorHandler = require('./middleware/error');
const Course = require('./routes/course');
const Auth = require('./routes/auth');
const User = require('./routes/user');
const Review = require('./routes/review');

dotenv.config({ path: './config/config.env' });

connectdb();

app.use(helmet());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());

app.use(mongoSanitize());

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 10 minutes
  max: 1000, // limit each IP to 1000 requests per windowMs
});
app.use(limiter);

app.use(hpp());

app.use(cors());

app.use(morgan('tiny'));

app.use(fileupload());

app.use('/api/v1/bootcamps', Bootcamp);
app.use('/api/v1/courses', Course);
app.use('/api/v1/auth', Auth);
app.use('/api/v1/user', User);
app.use('/api/v1/reviews', Review);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Running on ${PORT}`));
