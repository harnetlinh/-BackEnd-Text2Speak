	
  require('dotenv').config();
  
  const _ = require('lodash');
  const fs = require('fs');
  
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
  
  const outputFileName = 'output.mp3';
  
  
    exports.getAudio = (req,res)=>{
        client.synthesizeSpeech(request)
        .then(async (response) => {
        console.log(response);
        const audioContent = _.get(response[0], 'audioContent');
    
        if (audioContent) {
            fs.writeFileSync(outputFileName, audioContent, 'binary');
    
            console.log(`Audio content successfully written to file: ${outputFileName}`);
            res.status(200).json({"mp3":audioContent});
        } else {
            console.log('Failed to get audio content');
        }
        })
        .catch((err) => {
        console.error('ERROR:', err);
        });
    }