Overview

The application that I would like to build for my final project is a Case Management App. Case Management Guide provides an easy and efficient way for hospitals to identify post-acute care facilities that suit patient’s needs upon their discharge from a hospital. It narrows down available options and enhances the communication between hospital case managers.

UI Draft

My application will have the following views or pages:
•	A home page with header and footer which has an overview of the app. The navigation bar in header has the following options: Add/Update Facility and Search for Facility.
•	Add facility is a view for adding the Facilities and user will be able to Edit and remove an existing facility in this page. (From here, the data will be saved to database in Json format and the API will be created.)
•	The search page gives the ability to user to search in the data and find the matched facility/facilities…

Technical Requirements

My application will be a Mean Stack app, which means it relies on the following packages:
•	Mongo and one of the related frameworks (mongoose or (mongoojs))
•	Express
•	Angular
•	Node 


Features
My application will have the following features:
1.	form that will be submitted to my express server, I will have a route for handling this post request. Using angular controller and express server I will get the data from the client page and will post to the database and also displays it in the button of the form page….….the API will be formed in this stage….
Searching for the matched facility
2.	from here I will get the user input form client and using either angular filtering feature or the search feature of Mongo db, I will search in the API to find the matched data. The matched data will be displayed after the form view in the bottom of the page.

My project is live in : http://findfacilityapp-env.us-west-2.elasticbeanstalk.com/


