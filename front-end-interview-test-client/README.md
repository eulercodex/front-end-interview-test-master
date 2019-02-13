### Remine Front End Interview Test

#### Environment

You may use whatever coding environment you would like, though, we will be testing your code with the following:

- Node version 8+ 
- Chrome browser version 60+

#### To Do

1. Obtain the list of locations and building type categories from `front-end-interview-test-api` using the included `API.js` in **_this_** project
2. Populate the `RemineTable` component inside of `InterviewTestContainer.js` with the locations obtained from step 1.
3. Update `InterviewTestContainer.js` and any other files you need to in order to allow a user to filter the `RemineTable` contents based on whether the location has:
    * a number of beds in a user specified range
    * a number of baths in a user specified range
    * the same building type as the one specified by the user (the user can select from a list of building types that come from the API)

    If a user has not specified a bound in a range or a type for the building type, default to show all. If no filters are active or being applied, all locations should be shown in the `RemineTable`. 
    
#### Example use case:

Display all listings that have:
   * More than 2 baths
   * **And** Between 9 and 98 beds
   * **And** is a Condo or Office building type

#### Grading

**THIS SHOULD BE PRODUCTION LEVEL CODE**

* Your submission should be bug-free, both in terms of logic and UI
* Your code should be clear and readable, with the assumption that it could be maintained by another developer after you
* The use of additional dependencies is allowed

##### Bonus

If you would like to further impress us with your project, here are a few suggestions. Note that these are NOT expected or required:

* Unit tests
* Well-designed/aesthetic interface
* Improved performance and scalability
* Integration of a state management framework (eg. Redux or Mobx)

Good luck!

![](https://media.giphy.com/media/26DOs997h6fgsCthu/giphy.gif)
