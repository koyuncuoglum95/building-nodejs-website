const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');

// This imports the splitted routes files.
const routes = require('./routes');

const FeedbackService = require('./services/FeedbackService');
const SpeakerService = require('./services/SpeakerService');

// We are adding Json files into provided directory JS files.
const feedBackService = new FeedbackService('./data/feedback.json');
const speakerService = new SpeakerService('./data/speakers.json');

const app = express();
const port = 3000;

// This code should be added to work cookie system
app.set('trust proxy',1);

// cookie configuration
app.use(cookieSession({
    name: 'session',
    keys: ['Ghdur687399s7w','hhjjdf89s866799'],
})
);


// This following code enable us to use ejs in express.js
// view engine ejs also help us to not write .ejs in ejs files.
// This also enables the splitted files

app.set('view engine', 'ejs');

// This code shows the all files in views directory
app.set('views', path.join(__dirname,'./views'));

// siteName variable is a variable of local too and can be used in any file.
app.locals.siteName = " ROUX Meetups";


// We added whole static directory here
app.use(express.static(path.join(__dirname,'./static')));

// someVariable is a variable of locals and can be used any files
app.use(async (request, response, next) => {
    try {
        const names = await speakerService.getNames();
        response.locals.speakerNames = names;
        console.log(response.locals);
        return next();
    } catch (error) {
        return next(error);
    }
})

// This is a middleware of showing routes instead of app.get or app.post
// This following code is a middleware
// Middleware is the splitted version of .get .post .put routes in express.js

// We are using added json files with provided directory files in routes directory files
app.use('/', routes({
    feedBackService,
    speakerService,
}));

app.listen(port , () => {
    console.log(`Server is listening on port ${port} !`);
})