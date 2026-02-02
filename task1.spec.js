const { test, expect } = require("@playwright/test");

test("Login Automation with Assertions", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  const usernameText = await page.locator("#login_credentials").innerText();

  const user = usernameText.split("\n").map(t => t.trim()).filter(t => t && !t.includes("Accepted"))[0]; // ✅ dynamic // ✅ trim() FIXED

  const passwordText = await page.locator(".login_password").innerText();

  const password = passwordText.split("\n").map(t => t.trim()).filter(t => t && !t.includes("Password"))[0];

  // Assertions (best practice)
  expect(user).toBeTruthy();
  expect(password).toBeTruthy();

  await page.getByPlaceholder("Username").fill(user);
  await page.getByPlaceholder("Password").fill(password);
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page).toHaveURL(/inventory\.html/);
});
