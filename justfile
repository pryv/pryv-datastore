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
# Test & related
# –––––––––––––----------------------------------------------------------------

# Run code linting
lint *options:
    eslint {{options}} .

# Run types checking
types-check *options:
    tsc {{options}}

# Generate TypeScript definitions
types-emit *options:
    rm src/*.d.ts
    tsc src/*.js --checkJs --declaration --emitDeclarationOnly {{options}}

# Run source licensing tool (see 'licensing' folder for details)
license:
    source-licenser --config-file .licenser.yml ./

# –––––––––––––----------------------------------------------------------------
# Documentation
# –––––––––––––----------------------------------------------------------------

# Generate DOCUMENTATION.md file from JSDoc comments in `src`
doc:
    typedoc
    # node node_modules/jsdoc-to-markdown/bin/cli.js -f src/**/*.js > DOCUMENTATION.md
