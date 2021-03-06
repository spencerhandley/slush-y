;(function(){

  'use strict';

  var _     = require('lodash');
  var Q     = require('Q');
  var _str  = require('underscore.string');


  /**
   * Interact with Base.Config;
   */


  var Config            = module.exports;
      Config.get        = get;
      Config.set        = set;
      Config.store      = store;
      Config.initConfig = initConfig;


  //////////////////////////


  function get(key){
    var __this = this;
    if(!key){ return __this.__config.getAll(); }
    return __this.__config.get(key);
  }

  function set(key, value){
    var __this = this;
    __this.__config.set(key, value);
  }

  function store(options) {
    var __this = this;
    _(options).forEach(function (value, key){

      __this.__config.set(key, value);

    });
  }

  function initConfig(__slushy_stream){
    var __this = this;

    // var $promised = Q.defer();

    /**
     * Store defaults into configuration before retrieval;
     */
    var config = __this.get();
    config.appName = __slushy_stream.answers.appName;


    __this.info('Initializing Configuration from Base')

    __this.str(__slushy_stream.answers.appName, 'application', config).value;

    config.clientDir    = __this.get('__clientDir')
    config.serverDir    = __this.get('__serverDir')
    config.appDir       = __this.get('__appDir');
    config.modulesDir   = __this.get('__moduleDir');
    config.auth         = true;
    // Defaults
    config.httpType     = 'http';
    config.script       = 'js';
    config.styles       = 'css';

    // Defaults
    config.http         = true;
    config.restangular  = false;

    // Defaults
    config.js           = true;
    config.coffee       = false;

    // Defaults
    config.css          = true;
    config.stylus       = false;
    config.sass         = false;
    config.less         = false;
    config.modules = [
      'core',
      'authentication',
      'administration',
      'generators'
    ];

    _(config.modules).forEach(function (item, key){
      config[key] = _str.contains(config.modules, key);
    })

    __this.store(config);

    __slushy_stream.application = __this.get();
    // console.log(__slushy_stream)
    // $promised.resolve(__this.get())
    // return $promised.promise;
    return __slushy_stream;
  }



}).call(this);