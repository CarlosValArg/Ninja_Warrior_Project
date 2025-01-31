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

    it('Debe aplicar el descuento correctamente al añadir un producto', async function() {
        await driver.get('http://127.0.0.1:5501/tienda.html');

        let botonAgregarCarrito = await driver.findElement(By.css('.add-to-cart'));
        await botonAgregarCarrito.click();

        await driver.wait(until.elementLocated(By.id('cart-modal')), 5000);

        let elementoPrecio = await driver.findElement(By.css('.item-price'));
        let textoPrecio = await elementoPrecio.getText();
        let precio = parseFloat(textoPrecio.replace('$', ''));

        let descuentoElemento = await driver.findElement(By.css('td:nth-child(4)'));
        let descuentoTexto = await descuentoElemento.getText();
        let descuento = parseFloat(descuentoTexto.replace('%', ''));

        let descuentoElementoPrecio = await driver.findElement(By.css('td:nth-child(5)'));
        let descuentoTextoPrecio = await descuentoElementoPrecio.getText();
        let descuentoPrecio = parseFloat(descuentoTextoPrecio.replace('$', ''));

        let descuentoPrecioEsperado = precio - (precio * descuento / 100);

        assert.strictEqual(descuentoPrecio.toFixed(2), descuentoPrecioEsperado.toFixed(2), 'El precio con descuento no es correcto');
    });
});