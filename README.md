<p align="center">
  <a href="https://quest.aoc-dev.io">
    <img width="180" src="https://github.com/atlantis-of-code/aoc-dev/assets/273590/349b9229-2fdf-4190-964a-a0aaa7701e96" alt="Quest for Atlantis">
  </a>
</p>

<p align="center">
  <strong>Quest for Atlantis</strong>
</p>

The **Quest for Atlantis** is a tiny ERP application designed as a demonstration for [aoc-dev.io](https://aoc-dev.io). In addition to the framework's documentation and API, it serves as an extremely valuable and up-to-date resource for learning.

### See it in Action

1. **Clone or Download the Repository**: Clone or download this repository.
2. **Install Dependencies**:
    - Install [Docker](https://docs.docker.com/desktop/) if you haven't done so already.
    - Install a recent version of [Node.js](https://nodejs.org).
3. **Start a PostgreSQL Database**:
    - Open a console and navigate to the `sql` directory.
    - Execute `docker compose up -d`. This will create a ready-to-try database and a preconfigured PgAdmin service.
    - Access PgAdmin at [http://localhost:5050](http://localhost:5050) with user `dev@dev.dev` and password `dev`.
    - When prompted for the PostgreSQL password, enter `dev` again. 
    - If you want the database to start from scratch, execute the following commands:
     ```sh
     docker compose down
     docker volume rm quest_postgres
     docker compose up -d
     ```
4. **Start the Server App**:
    - Open a console and navigate to the `quest-server` directory.
    - Run `npm ci` to install all required packages.
    - Start the server-side app by executing `npm run dev`.
5. **Start the Client-Side Application**:
    - Open a console and navigate to the `quest-client` directory.
    - Execute `npm ci` to install all required packages.
    - Start the Angular application by executing `npm run dev`.
6. **Open the Application**:
    - Open [http://localhost:4200](http://localhost:4200) in your browser.
7. **Start Playing with the Code**:
    - Changes will be reflected immediately in the browser or server.

#### Resources

- Check the database diagram with schemas, tables, relationships, and columns: [database-diagram.svg](resources/database-diagram.svg)

### Learn More

Visit [aoc-dev.io](https://aoc-dev.io).
