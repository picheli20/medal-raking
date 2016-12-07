import { ScoreBoard } from './scoreBoard/score-board.service';
import { IScoreEntity } from './scoreBoard/mock';
import { EntityGroupper } from '../util/entityGroupper';

export class Manager {

    public event:   { [id: string]: EntityGroupper<IScoreEntity>; } = {};
    public country: { [id: string]: EntityGroupper<IScoreEntity>; } = {};
    public athlete: { [id: string]: EntityGroupper<IScoreEntity>; } = {};

    populateClasses(data: IScoreEntity[]) {
        data.map((item: IScoreEntity) => {
            this.populateEntity(this.country, item, 'country');
            this.populateEntity(this.athlete, item, 'athlete');
            this.populateEntity(this.event, item, 'event');
        });
    }

    // popupale a EntityGroupper list and the medal quantity 
    populateEntity(entities: { [id: string]: EntityGroupper<IScoreEntity>; }, item: IScoreEntity, itemAtt: string) {

        let entity : EntityGroupper<IScoreEntity> = entities[item[itemAtt]]

        if (!entity) {
            entity = new EntityGroupper<IScoreEntity>();
            entities[item[itemAtt]] = entity; // avoid to lost the reference
        }


        entity.id = item[itemAtt];
        entity.list.push(item);
        if (!entity.medals[item.medal]) {
            entity.medals[item.medal] = 0;
        }
        entity.medals[item.medal]++;
        entity.position += this.getMedalWeight(item.medal);
    }

    // weight to make easier the sort
    getMedalWeight(medal: string) {
        switch (medal) {
            case 'Gold':
                return 10000000000;
            case 'Silver':
                return 100000;
            case 'Bronze':
                return 1;
        }
    }
}
