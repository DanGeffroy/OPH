import { OPHPage } from './app.po';

describe('oph App', function() {
  let page: OPHPage;

  beforeEach(() => {
    page = new OPHPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
