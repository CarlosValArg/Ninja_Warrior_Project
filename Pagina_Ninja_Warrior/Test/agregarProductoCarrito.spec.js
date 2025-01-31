const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Carrito de Compras - Pruebas con Selenium', function () {
    let driver;

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
    });

    after(async function () {
        await driver.quit();
    });

    it('Debe agregar un producto al carrito', async function () {
        await driver.get('http://127.0.0.1:5501/tienda.html');

        let botonIncorporarCarrito = await driver.findElement(By.css('.add-to-cart'));
        await botonIncorporarCarrito.click();

        let totalCarrito = await driver.wait(until.elementLocated(By.id('cart-total')), 5000);
        let textoTotal = await totalCarrito.getText();

        assert.notStrictEqual(textoTotal, '$0.00', 'El carrito no debería estar vacío después de añadir un producto');
    });
});