function createAnalitics() {
  console.log('test');

  let counter = 0;

  console.log(counter);

  let isDestroyed = false;
  const listener = () => (counter += 1);
  document.addEventListener('click', listener);

  return {
    destroy() {
      document.removeEventListener('click', listener);
      isDestroyed = true;
    },
    getClicks() {
      if (isDestroyed) {
        return `Analitics is destroyed. Total clicks = ${counter}`;
      }
      return counter;
    },
  };
}

window.analytics = createAnalitics();
