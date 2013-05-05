'use strict';

/*global describe, it, expect, browser, element, sleep, repeater*/
describe('Enterprise app', function () {

    it('should redirect index.html', function () {
        browser().navigateTo('/');

        expect(browser().location().url()).toEqual('/');
    });

    it('should redirect index.html when some unknown url is entered', function () {
        browser().navigateTo('/wayne');

        expect(browser().location().url()).toEqual('/');
    });

    it('should redirect to edit.html when Add New Member is clicked', function () {
        browser().navigateTo('/enterprise');
        element('table thead tr td a', 'Add New').click();

        expect(browser().location().url()).toEqual('/enterprise/new');
    });

    it('should redirect to edit.html when Add New Member is clicked', function () {
        browser().navigateTo('/enterprise');
        sleep(5);
        expect(repeater('table tbody tr').count()).toBe(3);
    });
});