(() => {
  const root = document.getElementById('orders-list');
  const statusIndex = status => QueueLessData.statuses.findIndex(item => item.id === status);
  const money = value => `₹${value}`;

  function render() {
    const orders = QLStore.getOrders(); root.replaceChildren();
    document.getElementById('orders-empty').hidden = orders.length > 0;
    orders.forEach(order => {
      const card = document.createElement('article'); card.className = 'order-card';
      const head = document.createElement('div'); head.className = 'order-card-head';
      const title = document.createElement('div'); const id = document.createElement('strong'); id.textContent = order.id;
      const placed = document.createElement('span'); placed.className = 'muted'; placed.textContent = `Pickup ${order.pickup}`; title.append(id, placed);
      const status = QueueLessData.statuses.find(item => item.id === order.status) || QueueLessData.statuses[0];
      const badge = document.createElement('span'); badge.className = `status-badge status-${status.id}`; badge.textContent = status.label; head.append(title, badge);
      const description = document.createElement('p'); description.className = 'order-status-note'; description.textContent = status.note;
      const list = document.createElement('div'); list.className = 'order-item-list';
      order.items.forEach(item => { const row = document.createElement('div'); row.textContent = `${item.quantity} × ${item.name}`; const amount = document.createElement('strong'); amount.textContent = money(item.quantity * item.price); row.append(amount); list.append(row); });
      const total = document.createElement('div'); total.className = 'order-total'; total.innerHTML = `<span>Sample total</span><strong>${money(order.total)}</strong>`;
      const progress = document.createElement('ol'); progress.className = 'status-steps';
      const current = statusIndex(order.status);
      QueueLessData.statuses.forEach((step, index) => { const li = document.createElement('li'); li.textContent = step.label; if (index <= current) li.classList.add('done'); progress.append(li); });
      card.append(head, description, list, total, progress); root.append(card);
    });
  }
  window.addEventListener('storage', event => { if (event.key === 'queueless-demo-orders-v1') render(); });
  render();
})();
