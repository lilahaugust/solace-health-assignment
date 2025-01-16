# Time limit and future considerations

## I used the 2 hours primarily to:
- Create the UI
- Clean up file structure & type errors
- Implement a reusable table structure that supports flexible content mapping
- Implement pagination on the frontend

## PR Structure:
I created a couple of PRs on the frontend which I merged into main. I left a couple of PRs for the backend open.

## What I would do with more time:
- Add limit and offset to the backend configuration for fetching advocates
- Standardize CSS rules across the repo (either remove Tailwind config or change from modular CSS files to Tailwind)
- Split the assignment into smaller PRs:
    - TS typing
    - String literal migration into constants file
    - Styling
    - Reusable table implementation
    - Pagination (frontend and backend)


# Cleanup

## Pagination & performance considerations

Although not functional on the backend, I chose to partially implement pagination on the frontend to show how I would consider performance at a production level. When I followed the instructions in the README to configure a database, it was seeded with the same 15 results as the sample data; however, in the case of a large database with hundreds of thousands of records, I would add limit and offset to the API route so that records would be fetched in small batches instead of all at once -- preventing slow load times.

## Type safety

The page.tsx file is technically TypeScript, but the page had a lot of type errors due to essential values not being typed - such as the 'advocate' object representing a single database record. I have created some reusable types living in a relevant file in the utils folder. Where applicable, I've applied single-use inline typing.

## Constants file

Hard-coding string values into the page prevents normally flexible elements inside it such as the table from being reusable. I have created a modular constants file in the app directory to store hard-coded string values. Not only does this enhance reusability - it also allows for future localication in the case that the website ever needs to be displayed in more than one language.

## Table updates: mapping, reusability, pagination, and expandable rows

I have replaced the hard-coded, single use table with a table from Material UI. I have designed it to be reusable, flexible, and more performant. 

The table can accept any table headers object that contains the properties 'id', 'label', 'minWidth' and will map the assigned headers using their IDs to the corresponding database results. The safe typing I have implemented in the Table file also ensures that the shape of the database result objects (in this case "advocates") must match the properties of the assigned table headers object.

I also implemented pagination (per my explanation above) to improve both performance and ease of use in the UI.

Finally, I made lengthy table cell results (such as 'specialties') expandable and collapsable. This makes scrolling easy while still having the option to view all of an advocate's specialties without needing to navigate away from the page.

## Modular file & component structure

Although not completely necessary for the current scope of the repository, I implemented the beginnings of a sustainable file structure so that the project can remained organized and easy to navigate as it grows in scope. Inside the app directory, I created separate folders for components, utils, and constants. If the project were larger, this could also be applied for things like types, pages, and styles.

## Styling

I have copied some styles from various places in the solace.health website. I opted not to use Tailwind CSS, since I personally prefer the use of modular CSS files for readability and reusability. With more time, I would want to further standardize styling conventions across the repo by creating using a CSS preprocessor (Sass or similar) to implement a central file for colors, font families & sizes, etc. Since Material UI has its own separate styling rules (which you can see in components/Table/), I'd also likely opt to create a reusable table myself rather than pulling one from MUI or similar.
