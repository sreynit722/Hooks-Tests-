import { useState } from "react";

function EmailForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    setError("");
    setSubmitted(true);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>

      <input
        id="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />

      {error && <p role="alert">{error}</p>}

      <button type="submit">Submit</button>

      {submitted && <p>Form submitted!</p>}
    </form>
  );
}

export default EmailForm;
