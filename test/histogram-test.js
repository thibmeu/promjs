import Histogram from '../src/histogram';

describe('Histogram', function () {
  let histogram;

  beforeEach(() => {
    histogram = new Histogram([
      200,
      400,
      750,
      1000
    ]);
  });
  it('observes some values', () => {
    histogram.observe(380);
    histogram.observe(400);
    histogram.observe(199);
    const result = histogram.collect();
    result.length.should.equal(1);
    result[0].value.should.containEql({
      sum: 979,
      count: 3,
      entries: {
        '200': 1,
        '400': 1,
        '750': 0,
        '1000': 0
      }
    });
  });
  it('clears observed values', () => {
    histogram.observe(380);
    histogram.observe(400);
    histogram.observe(199);
    histogram.reset();
    const result = histogram.collect();
    result.should.deepEqual([{
      value: {
        sum: 0,
        count: 0,
        raw: [],
        entries: {
          '200': 0,
          '400': 0,
          '750': 0,
          '1000': 0
        }
      }
    }]);
    result.length.should.equal(1);
  });
});
