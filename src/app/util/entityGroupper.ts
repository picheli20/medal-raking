/**
 * Simple class to hold the list with the total of the medals
 */
export class EntityGroupper<T>{
    public list: T[] = [];
    public medals: { [id: string] : number; } = {};
    public position: number = 0;
    public id: String;
}
