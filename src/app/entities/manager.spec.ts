import { Manager } from './manager';

/* tslint:disable: no-string-literal */
describe('class Manager', () => {
    let mgr: Manager;

    beforeEach(angular.mock.module('medalRaking'));

    beforeEach(inject((manager: Manager) => {
        mgr = manager;
    }));

    it('should be registered', inject(() => {
        expect(mgr).not.toEqual(undefined);
        expect(mgr).not.toEqual(null);
    }));

    it('should acept empty object', inject(() => {
        mgr.populateClasses([]);
        expect(mgr.athlete).toEqual({});
        expect(mgr.country).toEqual({});
        expect(mgr.athlete).toEqual({});
    }));

    it('should populate the correct lists', inject(() => {
        mgr.populateClasses([
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
        expect(mgr.athlete['GHARIB, Jaouad'].list.length).toBe(2);
        expect(mgr.athlete['ZHOU, Chunxiu'].list.length).toBe(1);
        expect(mgr.country['MAR'].list.length).toBe(2);
        expect(mgr.country['CHN'].list.length).toBe(1);
        expect(mgr.event['marathon'].list.length).toBe(3);
    }));

    it('should have the correct medals', inject(() => {
        mgr.populateClasses([
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
            },
            {
                'athlete': 'ZHOU, Chunxiu',
                'country': 'CHN',
                'sex': 'Women',
                'event': '100m',
                'medal': 'Bronze'
            },
            {
                'athlete': 'ZHOU, Chunxiu',
                'country': 'CHN',
                'sex': 'Women',
                'event': '100m',
                'medal': 'BlaBla'
            }
        ]);
        expect(mgr.event['marathon'].medals['Bronze']).toBe(2);
        expect(mgr.event['marathon'].medals['Silver']).toBe(1);
        expect(mgr.athlete['ZHOU, Chunxiu'].medals['Bronze']).toBe(2);
        expect(mgr.athlete['ZHOU, Chunxiu'].medals['BlaBla']).toBe(1);
    }));

    it('should have the correct order', inject(() => {
        mgr.populateClasses([
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
            },
            {
                'athlete': 'ZHOU, Chunxiu',
                'country': 'CHN',
                'sex': 'Women',
                'event': '100m',
                'medal': 'Bronze'
            },
            {
                'athlete': 'ZHOU, Chunxiu',
                'country': 'CHN',
                'sex': 'Women',
                'event': '100m',
                'medal': 'Silver'
            },
            {
                'athlete': 'OLIVEIRA, Alan',
                'country': 'BRA',
                'sex': 'Women',
                'event': '100m',
                'medal': 'Gold'
            }
        ]);
        expect(mgr.country['BRA'].position).toBeGreaterThan(mgr.country['CHN'].position);
        expect(mgr.country['CHN'].position).toBeGreaterThan(mgr.country['MAR'].position);
        expect(mgr.country['BRA'].position).toBeGreaterThan(mgr.country['MAR'].position);
    }));

});