import { MainController } from './main.controller';
import { ScoreBoard } from '../entities/scoreBoard/score-board.service';

describe('controllers', () => {
  let mainController: MainController;
  let score: ScoreBoard;
  let httpBackend: angular.IHttpBackendService;

  beforeEach(angular.mock.module('medalRaking'));

  beforeEach(inject(($controller: angular.IControllerService, $httpBackend: angular.IHttpBackendService, scoreBoard: ScoreBoard) => {
    mainController = $controller('MainController');
    httpBackend = $httpBackend;
    score = scoreBoard;
  }));

  it('should be registered', inject(() => {
    expect(mainController).not.toEqual(undefined);
    expect(mainController).not.toEqual(null);
  }));

  it('should create scoreBoard', inject(() => {
    httpBackend.when('GET', score.path).respond(200, [
      {
        'athlete': 'GHARIB, Jaouad',
        'country': 'MAR',
        'sex': 'Men',
        'event': 'marathon',
        'medal': 'Silver'
      },
      {
        'athlete': 'GHARIB, Jaouad',
        'country': 'MAR',
        'sex': 'Men',
        'event': 'marathon',
        'medal': 'Bronze'
      },
      {
        'athlete': 'ZHOU, Chunxiu',
        'country': 'CHN',
        'sex': 'Women',
        'event': 'marathon',
        'medal': 'Bronze'
      }
    ]);
    httpBackend.flush();

    expect(mainController.manager.athlete).not.toEqual({});
    expect(mainController.manager.country).not.toEqual({});
    expect(mainController.manager.event).not.toEqual({});
  }));

});
