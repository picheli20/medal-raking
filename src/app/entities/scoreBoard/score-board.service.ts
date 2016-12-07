import { IScoreEntity } from './mock';

export class ScoreBoard {
    static $inject = ['$log', '$http'];
    public path: string = '/assets/json/olympics_2008_medalists.json';

    constructor(private $log: angular.ILogService, private $http: angular.IHttpService) {
    }

    get(): angular.IPromise<IScoreEntity[]> {
        return this.$http.get(this.path)
            .then((response: any): IScoreEntity[] => {
                return response.data;
            })
            .catch((error: any): any => {
                this.$log.error('XHR Failed for getContributors.\n', error.data);
            });
    }
}
