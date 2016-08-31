var expect = require('chai').expect;
var lib = require('./index');

describe('diacritic-regex', function(){

    describe('toRegex', function(){

        it('changes string to regex group', function(){

            expect(lib.toRegex()('abe').toString()).to.equal('/[' + lib.mappings.a + ']b[' + lib.mappings.e + ']/i')
            expect(lib.toRegex()('àbé').toString()).to.equal('/[' + lib.mappings.a + ']b[' + lib.mappings.e + ']/i')

        })

        it('returns unchanged regex when no diacritic chars', function(){

            expect(lib.toRegex()('pqrst').toString()).to.equal('/pqrst/i')

        })

        it('changes flag', function(){

            expect(lib.toRegex({flags:'m'})('pqrst').toString()).to.equal('/pqrst/m')

        })

        it('allows new mappings', function(){

            var tr = lib.toRegex({
                mappings: {
                    '~': '/~`',
                    't': 'tT'
                }
            })

            expect(tr('~lt').toString()).to.equal('/[\\/~`]l[tT]/i')
            expect(tr('~lt').test('omg `lT')).to.equal(true)

        })

    })

    describe('toString', function(){

        it('returns unchanged string when no diacritics', function(){

            expect(lib.toString()('pqrst')).to.equal('pqrst')

        })

        it('returns changed string when no diacritics', function(){

            expect(lib.toString()('pqrst')).to.equal('pqrst')

        })

        it('allows new mappings', function(){

            expect(lib.toString({
                mappings: {
                    '~': '/~`',
                    't': 'tT'
                }
            })('~lt')).to.equal('[/~`]l[tT]')

            expect(lib.toString({
                mappings: {
                    'e': 'e'
                }
            })('e')).to.equal('e')

            var ts = lib.toString({
                mappings: {
                    '*': ['\\S+'],
                    'e': ['e']
                }
            });

            expect(ts('e*e')).to.equal('e\\S+e')
            expect(new RegExp(ts('jogue * bola')).test('jogue poké bola')).to.equal(true)

            ts = lib.toString({
                mappings: {
                    '*': ['\\w+','\\d+']
                }
            });

            expect(ts('e*e')).to.equal('[' + lib.mappings.e + ']\\w+\\d+[' + lib.mappings.e + ']')
            expect(new RegExp(ts('jogue * bola')).test('jogue zzzz0 bola')).to.equal(true)

        })

    })

})
