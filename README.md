# Fleet Management System

## Overview

This **Fleet Management System** is a robust one-of-a-kind software solution I designed to streamline the management of vehicle fleets. It seamlessly integrates a set of interconnected tables, each dedicated to specific aspects of fleet operations. My system empowers businesses with real-time tracking, optimized scheduling, and data-driven decision-making, enabling them to enhance operational efficiency, reduce costs, and deliver outstanding customer service while safeguarding the safety and maintenance of their fleet. This holistic approach propels businesses toward success and sustained growth.

## Technologies Used

Our Fleet Management System leverages a combination of cutting-edge technologies to provide a robust and efficient solution:

- **NEXTJS:** A React framework for building fast and dynamic web applications.
- **JSX:** JavaScript XML for creating user interfaces.
- **TAILWINDCSS:** A utility-first CSS framework for flexible and responsive design.
- **SHADCN:** An innovative design system for creating beautiful interfaces.
- **RECHARTS:** A charting library for visually representing data.
- **NEXTJS API ROUTES:** Creating serverless API routes for seamless data interaction.
- **NEXT-AUTH:** For secure authentication and user management.
- **SEQUELIZE & PSQL:** Tools for efficient database management.
- **GOOGLE MAPS API:** For advanced geolocation and mapping features.

## Database Tables

The Fleet Management System comprises the following database tables:

| Table Name         | Description                                                                                         | Database Type |
| ------------------ | --------------------------------------------------------------------------------------------------- | ------------- |
| Bookings           | Stores data related to vehicle reservations and scheduling.                                         | Postgres      |
| Customers          | Manages customer data, enabling effective customer relationship management.                         | Postgres      |
| Drivers            | Maintains driver profiles, including personal information, licenses, and contact details.           | Postgres      |
| Expenses           | Tracks financial data related to fleet maintenance and operational costs.                           | Postgres      |
| FuelingRecords     | Logs fueling transactions to monitor fuel consumption, costs, and fleet efficiency.                 | Postgres      |
| MaintenanceRecords | Keeps records of vehicle maintenance and service to ensure vehicles are well-maintained and safe.   | Postgres      |
| Trips              | Records trip details, including start and end times, distances traveled, and routes taken.          | Postgres      |
| UserRoles          | Defines different user roles and their permissions within the system.                               | Postgres      |
| Users              | Stores user profiles, including administrators, managers, and other system users.                   | Postgres      |
| Vehicles           | Contains vehicle information, including make, model, registration details, and maintenance history. | Postgres      |

These tables work in concert to provide a comprehensive solution for managing a fleet of vehicles, enhancing operational efficiency, and enabling data-driven decision-making.

## Installation

To set up the Fleet Management System, follow these straightforward installation steps:

1. Clone the repository:

   ```shell
   git clone https://github.com/yaseressa/fleet-management-system
   ```

2. Install project dependencies:

   ```shell
   npm install
   ```

3. Create a `.env.local` file in the project root directory and add the following environment variables:

   ```shell
   DB_USER=[postgres]
   DB_NAME=[your_pg_db_name]
   DB_HOST=[your_pg_host]
   DB_PASS=[your_pg_password]
   BCRYPT_SALT=your_salt
   NEXT_PUBLIC_GMAPS_API=[custom]
   NEXT_PUBLIC_APP_URL=[custom]
   NEXTAUTH_URL=[custom]/api/auth
   NEXTAUTH_SECRET=[custom]
   ```

4. Run the database migration using Sequelize CLI:

   ```shell
   npx sequelize-cli db:migrate
   ```

5. For a development environment, execute:

   ```shell
   npm run dev
   ```

   For a production environment, build the project and then start the server:

   ```shell
   npm run build
   npm start
   ```

## API Routes

### Authorized Routes

#### Bookings

| Method | Route             | Description                                  |
| ------ | ----------------- | -------------------------------------------- |
| GET    | /api/booking      | Retrieve a list of all booking records.      |
| POST   | /api/booking      | Create a new booking record.                 |
| DELETE | /api/booking/[id] | Delete a specific booking record by its ID.  |
| PUT    | /api/booking/[id] | Update an existing booking record by its ID. |

#### Customers

| Method | Route              | Description                                   |
| ------ | ------------------ | --------------------------------------------- |
| GET    | /api/customer      | Retrieve a list of all customer records.      |
| POST   | /api/customer      | Create a new customer record.                 |
| DELETE | /api/customer/[id] | Delete a specific customer record by its ID.  |
| PUT    | /api/customer/[id] | Update an existing customer record by its ID. |

#### Drivers

| Method | Route            | Description                                 |
| ------ | ---------------- | ------------------------------------------- |
| GET    | /api/driver      | Retrieve a list of all driver records.      |
| POST   | /api/driver      | Create a new driver record.                 |
| DELETE | /api/driver/[id] | Delete a specific driver record by its ID.  |
| PUT    | /api/driver/[id] | Update an existing driver record by its ID. |

#### Vehicles

| Method | Route             | Description                                  |
| ------ | ----------------- | -------------------------------------------- |
| GET    | /api/vehicle      | Retrieve a list of all vehicle records.      |
| POST   | /api/vehicle      | Create a new vehicle record.                 |
| DELETE | /api/vehicle/[id] | Delete a specific vehicle record by its ID.  |
| PUT    | /api/vehicle/[id] | Update an existing vehicle record by its ID. |

#### Expenses

| Method | Route             | Description                                  |
| ------ | ----------------- | -------------------------------------------- |
| GET    | /api/expense      | Retrieve a list of all expense records.      |
| POST   | /api/expense      | Create a new expense record.                 |
| DELETE | /api/expense/[id] | Delete a specific expense record by its ID.  |
| PUT    | /api/expense/[id] | Update an existing expense record by its ID. |

#### Fueling Records

| Method | Route                   | Description                                        |
| ------ | ----------------------- | -------------------------------------------------- |
| GET    | /api/fuelingrecord      | Retrieve a list of all fueling record entries.     |
| POST   | /api/fuelingrecord      | Create a new fueling record entry.                 |
| DELETE | /api/fuelingrecord/[id] | Delete a specific fueling record entry by its ID.  |
| PUT    | /api/fuelingrecord/[id] | Update an existing fueling record entry by its ID. |

#### Maintenance Records

| Method | Route                       | Description                                            |
| ------ | --------------------------- | ------------------------------------------------------ |
| GET    | /api/maintenancerecord      | Retrieve a list of all maintenance record entries.     |
| POST   | /api/maintenancerecord      | Create a new maintenance record entry.                 |
| DELETE | /api/maintenancerecord/[id] | Delete a specific maintenance record entry by its ID.  |
| PUT    | /api/maintenancerecord/[id] | Update an existing maintenance record entry by its ID. |

#### Trips

| Method | Route          | Description                               |
| ------ | -------------- | ----------------------------------------- |
| GET    | /api/trip      | Retrieve a list of all trip records.      |
| POST   | /api/trip      | Create a new trip record.                 |
| DELETE | /api/trip/[id] | Delete a specific trip record by its ID.  |
| PUT    | /api/trip/[id] | Update an existing trip record by its ID. |

#### User Roles

| Method | Route              | Description                                   |
| ------ | ------------------ | --------------------------------------------- |
| GET    | /api/userrole      | Retrieve a list of all user role records.     |
| POST   | /api/userrole      | Create a new user role record.                |
| DELETE | /api/userrole/[id] | Delete a specific user role record by its ID. |
| PUT    | /api/userrole/[id] | Update an existing user role record by        |

#### Users

| Method | Route          | Description                              |
| ------ | -------------- | ---------------------------------------- |
| GET    | /api/user      | Retrieve a list of all user records.     |
| POST   | /api/user      | Create a new user record.                |
| DELETE | /api/user/[id] | Delete a specific user record by its ID. |
| PUT    | /api/user/[id] | Update an existing user record by        |

### Authorized Routes

#### Authentication

| Method | Route                   | Description                              |
| ------ | ----------------------- | ---------------------------------------- |
| GET    | /api/auth/[...nextauth] | Handles all the auth related operations. |
