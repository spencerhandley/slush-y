
;(function(){

  'use strict';


    module.exports = prompts;


    function prompts(slushy){

      var questions = [{

          type: 'list',
          name: 'moduleName',
          default: 'core',
          message: 'Which module does this filter belongs to?',
          choices: [{
              name: 'core',
              value: 'core'
            },{
              name: 'authentication',
              value: 'authentication'
          }]
        }];

      questions = slushy.findModules( questions );

      return questions;

    }


}).call(this);