/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />


import {CalculateData} from '../src/calculateData';

import {expect} from 'chai';

const paperSize1: any = {
    height: 400,
    width: 200
};
const paperSize2: any = {
    height: 200,
    width: 800
};
const maxDrawArea: any = {
    height: 400,
    width: 400
};

let sizeToAdapt = new CalculateData(
    {
        paperSize: paperSize1,
        maxDrawArea: maxDrawArea
    }
);

describe('getRatio', () => {

    if(paperSize1.width / paperSize1.height < 1) {
        it('should return size to adapt paperSize1.width / paperSize1.height < 1', () => {
            console.log('< 1');
            expect(sizeToAdapt.getRatio(
                paperSize1.width,
                paperSize1.height,
                maxDrawArea.width,
                maxDrawArea.height
            )).to.equal(1); //maxDrawHeight / paperHeight = 400 / 400 = 1
        })
    }

    if(paperSize2.width / paperSize2.height > 1) {
        it('should return size to adapt paperSize2.width / paperSize2.height > 1', () => {
            console.log('> 1');
            expect(sizeToAdapt.getRatio(
                paperSize2.width,
                paperSize2.height,
                maxDrawArea.width,
                maxDrawArea.height
            )).to.equal(0.5); //maxDrawWidth / paperWidth; = 400 / 800 = 0.5
        })
    }

});