import { ScoreBoard } from './score-board.service';
import { IScoreEntity } from './mock';

describe('service ScoreBoard', () => {
    let score: ScoreBoard;
    let httpBackend: angular.IHttpBackendService;
    let log: angular.ILogService;

    beforeEach(angular.mock.module('medalRaking'));

    beforeEach(inject((scoreBoard: ScoreBoard, $httpBackend: angular.IHttpBackendService, $log: angular.ILogService) => {
        score = scoreBoard;
        httpBackend = $httpBackend;
        log = $log;
    }));

    it('should be registered', inject(() => {
        expect(score).not.toEqual(undefined);
        expect(score).not.toEqual(null);
    }));

    it('should get a empty medal list', inject(() => {
        httpBackend.when('GET', score.path).respond(200, []);
        let data: IScoreEntity[];
        score.get().then((resp: IScoreEntity[]) => {
            data = resp;
        });
        httpBackend.flush();
        expect(data.length).toBe(0);
    }));


    it('should get a empty medal list', inject(() => {
        httpBackend.when('GET', score.path).respond(200, [
            {
                'athlete': 'GHARIB, Jaouad',
                'country': 'MAR',
                'sex': 'Men',
                'event': 'marathon',
                'medal': 'Silver'
            },
            {
                'athlete': 'ZHOU, Chunxiu',
                'country': 'CHN',
                'sex': 'Women',
                'event': 'marathon',
                'medal': 'Bronze'
            },
            {
                'athlete': 'TOMESCU, Constantina',
                'country': 'ROU',
                'sex': 'Women',
                'event': 'marathon',
                'medal': 'Gold'
            },
            {
                'athlete': 'NDEREBA, Catherine',
                'country': 'KEN',
                'sex': 'Women',
                'event': 'marathon',
                'medal': 'Silver'
            },
            {
                'athlete': 'YURCHENKO, Denys',
                'country': 'UKR',
                'sex': 'Men',
                'event': 'pole vault',
                'medal': 'Bronze'
            }]);
        let data: IScoreEntity[];

        score.get().then((resp: IScoreEntity[]) => {
            data = resp;
        });
        httpBackend.flush();
        expect(data.length).toBe(5);
    }));


    it('should log a error', inject(() => {
        httpBackend.when('GET', '/assets/json/olympics_2008_medalists.json').respond(500);
        let data: IScoreEntity[];
        score.get().then((resp: IScoreEntity[]) => {
            data = resp;
        });
        httpBackend.flush();
        expect(log.error.logs).toEqual(jasmine.stringMatching('XHR Failed for'));
    }));
});
