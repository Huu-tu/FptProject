export const handleChangeHref = (cb: () => unknown) => {
  const observeUrlChange = () => {
    let oldHref = document.location.href;
    const observer = new MutationObserver(() => {
      if (oldHref !== document.location.href) {
        oldHref = document.location.href;
        cb();
      }
    });
    observer.observe(document, { childList: true, subtree: true });
  };
  window.onload = observeUrlChange;
};
