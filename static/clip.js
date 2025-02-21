document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.highlight pre').forEach(block => {
    block.style.cursor = 'pointer';
    block.addEventListener('click', e => {
      navigator.clipboard.writeText(block.innerText).then(() => {
        const popup = document.createElement('div');
        popup.innerText = 'Copied!';
        Object.assign(popup.style, {
          position: 'absolute',
          pointerEvents: 'none',
          opacity: '1',
          transition: 'opacity 1s, transform 1s',
        });
        if (getComputedStyle(block).position === 'static') block.style.position = 'relative';
        const { left, top } = block.getBoundingClientRect();
        popup.style.left = `${e.clientX - left}px`;
        popup.style.top = `${e.clientY - top}px`;
        block.appendChild(popup);
        requestAnimationFrame(() => {
          popup.style.opacity = '0';
          popup.style.transform = 'translateY(-20px)';
        });
        setTimeout(() => popup.remove(), 1000);
      }).catch(console.error);
    });
  });
});
