# Pryv.io data store

Library and tools for accessing external data stores within Pryv.io.

See [CHANGELOG.md](CHANGELOG.md) for the changes between versions.

## Quick start

To let Pryv.io access an external data store:

### Create your data store implementation in Node.js based on the present library

1. `npm install --save @pryv/datastore`
2. Implement a data store in your package's main module; for example:
   ```js
   const ds = require('@pryv/datastore');

   module.exports = ds.createDataStore({
     async init (params) {
       this.settings = params.settings;

       // initialization code goes here…

       // if implementing streams
       this.streams = ds.createUserStreams({
         // streams store implementation here…
       });

       // if implementing events
       this.events = ds.createUserEvents({
         // events store implementation here…
       });

       return this;
     },

     async deleteUser (userId) {
       // remove user from store…
     },

     async getUserStorageInfos (userId) {
       // report storage used (see UserStorageInfos)…
     },

     // optional: declare the optional capabilities this store implements
     supports () {
       return {};
     }
   })
   ```

For the details, see the [API documentation](DOCUMENTATION.md).

### Install it on your Pryv.io core machines

1. Deploy your module in your chosen location on each core machine
2. Register it in platform configuration under key `custom:dataStores`; each data store definition has those properties:
   - `id` (string): The store's id – this is used in data so do not change
   - `name` (string): The store's name, for logging and messaging 
   purposes
   - `path` (string): Fully qualified path to reach out to your package
   - `settings` (object): Any settings to pass to your data store implementation


#### Installation in docker containers

Notes about `path` on docker implementation we recommend to place your package in the configuration folder.
- Open-Pryv.io: folder `configs/your-data-store` will be accessible with `/app/configs/your-data-store`
- Enterprise edition: folder `var-pryv/core/conf/your-data-store` will be accessible with `/app/conf/your-data-store`

`npm install` should be run upfront with your package with the very same Node.js version as the one in the docker containers.
- Pryv 1.9.0 => Node.js 18.14.3
- Open-Pryv.io 2.x => Node.js 24 (see `engines` in open-pryv.io's `package.json`)

## Contributing

### Installation

Prerequisites: [Node.js](https://nodejs.org/en/download/) 20.19+ or 22.12+, [just](https://github.com/casey/just#installation)

Run `just` to see the available commands (defined in `justfile`), e.g.

- `just install` to install node modules
- `just doc` to regenerate the API documentation


## License

[BSD-3-Clause](LICENSE)
