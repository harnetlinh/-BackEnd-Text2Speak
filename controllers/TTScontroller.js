	
  require('dotenv').config();
  var serveStatic = require('serve-static')
  const _ = require('lodash');
  const fs = require('fs');
  const path = require('path');

  const textToSpeech = require('@google-cloud/text-to-speech');
  
  const client = new textToSpeech.TextToSpeechClient();
  
  const request = {
    // The text to synthesize
    input: {
         ssml: "<speak>The <say-as interpret-as='characters'> SSML </say-as>"
        
        },
  
    // The language code and SSML Voice Gender
    voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
  
    // The audio encoding type
    audioConfig: { audioEncoding: 'MP3' },
  };
  const directory = 'samples';

  function DeleteAllSamples(){
    fs.readdir(directory, (err, files) => {
      if (err) throw err;
  
      for (const file of files) {
        fs.unlink(path.join(directory, file), err => {
          if (err) throw err;
        });
      }
    });
  };
  
    exports.getAudio = (req,res)=>{
        client.synthesizeSpeech(request)
        .then(async (response) => {
        // console.log(response);
        var test = response[0].audioContent;
        const audioContent = _.get(response[0], 'audioContent');
        var currentdate = new Date(); 
        var datetime = "audio_" + currentdate.getDate() +
          + (currentdate.getMonth()+1)  + 
          + currentdate.getFullYear() +  
          + currentdate.getHours() + 
          + currentdate.getMinutes() +
          + currentdate.getSeconds();
        var nameFile = datetime+'.mp3';
        var outputFileName = './public/'+nameFile;
        if (audioContent) {
          fs.writeFileSync(outputFileName, audioContent, 'binary')
          res.json({mp3:'http://localhost:3000/mp3/'+nameFile});
          DeleteAllSamples();
            console.log(`Audio content successfully written to file: ${outputFileName}`);
        } else {
            console.log('Failed to get audio content');
        }
        })
        .catch((err) => {
        console.error('ERROR:', err);
        });
    }