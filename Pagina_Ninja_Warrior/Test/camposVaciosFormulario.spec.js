const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
describe('Pruebas del formulario', function () {
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get('http://127.0.0.1:5501/formulario.html');
  });

  after(async function () {
    await driver.quit();
  });

  it('Debe mostrar los errores cuando los campos del formulario se envían vacíos', async function () {
    await driver.findElement(By.css('input[type="submit"]')).click();
    let errores = await driver.findElements(By.css('.error-message'));
    assert(errores.length > 0, 'Los mensajes de error no aparecieron para campos vacíos');
  });
});