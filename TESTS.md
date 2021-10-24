# Test Cases
- **Adding new orders**
  - Click on New Order button will bring up the order form modal
  - Button on modal will be disabled until all the input requirements are met
  - Pressing add button will add new orders to the unassigned orders lis

- **Adding new drivers**
  - click on new driver button will up the driver form modal
  - button on modal will be disabled until all input requirement are met
  - Pressing add button will add the driver to the app.

- **Reordering unassigned orders**
  - click and hold the drag icon in the individual order list to grab the list
  - When grabbed, background turns green and hovered container background turns blue
  - Dropping the orders anywhere in the unassigned orders should retain its positions but not remove it from the database 

- **Assigning orders to drivers or moving orders between drivers**
  - click and hold the drag icon in the individual order list to grab the list
  - When grabbed, background turns green and hovered container background turns blue
  - Dropping the order in any of the drivers container should assign them to the driver and update the database


- **Deleting Orders**
  - Clicking the delete button will bring up confirmation message with the order ID of the order. 
  - On yes, the order will delete and remove from the database
  - On no, the order will stay

- **Deleting Drivers**
  - Deleting the X button next to the driver name will bring up the confirmation message with the name of the driver you choose to delete.
  - On yes, the driver will be removed from the database
  - On no, the driver will stay
  - If the driver has orders assigned, error messages will show blocking the deletion.

- **Updating Orders**
  - Clicking the edit button (pencil) will bring up the edit form modal
  - The input should contain the current revenue and cost of the order
  - On pressing update, the order will be changed to the new values in both database and UI

