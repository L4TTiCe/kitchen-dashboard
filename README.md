# Kitchen Dashboard
This repository contains the frontend for the project, build using SvelteKit. The middle-tier which is alse required to run the application is available at [github.com/L4TTiCe/KitchenDashboard](https://github.com/L4TTiCe/KitchenDashboard).

### Overview

This Project helps maintain an inventory of all food items purchased, tracking their location (within the kitchen, could
be a named cupboard, the refrigerator, etc.,), nutritional information (including calories, carbohydrates, proteins,
etc.,), and ownership, within a single kitchen.

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
