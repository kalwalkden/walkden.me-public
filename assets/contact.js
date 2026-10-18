(() => {
  const form = document.getElementById("contact-form");
  if (!form || typeof window.fetch !== "function" || typeof window.FormData !== "function"
    || typeof Object.fromEntries !== "function" || typeof form.reportValidity !== "function") return;
  const button = form.querySelector('button[type="submit"]');
  const status = form.querySelector('[role="status"]');
  if (!button || !status) return;
  const idleLabel = button.innerHTML;
  let pending = false;
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (pending || !form.reportValidity()) return;
    pending = true;
    const restoreFocus = document.activeElement === button;
    button.disabled = true;
    button.textContent = "Sending…";
    form.setAttribute("aria-busy", "true");
    status.textContent = "Sending your message…";
    try {
      const fields = new FormData(form);
      // Redirect belongs to native navigation; JSON submissions keep feedback inline.
      fields.delete("redirect");
      const response = await window.fetch(form.action, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(Object.fromEntries(fields)),
      });
      const result = await response.json();
      if (!response.ok || result?.success !== true) throw new Error("Unconfirmed acceptance");
      status.textContent = "Thanks. Your message has been accepted.";
    } catch {
      status.textContent = "We couldn't confirm your message was accepted. Please try again.";
    } finally {
      pending = false;
      button.disabled = false;
      button.innerHTML = idleLabel;
      form.removeAttribute("aria-busy");
      // Disabling a focused button can move focus to body; respect later user navigation.
      if (restoreFocus && document.activeElement === document.body) button.focus();
    }
  });
})();
