export default function Cart() {
  return (
    <div class="container container-fluid">
      <h2 class="mt-5">
        Your Cart: <b>2 items</b>
      </h2>

      <div class="row d-flex justify-content-between">
        <div class="col-12 col-lg-8">
          <hr />
          <div class="cart-item">
            <div class="row">
              <div class="col-4 col-lg-3">
                <img
                  src="/images/products/1.jpg"
                  alt="Laptop"
                  height="90"
                  width="115"
                />
              </div>

              <div class="col-5 col-lg-3">
                <a href="#">
                  OPPO F21s Pro 5G (Dawnlight Gold, 8GB RAM, 128 Storage) with
                  No Cost EMI/Additional Exchange Offers
                </a>
              </div>

              <div class="col-4 col-lg-2 mt-4 mt-lg-0">
                <p id="card_item_price">$245.67</p>
              </div>

              <div class="col-4 col-lg-3 mt-4 mt-lg-0">
                <div class="stockCounter d-inline">
                  <span class="btn btn-danger minus">-</span>
                  <input
                    type="number"
                    class="form-control count d-inline"
                    value="1"
                    readonly
                  />

                  <span class="btn btn-primary plus">+</span>
                </div>
              </div>

              <div class="col-4 col-lg-1 mt-4 mt-lg-0">
                <i id="delete_cart_item" class="fa fa-trash btn btn-danger"></i>
              </div>
            </div>
          </div>
          <hr />
        </div>

        <div class="col-12 col-lg-3 my-4">
          <div id="order_summary">
            <h4>Order Summary</h4>
            <hr />
            <p>
              Subtotal: <span class="order-summary-values">1 (Units)</span>
            </p>
            <p>
              Est. total: <span class="order-summary-values">$245.67</span>
            </p>

            <hr />
            <button id="checkout_btn" class="btn btn-primary btn-block">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}