const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Validaciones del formulario', function () {
    let driver;
    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
    });

    after(async function () {
        await driver.quit();
    });

    it('Se debe de eliminar un producto del carrito al hacer clic en el botón "Quitar"', async function () {
        await driver.get('http://127.0.0.1:5501/tienda.html');

        let botonAgregarCarrito = await driver.wait(until.elementLocated(By.css('.info-container .add-to-cart')), 5000);

        await botonAgregarCarrito.click();

        await driver.wait(until.elementLocated(By.id('cart-modal')), 5000);

        await driver.wait(until.elementsLocated(By.css('.cart-items tbody tr')), 5000);
        let articulosCarrito = await driver.findElements(By.css('.cart-items tbody tr'));
        assert.strictEqual(articulosCarrito.length, 1, 'El producto no fue añadido correctamente');

        let botonQuitar = await driver.wait(until.elementLocated(By.css('.cart-items tbody tr td .remove-item')), 5000);
        await driver.wait(until.elementIsVisible(botonQuitar), 5000);

        await botonQuitar.click();

        await driver.wait(async () => {
            let articulosActualizadosCarrito = await driver.findElements(By.css('.cart-items tbody tr'));
            return articulosActualizadosCarrito.length === 0;
        }, 5000, 'El producto no fue quitado correctamente');

        let articulosActualizadosCarrito = await driver.findElements(By.css('.cart-items tbody tr'));
        assert.strictEqual(articulosActualizadosCarrito.length, 0, 'El producto sigue en el carrito');
    });
});