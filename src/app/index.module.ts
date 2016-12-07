/// <reference path="../../typings/index.d.ts" />

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';
import { Manager } from './entities/manager';
import { ScoreBoard } from './entities/scoreBoard/score-board.service';



declare var malarkey: any;
declare var moment: moment.MomentStatic;

module medalRaking {
  'use strict';

  angular.module('medalRaking', ['ui.router', 'ngMaterial', 'toastr', 'md.data.table', 'ngOrderObjectBy'])
    .controller('MainController', MainController)
    .service('scoreBoard', ScoreBoard)
    .service('manager', Manager)
    .config(config)
    .config(routerConfig)
    .run(runBlock);
}
