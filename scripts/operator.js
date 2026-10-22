(() => {
  const ordersRoot = document.getElementById('operator-orders');
  const statusById = Object.fromEntries(QueueLessData.statuses.map((status, index) => [status.id, { ...status, index }]));
  const money = value => `₹${value}`;

  function renderOrders() {
    const orders = QLStore.getOrders(); ordersRoot.replaceChildren();
    document.getElementById('operator-empty').hidden = orders.length > 0;
    const active = orders.filter(order => order.status !== 'collected');
    document.getElementById('active-count').textContent = String(active.length);
    document.getElementById('preparing-count').textContent = String(orders.filter(order => order.status === 'preparing').length);
    document.getElementById('ready-count').textContent = String(orders.filter(order => order.status === 'ready').length);
    orders.forEach(order => {
      const card = document.createElement('article'); card.className = 'operator-order';
      const head = document.createElement('div'); head.className = 'operator-order-head';
      const id = document.createElement('strong'); id.textContent = order.id;
      const status = statusById[order.status] || statusById.received;
      const badge = document.createElement('span'); badge.className = `status-badge status-${status.id}`; badge.textContent = status.label; head.append(id, badge);
      const details = document.createElement('p'); details.className = 'muted'; details.textContent = `${order.name || 'Student'} · Pickup ${order.pickup}`;
      const summary = document.createElement('p'); summary.className = 'operator-order-summary'; summary.textContent = order.items.map(item => `${item.quantity} × ${item.name}`).join(' · ');
      const footer = document.createElement('div'); footer.className = 'operator-order-footer'; const total = document.createElement('strong'); total.textContent = money(order.total); footer.append(total);
      if (status.index < QueueLessData.statuses.length - 1) {
        const next = QueueLessData.statuses[status.index + 1];
        const action = document.createElement('button'); action.className = 'button primary small'; action.type = 'button'; action.textContent = next.id === 'collected' ? 'Mark collected' : `Mark ${next.label.toLowerCase()}`;
        action.addEventListener('click', () => { QLStore.updateStatus(order.id, next.id); renderOrders(); }); footer.append(action);
      } else { const complete = document.createElement('span'); complete.className = 'complete-label'; complete.textContent = 'Pickup complete'; footer.append(complete); }
      card.append(head, details, summary, footer); ordersRoot.append(card);
    });
  }

  function renderAvailability() {
    const root = document.getElementById('availability-list'); root.replaceChildren();
    QLStore.getMenu().forEach(item => {
      const row = document.createElement('div'); row.className = 'availability-row';
      const text = document.createElement('div'); const name = document.createElement('strong'); name.textContent = item.name;
      const state = document.createElement('small'); state.textContent = item.available ? 'Available on sample menu' : 'Marked unavailable'; text.append(name, state);
      const toggle = document.createElement('button'); toggle.type = 'button'; toggle.className = `toggle${item.available ? ' on' : ''}`; toggle.setAttribute('aria-pressed', String(item.available)); toggle.setAttribute('aria-label', `${item.available ? 'Mark' : 'Make'} ${item.name} ${item.available ? 'unavailable' : 'available'}`);
      toggle.addEventListener('click', () => { QLStore.setAvailability(item.id, !item.available); renderAvailability(); }); row.append(text, toggle); root.append(row);
    });
  }

  document.getElementById('clear-orders').addEventListener('click', () => { QLStore.clearOrders(); renderOrders(); });
  window.addEventListener('storage', event => {
    if (event.key === 'queueless-demo-orders-v1') renderOrders();
    if (event.key === 'queueless-demo-menu-v1') renderAvailability();
  });
  renderOrders(); renderAvailability();
})();
