const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Carrito de Compras - Pruebas con Selenium', function() {
    let driver;

    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
    });

    after(async function() {
        await driver.quit();
    });

    it('Debe agregar un producto al carrito', async function() {
        await driver.get('file:///C:/Users/VOSTRO%203400/Documents/Xideral/Ninja_Warrior/Pagina_Ninja_Warrior/tienda.html');
        
        let addToCartButton = await driver.findElement(By.css('.add-to-cart'));
        await addToCartButton.click();

        let cartTotal = await driver.wait(until.elementLocated(By.id('cart-total')), 5000);
        let totalText = await cartTotal.getText();

        assert.notStrictEqual(totalText, '$0.00', 'El carrito no debería estar vacío después de añadir un producto');
    });
});