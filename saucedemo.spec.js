const{test,expect} = require('@playwright/test');
const baseURL= "https://www.saucedemo.com/",
Valid_userName= "standard_user",
ValidPassword="secret_sauce",
InValid_username="invalid_user",
Invalid_Passwod="wrong_pass";
test("Login with valid credentials",async({page})=>
{
await page.goto(baseURL);
await page.fill("//input[@id='user-name']",Valid_userName);
await page.fill("//input[@id='password']",ValidPassword);
await page.locator("//input[@id='login-button']").click();
console.log("Pass-Login with valid credentials")
});
test("Login with invalid credentials",async({page})=>
{
await page.goto(baseURL);
await page.fill("//input[@id='user-name']",InValid_username);
await page.fill("//input[@id='password']",Invalid_Passwod);
await page.locator("//input[@id='login-button']").click();
console.log("Pass-Login with Invalid credentials")
});
test("Product listing validation",async({page})=>
{
await page.goto(baseURL);
await page.fill("//input[@id='user-name']",Valid_userName);
await page.fill("//input[@id='password']",ValidPassword);
await page.locator("//input[@id='login-button']").click();
await page.waitForLoadState("networkidle");
const ProductList = await page.locator("//div[@class='inventory_item_name ']").allTextContents();
console.log(ProductList);
console.log("Pass-Product listing validation")
});
test("Add Product(s) to cart",async({page})=>
{
await page.goto(baseURL);
await page.fill("//input[@id='user-name']",Valid_userName);
await page.fill("//input[@id='password']",ValidPassword);
await page.locator("//input[@id='login-button']").click();
await page.locator("//button[@id='add-to-cart-sauce-labs-backpack']").click();
await page.locator("#add-to-cart-sauce-labs-bike-light").click();
await page.locator(".shopping_cart_link").click();
const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).toHaveText('2');
console.log("Pass-Add Product(s) to cart")
});
test("Cart content validation",async({page})=>
{
await page.goto(baseURL);
await page.fill("//input[@id='user-name']",Valid_userName);
await page.fill("//input[@id='password']",ValidPassword);
await page.locator("//input[@id='login-button']").click();
await page.locator("//button[@id='add-to-cart-sauce-labs-backpack']").click();
await page.locator("#add-to-cart-sauce-labs-bike-light").click();
await page.locator(".shopping_cart_link").click();
await page.click(".shopping_cart_link");
const cartItem = page.locator("//div[@class='inventory_item_name']").first();
await expect(cartItem).toHaveText("Sauce Labs Backpack");
console.log("Pass-Cart content validation")
});
test("Checkout flow",async({page})=>
{
await page.goto(baseURL);
await page.fill("//input[@id='user-name']",Valid_userName);
await page.fill("//input[@id='password']",ValidPassword);
await page.locator("//input[@id='login-button']").click();
await page.locator("//button[@id='add-to-cart-sauce-labs-backpack']").click();
await page.locator("#add-to-cart-sauce-labs-bike-light").click();
await page.locator(".shopping_cart_link").click();
await page.click(".shopping_cart_link");
const cartItem = page.locator("//div[@class='inventory_item_name']").first();
await expect(cartItem).toHaveText("Sauce Labs Backpack");
await page.locator("//button[@id='checkout']").click();
await page.fill("//input[@id='first-name']",Valid_userName);
await page.fill("//input[@id='last-name']","Test");
await page.fill("//input[@id='postal-code']","600002");
await page.locator("//input[@id='continue']").click();
// const PaymentInfo = page.locator("//div[normalize-space()='SauceCard #31337']").allTextContents();
// console.log("Payment Information:",PaymentInfo);
// const TotalPrice = page.locator("//div[@class='summary_total_label']").allTextContents();
// console.log("Price Total:",TotalPrice);
await page.locator("//button[@id='finish']").click();
const confirmation = page.locator('.complete-header');
await expect(confirmation).toHaveText('Thank you for your order!');
console.log("Pass-Checkout flow");
});
test("Logout",async({page})=>
{
await page.goto(baseURL);
await page.fill("//input[@id='user-name']",Valid_userName);
await page.fill("//input[@id='password']",ValidPassword);
await page.locator("//input[@id='login-button']").click();
await page.locator("//button[@id='react-burger-menu-btn']").click();
await page.locator("//a[@id='logout_sidebar_link']").click();
await expect(page).toHaveURL(baseURL);
console.log("Pass-Logout")
});






