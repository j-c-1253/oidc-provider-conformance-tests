const { navigate, testUrl, login, proceed, passed } = require('../helpers');
const fs = require('fs');

it('OP-prompt-login', async function () {
  const test = this.test.title;
  await navigate(testUrl(test));
  await login();
  await proceed();

  fs.writeFileSync(`${test}.png`, Buffer.from((await Page.captureScreenshot()).data, 'base64'));
  const { result: { value: body } } = await Runtime.evaluate({
    expression: 'document.body.outerHTML',
  });
  console.log('rendered view h1 says:', body.match(/<h1>(.+)<\/h1>/)[1]); // eslint-disable-line no-console

  await login();

  await passed(test);
});
