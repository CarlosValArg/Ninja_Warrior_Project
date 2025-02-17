const { Builder, By } = require('selenium-webdriver');
const assert = require('assert');

describe('Validaciones del formulario', function () {
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get('http://127.0.0.1:5501/formulario.html');
  });

  after(async function () {
    await driver.quit();
  });

  it('Debe limpiar los campos del formulario al hacer clic en el botón "Limpiar"', async function () {
    await driver.findElement(By.id('nombre')).sendKeys('Carlos Alberto');
    await driver.findElement(By.id('apellidos')).sendKeys('Valencia Argueta');
    await driver.findElement(By.id('edad')).sendKeys('22');
    await driver.findElement(By.id('email')).sendKeys('carlos@gmail.com');
    await driver.findElement(By.id('mensaje')).sendKeys('Mensaje de prueba para limpiarse XD.');
    
    await driver.findElement(By.css('input[type="reset"]')).click();
    
    let nombreVacio = await driver.findElement(By.id('nombre')).getAttribute('value');
    let apellidosVacio = await driver.findElement(By.id('apellidos')).getAttribute('value');
    let edadVacio = await driver.findElement(By.id('edad')).getAttribute('value');
    let emailVacio = await driver.findElement(By.id('email')).getAttribute('value');
    let mensajeVacio = await driver.findElement(By.id('mensaje')).getAttribute('value');
    
    assert.strictEqual(nombreVacio, '', 'El campo de nombre no se limpió correctamente');
    assert.strictEqual(apellidosVacio, '', 'El campo apellidos no se limpió correctamente');
    assert.strictEqual(edadVacio, '', 'El campo edad no se limpió correctamente');
    assert.strictEqual(emailVacio, '', 'El campo email no se limpió correctamente');
    assert.strictEqual(mensajeVacio, '', 'El campo mensaje no se limpió correctamente');
  });
});