export default onmessage = async function (e) {
  const response = await fetch(`${e.data.origin}/data/search.json`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  postMessage(data);
};
