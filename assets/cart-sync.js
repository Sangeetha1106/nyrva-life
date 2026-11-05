/**
 * NYRVA LIFE - Cart Badge Synchronizer
 * Automatically synchronizes the header cart count badge (.cart-count)
 * with the customer's actual cart items stored in localStorage.
 */
(function () {
  function getCartItemCount() {
    var total = 0;
    var keys = ["nyrva_cart_powder", "nyrva_cart_capsules", "nyrva_cart_combo"];
    try {
      keys.forEach(function (key) {
        var raw = localStorage.getItem(key);
        if (raw) {
          var item = JSON.parse(raw);
          var qty = parseInt(item.quantity, 10);
          if (!isNaN(qty) && qty > 0) {
            total += qty;
          }
        }
      });
    } catch (e) {
      console.warn("Could not read cart from localStorage:", e);
    }
    return total;
  }

  function updateCartBadges() {
    var count = getCartItemCount();
    var badges = document.querySelectorAll(".cart-count");
    badges.forEach(function (badge) {
      badge.textContent = count;
    });
  }

  // Expose globally so Add to Cart / Remove buttons can trigger badge update
  window.updateNyrvaCartBadge = updateCartBadges;
  window.getNyrvaCartCount = getCartItemCount;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", updateCartBadges);
  } else {
    updateCartBadges();
  }
})();

