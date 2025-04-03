# Product Management App 

### This is a Product Management App built with React, TypeScript, and Vite. It allows users to view, add, update, and delete products.

--- -----

##### To run the App locally:

1. Clone the repository:

    `git clone https://github.com/lilydn/product-management-app.git`

   `cd product-management-app`


2. Install dependencies: `npm install`

3. To start the development server, run `npm start`


4. To lint the code, run: `npm run lint`

5. To format the code, run: `npm run pretty`


--- --- ---


##### Features and implementation notes 📝:

* The app is written with React, it uses Redux Toolkit for state management.
* The app uses Typescript and Javascript
* Initial product list mock data is stored as a json file in `/data` directory.      
* The app uses Redux Toolkit to manage productList state as it would have in a real world project.
* The data CRUD operations: GET, POST, PUT and DELETE are managed in `/api/productsApi` file - and handled in redux thunk functions - which activate reducers and update the state, also there is handling of loading and error states.
* I added a utility function to simulate delay and optional error response of api requests to handle such cases.
* After product list have been fetched it is saved to the redux store global state.
* ProductsPage component subscribed to the product list global state.
* There is the option for the user to click on an item, see the item opened on the DetailsView panel, modify the item and save it, delete an existing item from the list, add new item and sort the list by creationDate or Name.
* There is a validation on the inputs on the form, save button is disabled if one of the inputs doesn't match the validation.
* When an item that is currently selected is deleted - the form resets.
* After a successful save (add new or edit item) - the form doesn't continue to show the item - the selectedItem resets and the form disappears which would be an indication for the user that the operation completed successfully.
* Loading and error states are visible in appropriate places for each operation (on the action button, or on the container for fetching all items).
* Filtering and sorting logic is separated to a custom hook for better readability.
* All changes to the list are automatically saved to the browser’s local storage.


##### Features that I would add (just for fun 🙂):
* Pagination on the bottom of the list (bonus requirement) - a logic that stores current page, amount of items per page, and returns the correct list to be displayed on a certain page, taking into consideration also filtering and sorting state.
* Full coverage of Typescript.
* Improvement of styling and overall css structure and css rules.
* Make more ui elements as common reusable components (for example the image renderer)
* Routing capabilities: make the currently selected product id as part of the route (there is basic routing added and /products route currently leads to the products page).
* Add sort order option
* Debouncing - when data is filtered on type - it can lead to performance issues in large datasets and heavier dom structure.
* Deploy the app on a hosting service 



--- --- ---

Before running the app locally - here is a quick demonstration recording:

https://github.com/user-attachments/assets/30492a3f-1561-46d5-8282-8e3e9c948ad6


