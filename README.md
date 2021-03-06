[![CI status](https://codeship.com/projects/70b6f6b0-0892-0134-2fd9-0a16241ce4dd/status?branch=dev)](https://app.codeship.com/projects/155053)
[![BrowserStack Status](https://www.browserstack.com/automate/badge.svg?badge_key=TFVvMFcxZjh2QjRmUVgzNnV5bytyOTBidFFPZ0xRSnZBTU5QSXBIQXBoWT0tLUMwU3liN0ludjd5RXYyUHF0cTlqMXc9PQ==--ef6726897a425a415b0db19a835ca0dfc4762082)](https://www.browserstack.com/automate)

# Beit-Hatfusot Front-End README

Welcome to the frontend of the museum of the jewish people.  The code is in
Javascript using Angular 1.4.x and licensed under AGPLv3.  Please feel free to
fork and send us pull requests.

Our distant backend is the system known as BHP, an ancient Windows based
client-server software still used by our team of editors, volunteers and
museum visitors.  Our direct backend is an API server written in Python using
Flask, accessing data in a Mongo & ElasticSearch cluster.  The cluster is filled
with data from BHP using our migration bot.

## Blog Posts

- [I toggled public, now what?](https://medium.com/@alonisser/i-toggled-public-now-what-6b42959db251)
- [Freeing a Yack](https://medium.com/@daonb/freeing-a-yack-fc3799099eba)


## Dependencies

    $ sudo su
    $ npm install -g gulp
    $ npm install -g bower
    $ exit

## Getting the code and dependecies

    $ mkdir bh
    $ cd bh
    $ git clone http://....
    $ cd dbs-front
    $ npm install
    $ bower install

## Run the live reloading development server

    $ gulp serve

Then head to `http://localhost:3000` in your browser.

## Test & Build

    $ gulp test
    $ gulp build-all

To send request to different server than the default `local` server
`http://localhost:5000`, set the `API_SERVER` environment variable to one of
`live`, `test`, `local`:

    $ API_SERVER=live gulp serve

## Automated Browser Tests

We are using [BrowserStack](https://www.browserstack.com/automate) for automated testing. After deployment, we take screenshots from different urls - you can review them on Browserstack.

## Distrubution

To build a distribution for live deployment, run:

    $ API_SERVER=live gulp dist

Don't forget to set `API_SERVER` to the desired one.

If you like to test the built version using the local development server, after
`gulp dist` run:

    $ gulp serve:dist

## Contributing

Contributions from both Jews and non-Jews are welcomed! We even have a
`beginner` label to help you start with (hopefully) simple issues.
Once you have an issue, just follow these simple steps:

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Documentation

[Change Log](CHANGELOG.md)

We have very partial documentation so far. What we have, had been generated by
[generator-ngdoc](https://www.npmjs.com/package/generator-ngdoc)
After generation, the (generated) src folder have been removed, since it was
not needed.

In order to serve the docs http://localhost:3000 run:

    $ cd docs
    $ bower install
    $ gulp docs:serve
