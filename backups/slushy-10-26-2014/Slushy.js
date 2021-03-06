(function(){
  'use strict';

      var ArgsBace       = require('./classes/ArgsBase.class.js');
      var NameBase       = require('./classes/NameBase.class.js');
      var Promise        = require("bluebird");
      var Utility        = require('./util');
      var gulp           = require('gulp');
      var path           = require('path');
      var Base           = require('./classes/Base.class');
      var util           = require('util');
      var log            = console.log
      var Q              = require('q');
      var __           = require('underscore.string');
      var _              = require('../lodash.mixins.js');



      var Slushy = module.exports = (function() {
        'use strict';

        var __this = this;

        /**
         * Slushy Class. A configuration binding frame work for slush
         * @param {Object} tasks [A collection of gulp tasks]
         */
        function Slushy(plugins) {

          Base.apply(this, arguments);

          if (!(this instanceof Slushy)) {
            console.log('Creating a new instance of - ' + this._blue('Slushy'));
            return new Slushy(args);
          }
          this.log('using an instance of - [' + this._blue('Slushy')+']');

        }

        util.inherits(Slushy, Base);

          /**
           * Reseave the initial stream from gulp.
           * Create a new direction for the stream to take.
           * We will take the stream through a series of filters,
           * applying the necessary options needed for the generator downstream.
           *
           * Finally once we get downstream, we pass the stream back to it's original
           * path, and let it take it's course.
           *
           * @param  {[Function]} Stop_Gulp  [Gulp's callback to end the stream]
           * @return {[Function]}      [Gulp Callback]
           */
        Slushy.prototype.flow = function(gulp_callback, prompts){
          var __this = this;

          /**
           * Reseave the initial stream from gulp.
           * Create a new direction for the stream to take.
           * We will take the stream through a series of filters,
           * applying the necessary options needed for the generator downstream.
           *
           * Finally once we get downstream, we pass the stream back to it's original
           * path, and let it take it's course.
           *
           * @param  {[Function]} Stop_Gulp  [Gulp's callback to end the stream]
           * @return {[Function]}      [Gulp Callback]
           */
          return function ( Stop_Gulp ){
            var gulp_stream = this;
            /*
             * (This) is referes to the instanc of gulp.
             */
              var __slushy_stream = {}

              __slushy_stream.prompts = prompts;

              return __this
                  .initialize( gulp_stream, __slushy_stream )

                  .then(function (__slushy_stream){
                    console.log('initialize resolved')
                    /**
                     * Pass the stream in, to get the filters based on the user's desires.
                     */
                    return __this.ask(__slushy_stream);
                  })

                  .then(function (__slushy_stream){
                    __this.show('Ask Resolved')
                    /**
                     * __slushy_stream should now have both the prompts and the answers as properties.
                     * Now let's check and make sure this is not the default task... if so we are going to initialize
                     * our configuration tool.
                     *
                     */
                    return __this.filterStream( __slushy_stream );
                  })

                  .then(function (__slushy_stream){
                    __this.show('FilterStream Resolved')

                    /**
                     * Now, if the stream we just initialized, then it should have three major properties on it.
                     * @param  {Object}  __slushy_stream.prompts
                     * @param  {Object}  __slushy_stream.Answers
                     * @param  {Object}  __slushy_stream.Application
                     *
                     * Send the stream back into it's orgiginal stream, with all the added properties
                     * Alos the Stop_Gulp has yet to be exposed to the public, so we will do this here.
                     * usually gulp will call this method below, but we are calling it with a new stream coming in, before gulp
                     * begins to flow.
                     */
                    gulp_callback.apply(__this, [Stop_Gulp, __slushy_stream]);

                  })

            /**
             * Run the callback, binding this to it's context,
             * Also pass the configured options parameter.
             */

          }
        }

        Slushy.prototype.src = function(__slushy_stream){
          var __this = this;
          console.log("Finding Source Stream");
          __slushy_stream = __this.exposePaths(__slushy_stream);


          return __this.promise(__slushy_stream)

        }

        Slushy.prototype.pipe = function(__GenerateTemplates){

          var __this = this

          return function(__slushy_stream){
            __GenerateTemplates.call(__slushy_stream);
          }
        }
        Slushy.prototype.task = function(callback){

          var $ = this;
          return function(done){
            var task = $.isRunning(this.tasks);
            task.path = $.tasks[task.name];
            // task.path =
            if(!this.args[0]){
              $.nameError(this.seq[0]);
              return done();
            }
            var options = { ref: 'name', name: this.args[0], task:task };

            callback.apply($, [done, options]);
          }
        }

        Slushy.prototype.named = function(callback){
          return function(done){
            console.log(this.args);
          }
        }
        return Slushy;

      }());


})()


