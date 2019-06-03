/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

         //validando se as url`s nao estão vazias
        it('each feed should return a not empty URL', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

         //validando se o nome nao esta vazio.
        it('each feed should return a not empty name', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });


    /* TODO: Write a new test suite named "The menu" */

    //tratativa do menu, com suite de testes.
    describe('The menu', function () {
        const body = document.body;

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

         //deixando o menu escondido, com a classe menu-hidden
         it('should be hidden by default', function () {
            expect(body.classList.contains('menu-hidden')).toBe(true);
         });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

          //tratando a parte de click no icone de menu, para esconder e exibir.
        it('should toggle menu visibility when icon was clicked', function () {
            const menuIcon = document.querySelector('.menu-icon-link');
            menuIcon.click();
            expect(body.classList.contains('menu-hidden')).toBe(false);
            menuIcon.click();
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function () {

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

         //criacao da funcao loadFeed e uso do beforeEach e done
        let entry;

        beforeEach( function(done) {
            try {
                loadFeed(0, function () {
                    entry = $('.feed .entry');
                    done();
                });
            } catch(e) {
                console.log(e);
            }
            
        });

        it('should contain at least one entry in the feed', function(done) {
            expect(entry).toBeDefined();
            done();
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */

    //uso do "new feed selection"
    describe('New Feed Selection', function () {

        const feedContainer = document.querySelector('.feed');
        let first;
        let second;

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

         //trabalhando com a funcao loadFeed e o fazendo as atualizacoes no index.
        beforeEach(function(done) {
            try {
                loadFeed(0, function () {
                    first = feedContainer.innerHTML;
                    loadFeed(1, function () {
                        second = feedContainer.innerHTML;
                        done();
                    });
                });
            } catch(e) {
                console.log(e);
            }          
        });

        it('should change contents when feed was change', function(done) {
            expect(first).not.toBe("");
            expect(second).not.toBe("");
            expect(first).not.toBe(second);
            done();
        });
    });
    
}());
