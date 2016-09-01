'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var camelCase = require('camelcase');
var hookPoints = require('./hookPoints.json');
module.exports = yeoman.Base.extend({
  prompting: function () {
    this.log(yosay(
      'Welcome to the first-class ' + chalk.red('generator-eccube-2-plugin') + ' generator!'
    ));
    var baseName = camelCase(require('path').basename(process.cwd()));
    var BaseName = baseName.charAt(0).toUpperCase() + baseName.slice(1);
    var prompts = [
      {
        name: "code",
        message: "プラグインのコードは？（システム的に使用）",
        default:BaseName
      },
      {
        name: "name",
        message: "プラグインの名前は？（表示に使用、日本語OK）",
        default:baseName
      },{
        name: "description",
        message: "プラグイン説明",
        default:''
      },
      {
        name: "class_name",
        message: "プラグインのクラス名は？",
        default:BaseName
      },{
        name: "version",
        message: "プラグインのバージョンは？",
        default:'0.1'
      },{
        name: "eccube_version",
        message: "ECCUBE本体の対応バージョンは？",
        default:'2.13.5'
      },{
        name: "author",
        message: "プラグインの作者は？",
        default:process.env.USER
      },{
        type: 'list',
        name: "license",
        message: "プラグインの作者は？",
        choices: ['MIT','LGPL','BSD','other']
      },{
        type: 'checkbox',
        name: "hookPoints",
        message: "フックポイント",
        choices: hookPoints
      }
    ];

    return this.prompt(prompts).then(function (props) {
      this.props = props;
      this.props.hookPoints = this.props.hookPoints.map(function(hookPoint){
        return {
          original:hookPoint,
          cammelcased:camelCase(hookPoint)
        }
      })
    }.bind(this));
  },

  writing: function () {
    this.template('plugin/Sample.php','plugin/'+this.props.class_name+'.php',this.props);
    this.template('plugin/plugin_info.php', 'plugin/plugin_info.php', this.props);
    this.template('build.sh', 'build.sh', this.props);
    this.mkdir('plugin/templates');
    this.mkdir('plugin/templates/admin');
    this.mkdir('plugin/templates/default');
    this.mkdir('plugin/templates/mobile');
    this.mkdir('plugin/templates/sphone');
    var yomn = this;
    this.props.hookPoints.map(function(hookPoint){
      yomn.template('Page.php', 'plugin/plg_'+yomn.props.class_name+hookPoint.cammelcased+'.php',{
        class_path:hookPoint.original.replace('LC_Page_','').replace(/_.*_action.*$/,'').toLowerCase(),
        new_class_name:'plg_'+yomn.props.class_name+hookPoint.cammelcased,
        original_class:hookPoint.original.replace(/_action.*$/,''),
      });
    });
  },
});
