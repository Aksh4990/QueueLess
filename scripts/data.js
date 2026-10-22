window.QueueLessData = {
  categories: ['All', 'Meals', 'Snacks', 'Drinks'],
  menu: [
    { id: 'sandwich', name: 'Veg grilled sandwich', detail: 'Toasted with a crisp filling', price: 45, category: 'Meals', tags: ['Vegetarian'], icon: '🥪', available: true },
    { id: 'chai', name: 'Masala chai', detail: 'A small cup of spiced tea', price: 15, category: 'Drinks', tags: ['Vegetarian'], icon: '☕', available: true },
    { id: 'frankie', name: 'Paneer frankie', detail: 'Warm wrap with paneer filling', price: 60, category: 'Meals', tags: ['Vegetarian'], icon: '🌯', available: true },
    { id: 'poha', name: 'Poha cup', detail: 'Light, savoury snack', price: 35, category: 'Snacks', tags: ['Vegetarian'], icon: '🍲', available: true },
    { id: 'lemonade', name: 'Fresh lime soda', detail: 'Sweet or salted', price: 25, category: 'Drinks', tags: ['Vegan'], icon: '🍋', available: true },
    { id: 'idli', name: 'Idli sambar', detail: 'Steamed idli with sambar', price: 40, category: 'Snacks', tags: ['Vegan'], icon: '🥣', available: true },
    { id: 'sprouts', name: 'Sprout chaat', detail: 'A fresh, tangy bowl', price: 30, category: 'Snacks', tags: ['Vegan'], icon: '🥗', available: true },
    { id: 'coffee', name: 'Filter coffee', detail: 'Small cup, freshly brewed', price: 20, category: 'Drinks', tags: ['Vegetarian'], icon: '☕', available: true }
  ],
  statuses: [
    { id: 'received', label: 'Order received', note: 'The request is in the sample queue.' },
    { id: 'preparing', label: 'Preparing', note: 'The canteen is preparing the items.' },
    { id: 'ready', label: 'Ready for pickup', note: 'The order is ready at the counter.' },
    { id: 'collected', label: 'Collected', note: 'The pickup journey is complete.' }
  ]
};
