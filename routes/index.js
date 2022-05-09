const express = require('express');

const speakerRouter = require('./speakers');
const feedbackRouter = require('./feedback');

// This is the import of Router library.
const router = express.Router();

module.exports = params => {
    const { speakerService } = params;

    router.get('/', async (request, response) => {
        const topSpeakerss = await speakerService.getList();
        response.render('layout', { pageTitle: 'Welcome', template: 'index', topSpeakerss });
        

    });
    // We can also use middleware everywhere and import the splitted files
    // params is feedBackService and speakerService from server.js file
    router.use('/speakers',speakerRouter(params));
    router.use('/feedback',feedbackRouter(params));
    return router;
};
