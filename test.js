/**
 * @author Titus Wormer
 * @copyright 2016 Titus Wormer
 * @license MIT
 * @module
 * @fileoverview Test suite for `retext-repeated-words`.
 */

'use strict';

/* Dependencies. */
var test = require('tape');
var retext = require('retext');
var repeated = require('./');

/* Tests. */
test('repeatedWords()', function (t) {
  t.deepEqual(
    retext().use(repeated).process([
      'Well, it it doesn’t have to to be. Like a fish in the',
      'the sea.'
    ].join('\n')).messages.map(String),
    [
      '1:7-1:12: Expected `it` once, not twice',
      '1:26-1:31: Expected `to` once, not twice',
      '1:51-2:4: Expected `the` once, not twice'
    ],
    'should catch repeated words'
  );

  t.deepEqual(
    retext().use(repeated).process([
      'LIKE A FISH IN THE',
      'THE SEA.'
    ].join('\n')).messages.map(String),
    ['1:16-2:4: Expected `THE` once, not twice'],
    'should catch repeated words when uppercase'
  );

  t.deepEqual(
    retext().use(repeated).process('Duran Duran is awesome.').messages,
    [],
    'should ignore sentence cased words'
  );

  t.deepEqual(
    retext().use(repeated).process('D. D. will pop up with.').messages,
    [],
    'should ignore initialisms'
  );

  t.deepEqual(
    retext().use(repeated).process('DURAN Duran').messages,
    [],
    'should ignore differently cases words'
  );

  t.deepEqual(
    retext().use(repeated).process('the most heartening exhibition they had had since').messages,
    [],
    'should ignore some valid repetitions'
  );

  t.deepEqual(
    retext().use(repeated).process('The Mau Mau Uprising, also known as the Mau Mau Rebellion, Mau Mau Revolt, or Kenya Emergency, was a military conflict that took place in British Kenya').messages,
    [],
    'should ignore some valid repetitions (mau)'
  );

  t.end();
});
