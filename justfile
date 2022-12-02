# add node bin script path for recipes
export PATH := "./node_modules/.bin:" + env_var('PATH')

# Default: display available recipes
_help:
    @just --list

# –––––––––––––----------------------------------------------------------------
# Setup
# –––––––––––––----------------------------------------------------------------

# Install node modules afresh
install *params: clean
    npm install {{params}}

# Clean up node modules
clean:
    rm -rf node_modules
    rm -rf components/**/node_modules

# –––––––––––––----------------------------------------------------------------
# Documentation
# –––––––––––––----------------------------------------------------------------

# Generate DOCUMENTATION.md file form `src/` jsdoc comments
doc:
    node node_modules/jsdoc-to-markdown/bin/cli.js -f src/**/*.js > DOCUMENTATION.md

# –––––––––––––----------------------------------------------------------------
# Run
# –––––––––––––----------------------------------------------------------------

# –––––––––––––----------------------------------------------------------------
# Test & related
# –––––––––––––----------------------------------------------------------------

# Run code linting on the entire repo
lint *options:
    eslint {{options}} .

# Run source licensing tool (see 'licensing' folder for details)
license:
    source-licenser --config-file .licenser.yml ./

