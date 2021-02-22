# Depict
What is it?\
A website where users can make random drawings and see others' creations.

[Repository](https://github.com/friedcouch/Depict)\
[Website](https://depict.netlify.app)

## Running locally
To run this project locally, you will need:
1. NodeJS & NPM
2. Netlify 
3. SupabaseJS

Move into project folder:\
`cd Depict`

Install packages:\
`npm install`

Run the website locally:\
`npm run serve`

If that doesn't work:\
`./node_modules/.bin/netlify dev`

\* If you decided to `git clone` the repository, you'll need the database key, which should be stored in a `.env` file.

## Design Process:
### Target Audience
- People who love to explore art and love to create artworks.

### Purpose of Website
- It is for user to appreciate different kind of artwork that have been done by other creators.
- It also to allow user to create their own artpiece and show it to others.

## Technologies used
1. HTML
  - The mark-up language used to structure content
3. Adobe Xd
  - The tool I used to make wireframes for the website
4. Visual Studio Code
  - VS Code is the code editor I wrote HTML, SASS, JS, and the Readme file in. Plugins such as live server helped speed up the development process for me.
5. Git & Github
  - Git is a version control system and Github is where I hosted the files for the website. I used Git Bash in VS Code to add, commit and push files to this Github repository, which was quite convenient.
6. jQuery
  - For easier manipulation of the DOM
7. Supabase
  - Supabase is an open-source alternative to Google's firebase. It uses an SQL database and Netlify's Gotrue library for authentication.
8. Netlify
  - A platform for hosting static websites.
  - Faster than Github Pages, anecdotally speaking.
  - Easy to setup; all that is needed is to link the website to a Github repository. Whenever the repository is updated, Netlify will update the website accordingly in around 1-2 minutes.
  - Easy-to-use Lambda Functions which allows us to create a small API to access our database while keeping our API key a secret.
9. TwoJS
  - The library used to create the svg

## Testing
- Index:
	- Click on sign up, fill in the details and make sure that when submit its doesnt show any error and successfully creates account.
	- Click on sign in, fill in account details and make sure that it login successfully.
	- Once login make sure that there is create canvas and profile navigation link at the menu
	- After being able to successfully login, click on create canvas and start generating different kind of strokes and name the artwork and make sure that when you click on post it goes through successfully.
	- Click profile make sure that it goes to profile page and display the correct login account information.
	- On the canvas posts by other people, click on the creator name and make sure it goes to profile page and display the creator name and artworks.
	- Once login make sure that when sign out, create canvas and profile navigation link is no longer there.
	- When login, when u click on the like button on the canvas post it should increase the link by 1, once clicked again it will decrease the like by 1.

	

