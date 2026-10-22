(() => {
  const grid = document.getElementById('menu-grid');
  const search = document.getElementById('search');
  const filters = document.getElementById('filters');
  const cart = new Map();
  let selectedCategory = 'All';
  const money = value => `₹${value}`;
  const menu = () => QLStore.getMenu();

  QueueLessData.categories.forEach(category => {
    const button = document.createElement('button');
    button.className = `filter-button${category === selectedCategory ? ' selected' : ''}`;
    button.type = 'button'; button.textContent = category;
    button.addEventListener('click', () => {
      selectedCategory = category;
      filters.querySelectorAll('button').forEach(item => item.classList.toggle('selected', item === button));
      renderMenu();
    });
    filters.append(button);
  });

  function renderMenu() {
    const query = search.value.trim().toLowerCase();
    const items = menu().filter(item => (selectedCategory === 'All' || item.category === selectedCategory) && `${item.name} ${item.detail} ${item.tags.join(' ')}`.toLowerCase().includes(query));
    grid.replaceChildren();
    if (!items.length) {
      const empty = document.createElement('div'); empty.className = 'no-results'; empty.textContent = 'No menu items match that search.'; grid.append(empty); return;
    }
    items.forEach(item => {
      const card = document.createElement('article'); card.className = 'menu-card';
      const top = document.createElement('div'); top.className = 'menu-card-top';
      const icon = document.createElement('span'); icon.className = 'food-icon'; icon.setAttribute('aria-hidden', 'true'); icon.textContent = item.icon;
      const category = document.createElement('span'); category.className = 'category-label'; category.textContent = item.category;
      top.append(icon, category);
      const title = document.createElement('h3'); title.textContent = item.name;
      const detail = document.createElement('p'); detail.className = 'item-detail'; detail.textContent = item.detail;
      const tags = document.createElement('div'); tags.className = 'tag-row'; item.tags.forEach(tag => { const chip = document.createElement('span'); chip.className = 'food-tag'; chip.textContent = tag; tags.append(chip); });
      const footer = document.createElement('div'); footer.className = 'menu-card-footer';
      const price = document.createElement('strong'); price.className = 'item-price'; price.textContent = money(item.price);
      const add = document.createElement('button'); add.className = 'button add-button'; add.type = 'button';
      add.disabled = !item.available; add.textContent = item.available ? (cart.get(item.id) ? `Added · ${cart.get(item.id)}` : 'Add');
      if (!item.available) add.textContent = 'Unavailable';
      add.addEventListener('click', () => { cart.set(item.id, (cart.get(item.id) || 0) + 1); renderMenu(); renderCart(); });
      footer.append(price, add); card.append(top, title, detail, tags, footer); grid.append(card);
    });
  }

  function renderCart() {
    const lines = document.getElementById('cart-lines'); const empty = document.getElementById('cart-empty');
    const count = [...cart.values()].reduce((sum, qty) => sum + qty, 0);
    const selected = menu().filter(item => cart.has(item.id));
    const total = selected.reduce((sum, item) => sum + item.price * cart.get(item.id), 0);
    document.getElementById('cart-count').textContent = `${count} ${count === 1 ? 'item' : 'items'}`;
    document.getElementById('cart-total').textContent = money(total);
    document.getElementById('place-order').disabled = count === 0;
    empty.hidden = count > 0; lines.replaceChildren();
    selected.forEach(item => {
      const line = document.createElement('div'); line.className = 'cart-line';
      const name = document.createElement('div'); name.className = 'cart-line-name'; name.textContent = item.name;
      const price = document.createElement('span'); price.textContent = money(item.price * cart.get(item.id));
      const controls = document.createElement('div'); controls.className = 'quantity-controls';
      const down = document.createElement('button'); down.type = 'button'; down.textContent = '−'; down.setAttribute('aria-label', `Remove one ${item.name}`);
      down.addEventListener('click', () => { const qty = cart.get(item.id) - 1; if (qty) cart.set(item.id, qty); else cart.delete(item.id); renderMenu(); renderCart(); });
      const qty = document.createElement('span'); qty.textContent = String(cart.get(item.id));
      const up = document.createElement('button'); up.type = 'button'; up.textContent = '+'; up.setAttribute('aria-label', `Add one ${item.name}`);
      up.addEventListener('click', () => { cart.set(item.id, cart.get(item.id) + 1); renderMenu(); renderCart(); });
      controls.append(down, qty, up); line.append(name, price, controls); lines.append(line);
    });
  }

  search.addEventListener('input', renderMenu);
  document.getElementById('place-order').addEventListener('click', () => {
    const items = menu().filter(item => cart.has(item.id)).map(item => ({ id: item.id, name: item.name, price: item.price, quantity: cart.get(item.id) }));
    if (!items.length) return;
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const order = QLStore.createOrder({ name: document.getElementById('student-name').value.trim(), pickup: document.getElementById('pickup').value, items, total });
    cart.clear(); renderCart(); renderMenu();
    const box = document.getElementById('order-confirmation'); box.replaceChildren(); box.hidden = false;
    const title = document.createElement('strong'); title.textContent = 'Demo order preview created';
    const message = document.createElement('p'); message.textContent = `${order.id} · ${order.pickup} · ${money(order.total)}. This stays in your browser; nothing was sent.`;
    const link = document.createElement('a'); link.className = 'text-link'; link.href = 'orders.html'; link.textContent = 'Track demo order →';
    box.append(title, message, link);
  });

  window.addEventListener('storage', event => { if (event.key === 'queueless-demo-menu-v1') { renderMenu(); renderCart(); } });
  renderMenu(); renderCart();
})();
