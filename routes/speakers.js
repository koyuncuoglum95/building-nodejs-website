const express = require('express');

// This is the import of Router library.
const router = express.Router();

module.exports = params => {
    // We carry the speakersService to here from index.js with params
    const { speakersService } = params;
    router.get('/', async (request, response) => {
        const speakers = await speakersService.getList();
        response.render('layout', { pageTitle: 'Speakers', template: 'speakers', speakers });
        

    });
    
    // We can also use middleware everywhere and import the splitted files
    router.post('/:shortname', async (request, response) =>{
    const speaker = await speakersService.getSpeaker(request.params.shortname);
    console.log(speaker); 
    response.render('layout',{pageTitle: 'Speakers', template: 'speakers-detail', speaker});
});
    return router;
};
