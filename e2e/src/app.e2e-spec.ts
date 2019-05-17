import { AppPage } from './app.po';

describe('marengo-test App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display the app name on the landing page', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Marengo Demo App');
  });
});
