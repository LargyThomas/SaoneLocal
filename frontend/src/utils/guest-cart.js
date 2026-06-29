const GUEST_CART_KEY = "saonelocal-cart";

function normalizeProduct(product, quantity = 1) {
  const productId = product.productid || product.productId;
  const productPrice = Number(product.productprice ?? product.productPrice ?? 0);

  return {
    itemtotalprice: productPrice * quantity,
    productid: productId,
    productname: product.productname || product.productName || "Produit local",
    productpicture: product.productpicture || product.productPicture || "",
    productprice: productPrice,
    quantity,
  };
}

export function getGuestCartItems() {
  const storedCart = localStorage.getItem(GUEST_CART_KEY);

  if (!storedCart) {
    return [];
  }

  try {
    const items = JSON.parse(storedCart);
    return Array.isArray(items) ? items : [];
  } catch {
    localStorage.removeItem(GUEST_CART_KEY);
    return [];
  }
}

export function getGuestCart() {
  const items = getGuestCartItems().map((item) => normalizeProduct(item, item.quantity || 1));
  const total = items.reduce((sum, item) => sum + Number(item.itemtotalprice || 0), 0);

  return {
    items,
    total: Number(total.toFixed(2)),
  };
}

export function addGuestCartItem(product, quantity = 1) {
  const productId = product.productid || product.productId;

  if (!productId) {
    return getGuestCart();
  }

  const items = getGuestCartItems();
  const existingItem = items.find((item) => String(item.productid || item.productId) === String(productId));

  if (existingItem) {
    existingItem.quantity = Number(existingItem.quantity || 1) + quantity;
  } else {
    items.push(normalizeProduct(product, quantity));
  }

  localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items));
  return getGuestCart();
}

export function decrementGuestCartItem(productId) {
  const items = getGuestCartItems();
  const existingItem = items.find((item) => String(item.productid || item.productId) === String(productId));

  if (!existingItem) {
    return getGuestCart();
  }

  existingItem.quantity = Number(existingItem.quantity || 1) - 1;

  const nextItems = existingItem.quantity > 0
    ? items
    : items.filter((item) => String(item.productid || item.productId) !== String(productId));

  localStorage.setItem(GUEST_CART_KEY, JSON.stringify(nextItems));
  return getGuestCart();
}

export function removeGuestCartItem(productId) {
  const items = getGuestCartItems().filter((item) => String(item.productid || item.productId) !== String(productId));
  localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items));
  return getGuestCart();
}

export function clearGuestCart() {
  localStorage.removeItem(GUEST_CART_KEY);
}
