import { CrudTestPage } from './app.po';

describe('crud-test App', () => {
  let page: CrudTestPage;

  beforeEach(() => {
    page = new CrudTestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
