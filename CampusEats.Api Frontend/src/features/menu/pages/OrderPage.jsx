import { useState } from "react";

function OrderPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    qty: 1,
  });

  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);

  function validate(values) {
    const newErrors = {};

    if (values.name.trim().length < 2) {
      newErrors.name = "Name too short";
    }

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (Number(values.qty) < 1) {
      newErrors.qty = "Qty must be 1 or more";
    }

    return newErrors;
  }

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const foundErrors = validate(form);

    setErrors(foundErrors);

    if (Object.keys(foundErrors).length === 0) {
      setDone(true);
    }
  }

  if (done) {
    return (
      <div className="form-page">
        <h1>Details saved</h1>
        <p>Thanks, {form.name}! Your details have been captured for this demo. No order has been sent to the kitchen.</p>
      </div>
    );
  }

  return (
    <div className="form-page">
      <h1>Place an Order</h1>
      <p>Fill in your details below. This demo form does not send an order to the kitchen.</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name: </label>

          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
          />

          {errors.name && (
            <span style={{ color: "red" }}>
              {" "}
              {errors.name}
            </span>
          )}
        </div>

        <br />

        <div>
          <label htmlFor="email">Email: </label>

          <input
            id="email"
            name="email"
            type="text"
            value={form.email}
            onChange={handleChange}
          />

          {errors.email && (
            <span style={{ color: "red" }}>
              {" "}
              {errors.email}
            </span>
          )}
        </div>

        <br />

        <div>
          <label htmlFor="qty">Quantity: </label>

          <input
            id="qty"
            name="qty"
            type="number"
            value={form.qty}
            onChange={handleChange}
          />

          {errors.qty && (
            <span style={{ color: "red" }}>
              {" "}
              {errors.qty}
            </span>
          )}
        </div>

        <br />

        <button type="submit">Place Order</button>
      </form>
    </div>
  );
}

export default OrderPage;
