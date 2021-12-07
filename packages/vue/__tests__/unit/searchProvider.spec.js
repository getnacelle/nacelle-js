import Fuse from 'fuse.js';

describe('Simulate & test what the search provider does', () => {
  it('searches through searchData', () => {
    const searchData = [
      { id: 1, content: { title: 'one' } },
      { id: 2, content: { title: 'two' } },
      { id: 3, content: { title: 'onetwo' } }
    ];
    const searchOptions = {
      relevanceThreshold: 0.5,
      keys: ['content.title']
    };
    const results = new Fuse(searchData, searchOptions)
      .search(String('one'))
      .filter((result) => typeof result.item !== 'undefined')
      .map((result) => result.item);
    expect(results).toEqual([
      { id: 1, content: { title: 'one' } },
      { id: 3, content: { title: 'onetwo' } }
    ]);
  });
});
