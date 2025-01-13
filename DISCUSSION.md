## Time limit and future considerations

# I used the 2 hours primarily to:
- Create the UI
- Clean up file structure & type errors
- Implement a reusable table structure that supports flexible content mapping
- Implement pagination on the frontend

# What I would do with more time:
- Add limit and offset to the backend configuration to make pagination fully functional and improve performance at a production level
- Standardize CSS rules across the repo (either remove Tailwind config or change from modular CSS files to Tailwind)
- Split the assignment into smaller PRs:
    - TS typing
    - String literal migration into constants file
    - Styling
    - Reusable table implementation
    - Pagination (frontend and backend)


## Type safety

The page.tsx file is technically TypeScript, but the page had a lot of type errors due to essential values not being typed - such as the 'advocate' object representing a single database record. For reusable types, I have created a separate types file in the app directory for modularity and imported it into the page file. Where applicable, I've applied single-use inline typing.


## Constants file

Hard-coding string values into the page prevents normally flexible elements inside it such as the table from being reusable. I have created a modular constants file in the app directory to store hard-coded string values. Not only does this enhance reusability - it also allows for future localication in the case that the website ever needs to be displayed in more than one language.


## Table updates: mapping, reusability, pagination, and expandable rows

Rather than hard-coding a single-use table, I have opted to use a table from Material UI. I have designed it to be reusable, flexible, and more performant. 

The table can accept any table headers object matching the structure of the SOLACE_ADVOCATES_TABLE_HEADERS constant (should have properties 'id', 'label', and 'minWidth') and map the assigned headers to the corresponding database results. The safe typing I have implemented in the Table file also ensures that the shape of the database result objects (in this case "advocates") must match the properties of the assigned table headers object.

Since the instructions said to consider that there could be hundreds of thousands of records in the database, I also implemented pagination to improve both performance and ease of use in the UI. With pagination, records are fetched in small batches instead of all at once, which will prevent extremely slow load times. It also eliminates any infinite scroll, which is a suboptimal quality of any UI.

Finally, I made lengthy table cell results (such as 'specialties') expandable and collapsable. This makes scrolling easy while still having the option to view all of an advocate's specialties without needing to navigate away from the page.


## Modular file & component structure

Although not completely necessary for the current scope of the repository, I implemented the beginnings of a sustainable file structure so that the project can remained organized and easy to navigate as it grows in scope. Inside the app directory, I created a folder for reusable components. Each component also has its own folder, which holds the component itself as well as a corresponding CSS file.


## Styling

I opted not to use Tailwind CSS, since I personally prefer ther use of modular CSS files for readability and reusability. 

I derived the styles from the solace.health website.