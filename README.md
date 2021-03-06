
# project-mam

This is the code for my personal website which will eventually host my personal portfolio, my blog, and will allow people to contact me directly throught the webpage.

The homepage of this website should meet the following criteria or 'user-stories' as defined by FreeCodeCamp.

- User Story: I can access all of the portfolio webpage's content just by scrolling.

- User Story: I can click different buttons that will take me to the portfolio creator's different social media pages.

- User Story: I can see thumbnail images of different projects the portfolio creator has built (if you haven't built any websites before, use placeholders.)

- User Story: I navigate to different sections of the webpage by clicking buttons in the navigation.

To Do List:
- Add admin pages and behind-the-scenes management pages so that I can manage website content and view messages from within the website.
  - add forms to update items
- Add tests for all API endpoints
- Create gulp task and uniform format to bring in projects to home page automatically.
- Add tests for controller code
- Add row layout to project page
- Add filtering, sorting and view change functionality to projects viewing page.
- Use nodemailer (or equivalent) to verify subscriptions and messages
- Add 2FA to admin login and saves

Steps to Go Live:
- Add Admin user to mongodb
- Add client user for project-mam in mongodb
- Execute mongodb script for projects only "Node scripts/mongodb.init.js projects"
- Create Admin user with admin script "Node scripts/userCreation.js"
- npm run production