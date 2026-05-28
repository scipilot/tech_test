# Simple API server for the Tic-Tac-Toe game
# built using Express.js

e.g.

    cd api
    npm i
    npm run dev

    # get all scores
    curl http://localhost:7000/api/scores -i    

    # fetch a score
    curl http://localhost:7000/api/scores/1 -i


# Prisma setup

Prisma was added thus:

    npm install prisma @types/node @types/better-sqlite3 -D
    npm install @prisma/client @prisma/adapter-better-sqlite3 dotenv
    # Update tsconfig.json for ESM compatibility (use tsx, so much better than ts-node) ...
    npx prisma init --datasource-provider sqlite --output ../generated/prisma
    # add models to prisma/schema.prisma ...
    # add seed to prisma/schema.prisma (player 1/2)
    npx prisma migrate dev --name init
    npx prisma generate
