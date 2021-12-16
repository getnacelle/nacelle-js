export default onmessage = function (e) {
  self.importScripts('https://cdn.jsdelivr.net/npm/fuse.js/dist/fuse.min.js');
  const { searchData, options, value } = e.data;
  // eslint-disable-next-line no-undef
  const results = new Fuse(searchData, options)
    .search(String(value))
    .filter((result) => typeof result.item !== 'undefined')
    .map((result) => result.item);

  postMessage(results);
};
