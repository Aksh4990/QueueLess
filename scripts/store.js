(() => {
  const ORDER_KEY = 'queueless-demo-orders-v1';
  const MENU_KEY = 'queueless-demo-menu-v1';
  const fallback = {};
  function read(key, base) {
    try { const stored = localStorage.getItem(key); return stored ? JSON.parse(stored) : base; }
    catch { return fallback[key] ?? base; }
  }
  function write(key, value) {
    fallback[key] = value;
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* The current page still works without storage. */ }
  }
  function getMenu() {
    const overrides = read(MENU_KEY, {});
    return QueueLessData.menu.map(item => ({ ...item, available: overrides[item.id] ?? item.available }));
  }
  function setAvailability(id, available) {
    const overrides = read(MENU_KEY, {}); overrides[id] = available; write(MENU_KEY, overrides);
  }
  function getOrders() { return read(ORDER_KEY, []); }
  function createOrder(order) {
    const orders = getOrders();
    const newOrder = { ...order, id: `QL-${Date.now().toString().slice(-6)}`, createdAt: new Date().toISOString(), status: 'received' };
    orders.unshift(newOrder); write(ORDER_KEY, orders); return newOrder;
  }
  function updateStatus(id, status) {
    const orders = getOrders().map(order => order.id === id ? { ...order, status, updatedAt: new Date().toISOString() } : order);
    write(ORDER_KEY, orders);
  }
  function clearOrders() { write(ORDER_KEY, []); }
  window.QLStore = { getMenu, setAvailability, getOrders, createOrder, updateStatus, clearOrders };
})();
