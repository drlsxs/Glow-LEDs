"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (props) {
    var format_date = function (unformatted_date) {
        var month = unformatted_date.slice(5, 7);
        var day = unformatted_date.slice(8, 10);
        var year = unformatted_date.slice(0, 4);
        var formatted_date = month + "/" + day + "/20";
        return formatted_date;
    };
    console.log({ refund_view: props });
    // console.log({ order_view_props_order_items: props.orderItems });
    // console.log({ order_view_props_order_items: props.payment.charge });
    return "\n \n  <div class=\"placeorder\" style=\"display: flex;flex-wrap: wrap;justify-content: space-between;color: white;\">\n      <div class=\"placeorder-info\" style=\"box-sizing: border-box;flex: 3 1 60rem;\">\n      \n        <div style=\"box-sizing: border-box;border-radius: 1rem;background-color: #8a8a8a;padding: 1rem;margin: 1rem;  margin-bottom: 0;\">\n          <div style=\"display: flex;justify-content: space-between; flex-direction: column;\">\n            <div style=\"display: block;flex-direction: column;box-sizing: border-box;\">\n              <h1 style=\"display: flex; width: 100%; font-size: 30px;margin-top: 0px; margin-bottom: 0px;box-sizing: border-box;font-family: Helvetica;\">\n                " + props.title + "</h1>\n                <div style=\"  display: flex;  flex-wrap: wrap; \">\n                " + (props.refunded
        ? "<h2>\n                      Refunded: " + props.payment.refund_reason[props.payment.refund_reason.length - 1] + " on " + format_date(props.refundedAt) + "\n                    </h2>"
        : "<div></div>") + "\n              </div>\n              <div style=\" display: flex;  flex-wrap: wrap; width: 100%;\">\n                <h3 style=\"margin: 0px; box-sizing: border-box;font-family: Helvetica;\"><strong>Order\n                    Number: </strong><a href=\"" + (process.env.NODE_ENV === 'production'
        ? 'http://glow-leds.com'
        : 'http://localhost:3000') + "/secure/account/order/" + props._id + "\"\n                    style=\"color: white;text-decoration: none;box-sizing: border-box;\">" + props._id + "</a></h3>\n              </div>\n              \n              </div>\n              </div>\n            </div>\n          </div>\n        </div>\n        <div class=\"placeorder-action\">\n      <div style=\"box-sizing: border-box;border-radius: 1rem;background-color: #8a8a8a;padding: 1rem; margin: 1rem;\">\n        <h1 style=\"box-sizing: border-box;font-family: Helvetica;  margin-top: 0;\">Shipping</h1>\n\n        <div style=\" width: 100%;\">\n\n          <div style=\"box-sizing: border-box;\">" + props.shipping.first_name + " " + props.shipping.last_name + "\n          </div>\n          <div style=\"box-sizing: border-box;\">" + props.shipping.address + "</div>\n          <div style=\"box-sizing: border-box;\">" + props.shipping.city + ", " + props.shipping.state + "\n            " + props.shipping.postalCode + " " + props.shipping.country + "</div>\n          " + (props.shipping.international ? "<div style=\"box-sizing: border-box;\">International</div>" : "<div></div>") + "\n\n          <div style=\"box-sizing: border-box; text-decoration: none; color: white;\">" + props.shipping.email + "</div>\n          <div style=\"    border-top: 0.1rem solid white;width: 100%;\">\n            <label style=\"margin-top: 10px;box-sizing: border-box;\"><strong>" + props.shipped + "</strong></label>\n          </div>\n        </div>\n      </div>\n    </div>\n        <div style=\"box-sizing: border-box;border-radius: 1rem;background-color: #8a8a8a;padding: 1rem; margin: 1rem;\">\n          <ul class=\"cart-list-container\"\n            style=\"margin-top: 0px;box-sizing: border-box;padding: 0;list-style-type: none;margin-right: 10px;\">\n            <li\n              style=\"box-sizing: border-box;display: flex;justify-content: space-between;padding-bottom: 1rem;margin-bottom: 1rem;border-bottom: .1rem #c0c0c0 solid;align-items: flex-end;\">\n              <h1 style=\"box-sizing: border-box;font-family: Helvetica;\">Shopping Cart</h1>\n              <div style=\"box-sizing: border-box;\">Price</div>\n            </li>\n            " + props.orderItems.map(function (item) {
        var item_item = "<li\n              style=\"box-sizing: border-box;display: flex;justify-content: space-between;padding-bottom: 1rem;margin-bottom: 1rem;border-bottom: .1rem #c0c0c0 solid;\">\n              <div style=\"display:flex; width: 100%;\">\n                <div class=\"cart-image\" style=\"box-sizing: border-box;\">\n                  <img src=\"" + (process.env.NODE_ENV === 'production'
            ? 'http://glow-leds.com'
            : 'http://localhost:3000') + item.display_image + "\" alt=\"product\"\n                    style=\"height: auto;\n                    width: 100%;box-sizing: border-box;max-width: 10rem;max-height: 10rem;border-radius: 1.5rem;margin-right: 10px;\">\n                </div>\n                <div class=\"cart-name\" style=\"box-sizing: border-box;\">\n                <div style=\"box-sizing: border-box;\"><a href=\"" + (process.env.NODE_ENV === 'production'
            ? 'http://glow-leds.com'
            : 'http://localhost:3000') + "/collections/all/products/" + item.pathname + "\"\n                          style=\"box-sizing: border-box;text-decoration: none;color: white;\">  " + (item.category ===
            'diffuser_caps' || item.category === 'mini_diffuser_caps'
            ? item.diffuser_cap_color
            : '') + "\n                        " + item.name + "\n                        " + (item.diffuser_cap_name ? "w (" + item.diffuser_cap_name + ")" : '') + "</a></div>\n                  <div style=\"box-sizing: border-box;\">Qty: " + item.qty + "</div>\n                </div>\n              </div>\n              <div class=\"cart-price\" style=\"box-sizing: border-box;text-align: right; width: 100px;\">\n                " + (item.sale_price !== 0
            ? "<div style=\"width: 100px;box-sizing: border-box;\">\n                  <del style=\"color: red;box-sizing: border-box;\">\n                    <label style=\"color: white;box-sizing: border-box;\">$" + (item.price ? item.price : item.price) + "</label>\n                  </del>{' '}\n                  <i class=\"fas fa-arrow-right\" style=\"box-sizing: border-box;\"></i> $" + (item.sale_price
                ? item.sale_price.toFixed(2)
                : item.sale_price) + "{' '}\n                  On Sale!\n                </div>"
            : "<label style=\"box-sizing: border-box;\">$" + (item.price
                ? item.price.toFixed(2)
                : item.price) + "</label>") + "\n              </div>\n            </li>";
        return item_item;
    }) + "\n          </ul>\n        <div style=\"display: flex;flex-direction: column;box-sizing: border-box;\">\n          <div for=\"promo_code\" style=\"box-sizing: border-box;\">Order Note: </div>\n          <div style=\"box-sizing: border-box;\">" + props.promo_code + "</div>\n        </div>\n        <div style=\"display: flex;flex-direction: column;box-sizing: border-box;\">\n          <div for=\"order_note\" style=\"box-sizing: border-box;\">Order Note: </div>\n          <div style=\"box-sizing: border-box;\">" + props.order_note + "</div>\n        </div>\n        </div>\n      </div>\n      <div class=\"placeorder-action\"\n        style=\"box-sizing: border-box;flex: 1 1 20rem;border-radius: 1rem;background-color: #8a8a8a;padding: 1rem; margin: 1rem;margin-bottom: 10px;\">\n        <ul style=\"box-sizing: border-box;padding: 0;list-style-type: none;\">\n          <li style=\"box-sizing: border-box;display: flex;justify-content: space-between;margin-bottom: 1rem;\">\n            <h1 style=\"margin-top: 0px;box-sizing: border-box;font-family: Helvetica;\">Payment Summary</h1>\n          </li>\n          <li\n            style=\"box-sizing: border-box;display: flex; flex-wrap: wrap;justify-content: space-between;margin-bottom: 1rem;\">\n            <div style=\"box-sizing: border-box;\">Items</div>\n            <div style=\"box-sizing: border-box;\">$" + props.itemsPrice.toFixed(2) + "</div>\n          </li>\n          <li\n            style=\"box-sizing: border-box;display: flex; flex-wrap: wrap;justify-content: space-between;margin-bottom: 1rem;\">\n            <div style=\"box-sizing: border-box;\">Shipping</div>\n            <div style=\"box-sizing: border-box;\">$" + props.shippingPrice.toFixed(2) + "</div>\n          </li>\n          <li style=\"box-sizing: border-box; display: flex;flex-wrap: wrap;justify-content: space-between;margin-bottom: 1rem;\">\n            <div style=\"box-sizing: border-box;\">Tax</div>\n            <div style=\"box-sizing: border-box;\">$" + props.taxPrice.toFixed(2) + "</div>\n          </li>\n          <li style=\"box-sizing: border-box;display: flex;justify-content: space-between;margin-bottom: 1rem;\">\n            <div style=\"display: flex; flex-direction: column; width: 100%;\">\n            <div style=\"box-sizing: border-box; border-top: 0.1rem solid white;width: 100%; display: flex; flex-direction: column;\"><label>\n            </div>\n          </li>\n                " + (props.refunded
        ? "<li style=\"box-sizing: border-box;display: flex; flex-wrap: wrap;justify-content: space-between;margin-bottom: 1rem;\">\n                    <div style=\"box-sizing: border-box;\">Order Total</div>\n                    <del style={{ color: 'red' }}>\n                      <label style={{ color: 'white' }}>\n                        <div style=\"box-sizing: border-box;\">$" + (props.totalPrice
            ? props.totalPrice.toFixed(2)
            : props.totalPrice) + "</div>\n                      </label>\n                    </del>\n                  </li>"
        : "<li style=\"box-sizing: border-box;display: flex; flex-wrap: wrap;justify-content: space-between;margin-bottom: 1rem;\">\n          <div style=\"box-sizing: border-box;\">Order Total</div>\n          <div style=\"box-sizing: border-box;\">$" + (props.totalPrice
            ? props.totalPrice.toFixed(2)
            : props.totalPrice) + "</div>\n        </li>") + "\n                " + (props.refunded
        ? "<li style=\"box-sizing: border-box;display: flex; flex-wrap: wrap;justify-content: space-between;margin-bottom: 1rem;\">\n                    <div style=\"box-sizing: border-box;\">Refund Amount</div>\n                    <div style=\"box-sizing: border-box;\">-$" + (props.payment.refund.reduce(function (a, c) { return a + c.amount; }, 0) / 100).toFixed(2) + "</div>\n                  </li>"
        : "<div style=\"box-sizing: border-box;\"></div>") + "\n                " + (props.refunded
        ? "<li style=\"box-sizing: border-box;display: flex; flex-wrap: wrap;justify-content: space-between;margin-bottom: 1rem;\">\n                    <div style=\"box-sizing: border-box;\">New Order Total</div>\n                    <div style=\"box-sizing: border-box;\">\n                      $" + (props.totalPrice -
            props.payment.refund.reduce(function (a, c) { return a + c.amount; }, 0) / 100).toFixed(2) + "\n                    </div>\n                  </li>"
        : "<div style=\"box-sizing: border-box;\"></div>") + "\n          <li\n            style=\"box-sizing: border-box;display: flex; flex-wrap: wrap;justify-content: space-between;margin-bottom: 1rem;\">\n            <div style=\"box-sizing: border-box;\">" + props.paid + "</div>\n            <div style=\"box-sizing: border-box;\">" + props.payment.charge.payment_method_details.card
        .brand + " ending in " + props.payment.charge.payment_method_details.card.last4 + "</div>\n          </li>\n        </ul>\n      </div>\n    </div>\n\t";
});