document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', async e => {
    const pre = e.target.closest('.highlight pre');
    if (!pre) return;

    // try modern clipboard, fall back to execCommand
    try {
      await navigator.clipboard.writeText(pre.innerText);
    } catch {
      const range = document.createRange();
      range.selectNodeContents(pre);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      document.execCommand('copy');
      sel.removeAllRanges();
    }

    // feedback
    const pop = document.createElement('div');
    pop.textContent = 'Copied!';
    Object.assign(pop.style, {
      position: 'absolute',
      pointerEvents: 'none',
      transition: 'opacity 1s, transform 1s',
      opacity: '1'
    });

    if (getComputedStyle(pre).position === 'static') pre.style.position = 'relative';
    const { left, top } = pre.getBoundingClientRect();
    pop.style.left = `${e.clientX - left}px`;
    pop.style.top  = `${e.clientY - top}px`;
    pre.appendChild(pop);

    requestAnimationFrame(() => {
      pop.style.opacity = '0';
      pop.style.transform = 'translateY(-20px)';
    });
    setTimeout(() => pop.remove(), 1000);
  });
});
