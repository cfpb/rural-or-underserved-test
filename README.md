# :warning: THIS REPO IS DEPRECATED (12/11/2019) :warning:
This tool has migrated to [cfgov-refresh](https://github.com/cfpb/cfgov-refresh).

# Rural and underserved areas automated tool

[![Build Status](https://travis-ci.org/cfpb/rural-or-underserved-test.svg?branch=master)](https://travis-ci.org/cfpb/rural-or-underserved-test)

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

# Updating with new data
Each year the Office of Research in RMR will provide a new list of rural and underserved counties, usually in a spreadsheet. To convert this to json:

1. Save the file as a `.csv`.
1. Use an online tool to convert the csv into json.
1. Manually complete the conversion so the new file matches the `<YYYY>.json` files ([example](https://github.com/cfpb/rural-or-underserved-test/blob/master/src/data/2014.json)) in the [data directory](https://github.com/cfpb/rural-or-underserved-test/tree/master/src/data). The manual steps include:
  1. Adding a `0` to any zip code that contains only 4 digits. These are usually located at the very top of the file.
  1. Combining the state and count names into one, comma separated, string.
1. Save this new file as `<YYYY>.json`, with the correct year, to the [data directory](https://github.com/cfpb/rural-or-underserved-test/tree/master/src/data).

The final step is to add the new year to the drop down. This is done in the [`index.html` file](https://github.com/cfpb/rural-or-underserved-test/blob/master/src/index.html#L1632). You can then follow the ["Building and viewing"](https://github.com/cfpb/rural-or-underserved-test#building-and-viewing) steps to test the tool.

# Contributions

We welcome contributions, in both code and design form, with the understanding that you are contributing to a project that is in the public domain, and anything you contribute to this project will also be released into the public domain. See our CONTRIBUTING file for more details.
