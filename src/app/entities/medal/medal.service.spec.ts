import { MedalService } from './medal.service';
import { Result } from './medal.mock';

describe('service MedalService', () => {
    let medalS: MedalService;
    let httpBackend: angular.IHttpBackendService;

    beforeEach(angular.mock.module('medalRaking'));

    beforeEach(inject((medalService: MedalService, $httpBackend: angular.IHttpBackendService) => {
        medalS = medalService;
        httpBackend = $httpBackend;
    }));

    it('should be registered', inject(() => {
        expect(medalS).not.toEqual(undefined);
        expect(medalS).not.toEqual(null);
    }));

    it('should get the medal list', inject(() => {
        httpBackend.when('GET', 'json/olympics_2008_medalists.json').respond(200, []);
        let data: any;
        /*
        movieService.getMovies('300').then((movie: any) => {
            data = movie;
        });
        httpBackend.flush();
        expect(data.length).toBe(2);
        expect(data[0].title).toBe('300');*/
    }));

});