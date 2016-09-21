'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var mkdirp = require('mkdirp');
var yosay = require('yosay');
var camelCase = require('camelcase');
var hookPoints = require('./hookPoints.json');
var hookPointsmenu = require('./hookPointsmenu.json');

    module.exports = yeoman.Base.extend({
        prompting: function () {
            this.log(yosay(
                'Welcome to the first-class ' + chalk.red('generator-eccube-2-plugin') + ' generator!'
            ));
        var baseName = camelCase(require('path').basename(process.cwd()));
        var BaseName = baseName.charAt(0).toUpperCase() + baseName.slice(1);
        var hookPointstype = [];
            for(var key in hookPointsmenu){
                hookPointstype.push(key);
            }
        var prompts = [
            {
                name: "code",
                message: "プラグインのコードは？（システム的に使用）",
                default:BaseName
            },{
                name: "name",
                message: "プラグインの名前は？（表示に使用、日本語OK）",
                default:baseName
            },{
                name: "description",
                message: "プラグイン説明",
                default:''
            },{
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
                name: "hookPointsmenu",
                message: "フックポイントの種類は？",
                choices: hookPointstype
            }
        ];
        return this.prompt(prompts).then(function (props){
            this.props = props;
                this.props.hookPointsmenu = this.props.hookPointsmenu.map(function(hookPointmenu){
                return {
                    original:hookPointmenu
                    }
                })
            this.propsChoice = [];
            this.hookPointChoices = [];
            var yo = this;
            var q2 = function(key){
                yo.prompt([
                    {
                        type: 'checkbox',
                        name: "hookPoints",
                        message: key + "のフックポイントは？",
                        choices: hookPointsmenu[key]
                    }
                ]).then(function(propsChoice) {
                    yo.propsChoice = yo.propsChoice.concat(propsChoice);
                    if(yo.props.hookPointsmenu.length){
                        q2(yo.props.hookPointsmenu.shift().original);
                    }else{
                        for(var propsChoice of yo.propsChoice){
                            yo.hookPointChoices = yo.hookPointChoices.concat(propsChoice.hookPoints);
                        }
                        yo.props.hookPointsmenu.map(function(hookPointChoices){
                            return {
                                original:hookPointChoices,
                                cammelcased:camelCase(hookPointChoices)
                            }
                        })
                    }
                })
            };
            q2(this.props.hookPointsmenu.shift().original)
        }.bind(this));
    },
    writing: function () {
        this.template('plugin/Sample.php','plugin/'+this.props.class_name+'.php',this.props);
        this.template('plugin/plugin_info.php', 'plugin/plugin_info.php', this.props);
        this.template('build.sh', 'build.sh', this.props);
        mkdirp('plugin/templates');
        mkdirp('plugin/templates/admin');
        mkdirp('plugin/templates/default');
        mkdirp('plugin/templates/mobile');
        mkdirp('plugin/templates/sphone');
        var yomn = this;
        this.props.hookPointsmenu.map(function(hookPointChoices){
            yomn.template('Page.php', 'plugin/plg_'+this.props.class_name+hookPointChoices.cammelcased+'.php',{
                class_path:hookPointChoices.original.replace('LC_Page_','').replace(/_.*_action.*$/,'').toLowerCase(),
                new_class_name:'plg_'+this.props.class_name+yomn.hookPointChoices.cammelcased,
                original_class:hookPointChoices.original.replace(/_action.*$/,''),
            });
        });
    },
});
