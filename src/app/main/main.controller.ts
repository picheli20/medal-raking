import { ScoreBoard } from '../entities/scoreBoard/score-board.service';
import { IScoreEntity } from '../entities/scoreBoard/mock';
import {Manager } from '../entities/manager';

export class MainController {
  public manager : Manager;
  /* @ngInject */
  constructor(manager: Manager, public $mdDialog: ng.material.IDialogService, scoreBoard: ScoreBoard) {
    this.manager = manager;
    scoreBoard.get().then((data: IScoreEntity[]) => {
      this.manager.populateClasses(data);
    });
  }
}
