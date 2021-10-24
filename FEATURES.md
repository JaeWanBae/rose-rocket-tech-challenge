# Features

# Suggested Features that were added from specifications
- Ability to create new drivers and orders
- Ability to delete drivers and orders
- Connected to MongoDB to persist data

# Known Bugs
- Assigned orders for drivers cannot be shuffled around
- Delay when orders are being moved around between the drivers and unassigned orders
- When dragging assigned orders to unassigned orders, the orders snap back to original position instead of keeping the position that was drag and dropped to. 

# Areas of Improvement
The app can be improve in many areas. I wish I had more time to work on this but my time had to be heavily invested in learning backend and making sure that the server was set up properly.

- **Responsivity:** Currently, the app will not support any other devices. It is designed to be a browser app. With more time, I would make sure that the app is responsive so that it can be used on a tablet and phone. 

- **Code Organization:** As I got further in to the tech challenge. I noticed that some of the components were getting heavily bogged down. With more time, I believe I could of organized a code better and made it much more readable. 

- **Design:** I ended up using certain libraries for quick, accessibly designs for the modal and buttons. Working with a designer, I could make the app more aesthetically pleasing. 

- **Drag and Drop:** Using the react beautiful DnD with mongoDB was a lot harder than expected. Given more time to study and practice react DnD. I could possibly come up with a smarter data schema and create a more efficient, working code. 

- **Deply the site live:** I would of loved to deploy this app to see if there were any bugs that would show up during deployment. But with my hands being full with just getting the challenge done, I couldn't figure out how to deploy a full-stack app. 

- **Order ID:** The sample data given has the order ID to every order. While the app takes in the Order ID as an input when creating new orders, and uses it so that no orders are alike, I did not pull up the order ID in the UI of the app to the draggable order lists. Mainly due to lack of space. With a designer working with me, perhaps there would be an elegant solution to it. 

- **Driver with the same name:** Currently, you can create a driver with the same name as an existing driver. The app won't break as they are given a unique ID. however, you cannot tell which is what in the UI. 

- **console.logs in the catch:** With my current level of understanding, I couldn't really find what to put in the catch to make the app more fool proof. I made as much error handling as I can and just could not figure out what to put in the catch block. Hopefully I'll learn soon! 

-**Input Number with e:** Currently the input numbers take in the value of e because e is a mathematical expression for exponents

# Ideas for other features
These could be really fun to implement to this sort of app!
- Click the order to expand the order list to contain the exact nature of the order. (who ordered it, where is it going, how many of what items) 
- Search function to filter through the orders or drivers to locate a specific driver
- Ability to drag and drop the whole Driver card to rearrange which driver is at the top. (further could be expanded to make sure that the driver with the most amount of orders are listed at the front or back)
- When adding new order, can immediately assign a driver in the form 
