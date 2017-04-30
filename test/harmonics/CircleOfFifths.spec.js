const chai = require('chai');
chai.should();

import cl from '../../src';

describe('cl.harmonics.CircleOfFifths', () => {
    it('rotates 1 step upwards', () => {
        const cof = new cl.harmonics.CircleOfFifths('C');
        cof.rotate(1);
        cof.note.should.be.instanceof(cl.harmonics.Note);
        cof.note.toString().should.equal('G');
        cof.coordinates.r.should.equal(1);
        cof.coordinates.s.should.equal(0);
    });

    it('shifts one step upwards', () => {
        const cof = new cl.harmonics.CircleOfFifths('C');
        cof.shift(1);
        cof.note.should.be.instanceof(cl.harmonics.Note);
        cof.note.toString().should.equal('C');
        cof.coordinates.r.should.equal(0);
        cof.coordinates.s.should.equal(1);
    });

    it('rotates 12 steps upwards', () => {
        const cof = new cl.harmonics.CircleOfFifths('C');
        cof.rotate(12);
        cof.note.should.be.instanceof(cl.harmonics.Note);
        cof.note.toString().should.equal('C');
        cof.coordinates.r.should.equal(0);
        cof.coordinates.s.should.equal(1);
    });

    it('rotates 16 steps upwards', () => {
        const cof = new cl.harmonics.CircleOfFifths('C');
        cof.rotate(16);
        cof.note.should.be.instanceof(cl.harmonics.Note);
        cof.note.toString().should.equal('E');
        cof.coordinates.r.should.equal(4);
        cof.coordinates.s.should.equal(1);
    });

    it('shifts one step upwards, then rotates 1 step downwards', () => {
        const cof = new cl.harmonics.CircleOfFifths('C');
        cof.shift(1);
        cof.rotate(-1);
        cof.note.should.be.instanceof(cl.harmonics.Note);
        //cof.note.toString().should.equal('F');
    });
});