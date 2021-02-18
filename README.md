# Frostbolt

> Functional testing plays an important role in every app development process. Software engineers often populate their database with mock data to test the stability of their source code. However, since there exists a variety of databases and each database has its own query language, developers have to tailor their seeder scripts to fit a specific database.

> The objective of the Universal Seeder is to assist software engineers in their app development process by eliminating the need to create a custom seeder script. This module will provide developers the option to seed their databases with mock data in one universal seeder script.

### Contributions

- Martin Sung
- Nathan Quiocson

### Credits

- Martin Sung (martinsung00): developer
- Nathan Quiocson (nathanq95): developer

### Table of Contents

1. [Usage](#Usage)
2. [Development](#development)

### Usage

##### Installing Dependencies

From within the root directory:

```sh
npm i
```

Require or Import UniversalSeeder:

```sh
const UniversalSeeder = require(UniversalSeeder);
import UniversalSeeder from './universalseeder';
```

Create a schema in an object form. Use keys to signify column names and values to represent what type of data needs to be generated:

```sh
// Cat represents the column name.
// int represents the value that will be generated. Int will generate a number.

const schema = {
  'cat': 'int',
  'dog': 'varchar'
}
```

Provide a database url and schema.

```sh
const targetDB = "localhost:5432"
const seeder = new UniversalSeeder(targetDB, schema);
```

Seed by calling the seed method.

```sh
seeder.seed();
```

### Development

#### Postgres Integration

- Implement postgresql seeding functionality.
