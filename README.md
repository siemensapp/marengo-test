# Marengo Test

[![](https://img.shields.io/badge/SiMPL-Project-009999.svg)](https://simpl.siemens.io)
[![](https://img.shields.io/badge/license-SISL--1.1-blue.svg)](LICENSE.md)
<!-- [![](https://code.siemens.com/[GROUP]/[PROJECT]/badges/master/build.svg)](https://code.siemens.com/[GROUP]/[PROJECT]/commits/master) -->
<!-- [![](https://code.siemens.com/[GROUP]/[PROJECT]/badges/master/coverage.svg)](https://code.siemens.com/[GROUP]/[PROJECT]/commits/master) -->



## Usage

To locally setup this projects, use following steps:

``` sh
# Clone the repository
git clone 

# Change into project directory
cd marengo-test

# Install all dependencies
npm install

# Start the development server
npm start
```

Navigate to `http://localhost:4200/` with your browser. The app will 
automatically recompile and reload if you change any of the source files.

### Running Unit Tests

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running End-to-End Tests

Run `npm run e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Running Code Linting

- Run `npm run lint` for angular linting.
- Run `npm run lint:sass` for sass linting.
- Run `npm run lint:editorconfig` for linting against `.editorconfig`.

## Release

To craft a release, you need to bump the package version in `package.json`,
update the changelog, commit everything and tag the version.

All of that can be done by the [SiMPL-CLI](https://code.siemens.com/simpl/simpl-cli)
using:

``` sh
# Do the release
simpl release

# Push the release
git push && git push --tags
```

## Contributing

Improvements are always welcome! Feel free to log a bug, write a suggestion or
contribute code via merge request. All details are listed in our contribution
guide.

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

Code and documentation copyright 2019 Siemens AG.

See [LICENSE.md](LICENSE.md).
