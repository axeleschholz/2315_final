# COMP 2315 Final Project

#### Running

First clone the repo:
`git clone https://github.com/axeleschholz/2315_final.git`

`cd 2513_final`

Then start the API:
`node server.js`

Now start the development server inside the App directory:
`cd App`
`npm start`

![Picture of the homepage](https://github.com/axeleschholz/2315_final/blob/main/homepage.png)

#### The App

This is a basic CRUD app for book data taken from an opensource goodreads database. It was made using the MERN stack with the database hosted on clevercloud.

Additional functionality includes:

- Routing to seperate pages
- List and specific views
- Custom navbar
- Sorting by attribute in list view

#### The Process

I started by implementing the basic CRUD functionality. I had some difficutly with the routing, react uses it's own method of routing pages that is very different from other frameworks. On top of that I was using the newest version of _react-router-dom_, which meant a lot of the literature on it was obselete. But I managed to seperate different funcitionalities into different pages. The navbar was a relatively straightforward addon once I'd figured out the routing.

The sorting was also a challenge. I started by tring to sort the state values locally in the component, but with over 2000 entries that took way to long, and it didn't support future pagination. So instead I configured the API to accept query parameters that specified how the data would be sorted and used the .sort() method in the express request.

One of the other major challenges was inherent in using the _bookID_ attribute for all requests, rather than the _\_id_. Unlike _\_id_, _bookID_ was not automatically added by the database as a unique identifier. To ensure that I had a new unique bookID for every added document, I created a seperate collection in the database called "other" with a single document that kept track of what the next free _bookID_ was. To increment this I had to play around with the asychronous nature of express requests for a while. The fix turned out to be really simple but this one gave me a headache.

#### Going Forward

I did the majority of this project while down with covid, so it's not at the level of functionality I'd like it to be. But overall I'm rather happy with how it turned out. In the future I'd like to come back and spruce up the edit/new form, I'd also love to add incremental loading for the list view to speed things along.

#### Thanks for reading!
