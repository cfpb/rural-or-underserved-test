# Rural and underserved areas automated tool

The Rural and Underserved Tool helps creditors comply with the recent amendments to Reg Z (Truth in Lending). The rule allows small creditors to be eligible for special provisions and exemptions if the lender conducts more than 50% of its business in the previous year in rural or underserved areas.  A creditor may rely on this tool to provide a safe harbor determination that a property is located in a rural or underserved area. The new rule defines rural as counties not in or adjacent to a Metropolitan Statistical Area OR outside an Urban Area/Urban Cluster as defined by the US Census Bureau. While the CFPB publishes a list of counties that are entirely rural or underserved to facilitate compliance with the first part of the definition of rural and for underserved, the newly expanded rule to include urban areas and urban clusters using census blocks is too difficult to determine without a tool. Creditors can select a year and enter addresses into the tool, either one at a time or more than one at a time (a “batch upload”), and the tool provides a determination of whether each address is in a rural or underserved area for the year selected.

# We want your feedback, but will not be able to respond to everyone

We are working under an agile framework, and plan to use this repo to publish, receive feedback, and iterate on that feedback as often as possible. Our goal is to see user trends and reactions to our work. We want as much feedback as possible to help us make informed decisions so that we can make this tool better. Unfortunately, we will not be able to respond to every piece of feedback or comment we receive, but intend to respond with our progress through the evolution of the tool. [Please file any issues in this repository](https://github.com/cfpb/rural-or-underserved-test/issues).

# Screenshot

![Rural and underserved areas automated tool](/screenshot.png)

# Dependencies

- [node](https://nodejs.org/en/download/)
- [grunt](http://gruntjs.com/)
- [browserify](http://browserify.org/)

# Building and viewing

To build and view the tool locally:

1. `$ git clone git@github.com:cfpb/rural-or-underserved-test.git`
1. `$ npm install`
1. `$ grunt`
  - the default `grunt` task uses a connect server, with livereload, and a watch task so any changes you make will trigger a reload on your browser
1. Navigate to `http://localhost:9001`

Other available `grunt` tasks:

- `$grunt build`
  - this task builds the site with minified CSS and JS (without watch and livereload)

# Contributions

We welcome contributions, in both code and design form, with the understanding that you are contributing to a project that is in the public domain, and anything you contribute to this project will also be released into the public domain. See our CONTRIBUTING file for more details.
