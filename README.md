# Basic Banking System

## Overview
This is a simple banking system that allows users to view customer details, transfer money, and track transactions. The project is built using Node.js, Express, MongoDB, and EJS for templating.

## Features
- **User Interface:** Responsive and intuitive UI for easy navigation.
- **Customer Data Management:** Uses MongoDB to store customer information securely.
- **Dummy Data Generation:** Generates up to 10 dummy customers.
- **Customers Table:** Displays customer details including name, email, and balance.
- **Transfers Table:** Logs transactions with details like date, sender, recipient, and amount.
- **Transaction Functionality:** Ensures users can transfer money with balance validation.
- **Balance Update:** Updates customer balances in real-time.
- **Security Measures:** Implements authentication and secure coding practices.
- **Scalability:** Designed to handle growing users and transactions.

## Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Frontend:** HTML, CSS, EJS, Bootstrap

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/basic-banking-system.git
   cd basic-banking-system
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables (create a `.env` file):
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=3000
   ```
4. Run the server:
   ```sh
   npm start
   ```
5. Open `http://localhost:3000` in your browser.

## Folder Structure
```
📦 basic-banking-system
 ┣ 📂 public            # Static assets (CSS, images)
 ┣ 📂 views             # EJS templates for frontend
 ┣ 📂 routes            # Express routes (customers, transactions)
 ┣ 📂 models            # Mongoose schemas
 ┣ 📜 server.js         # Main server file
 ┣ 📜 package.json      # Dependencies and scripts
 ┣ 📜 .env              # Environment variables
 ┗ 📜 README.md         # Project documentation
```

## API Endpoints
| Method | Route            | Description                     |
|--------|----------------|---------------------------------|
| GET    | `/`            | Home Page                       |
| GET    | `/customers`   | Display all customers           |
| GET    | `/transfer`    | Transfer money UI               |
| POST   | `/transfer`    | Process a transaction           |
| GET    | `/transactions`| View transaction history        |

## Design and UI
The interface is designed with a modern, responsive look using Bootstrap and CSS. It includes:
- A **home page** with an overview of the banking system.
- A **customers page** displaying a list of all customers with their details.
- A **transfer page** allowing users to select sender, receiver, and amount.
- A **transactions page** showing a history of all completed transactions.

### Screenshots
#### Home Page
![Home Page](demo-images/home.png)
#### Customers Table
![Customers Table](demo-images/customers.png)
#### Transaction Page
![Transaction Page](demo-images/transfer.png)
#### Transactions History
![Transactions History](demo-images/transactions.png)

## License
This project is open-source and available under the MIT License.

---

Feel free to contribute or suggest improvements!
