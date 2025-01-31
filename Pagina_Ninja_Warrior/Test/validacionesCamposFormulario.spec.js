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

  it('Debe mostrar todos los errores de validación cuando los campos son inválidos', async function () {
    await driver.findElement(By.id('nombre')).sendKeys('Ca');
    await driver.findElement(By.id('apellidos')).sendKeys('Va');
    await driver.findElement(By.id('edad')).sendKeys('-10');
    await driver.findElement(By.id('email')).sendKeys('carlosgmail.com');
    await driver.findElement(By.id('mensaje')).sendKeys('Esto');

    await driver.findElement(By.css('input[type="submit"]')).click();

    let errorNombre = await driver.findElement(By.xpath("//span[contains(text(), 'El nombre debe tener al menos 3 caracteres.')]")).isDisplayed();
    let errorApellidos = await driver.findElement(By.xpath("//span[contains(text(), 'Apellido inválido')]")).isDisplayed();
    let errorEdad = await driver.findElement(By.xpath("//span[contains(text(), 'Edad inválida')]")).isDisplayed();
    let errorEmail = await driver.findElement(By.xpath("//span[contains(text(), 'Correo electrónico inválido')]")).isDisplayed();
    let errorMensaje = await driver.findElement(By.xpath("//span[contains(text(), 'El mensaje debe contener al menos 10 caracteres.')]")).isDisplayed();

    assert(errorNombre, 'El error de nombre no fue mostrado');
    assert(errorApellidos, 'El error de apellidos no fue mostrado');
    assert(errorEdad, 'El error de edad no fue mostrado');
    assert(errorEmail, 'El error de email no fue mostrado');
    assert(errorMensaje, 'El error de mensaje no fue mostrado');
  });
});