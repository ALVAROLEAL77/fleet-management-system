This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

<<<<<<< HEAD
- **NEXTJS:** A React framework for building fast and dynamic web applications.
- **JSX:** JavaScript XML for creating user interfaces.
- **TAILWINDCSS:** A utility-first CSS framework for flexible and responsive design.
- **SHADCN:** An innovative design system for creating beautiful interfaces.
- **RECHARTS:** A charting library for visually representing data.
- **NEXTJS API ROUTES:** Creating serverless API routes for seamless data interaction.
- **NEXT-AUTH:** For secure authentication and user management.
- **SEQUELIZE & PSQL:** Tools for efficient database management.
- **GOOGLE MAPS API:** For advanced geolocation and mapping features.
=======
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.
>>>>>>> parent of 796a4e5 (fix: previous commit didnt contain a custom README.md.)

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

<<<<<<< HEAD
## Installation
=======
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
>>>>>>> parent of 796a4e5 (fix: previous commit didnt contain a custom README.md.)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

<<<<<<< HEAD
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

| Method | Route             | Description                                   |
| ------ | ----------------- | --------------------------------------------- |
| GET    | /api/booking      | Retrieve a list of all booking records.       |
| POST   | /api/booking      | Create a new booking record.                  |
| DELETE | /api/booking/[id] | Delete a specific booking record by its ID.   |
| PUT    | /api/booking/[id] | Update an existing booking record by its ID.  |
| GET    | /api/booking/[id] | Retieve an existing booking record by its ID. |

#### Customers

| Method | Route              | Description                                     |
| ------ | ------------------ | ----------------------------------------------- |
| GET    | /api/customer      | Retrieve a list of all customer records.        |
| POST   | /api/customer      | Create a new customer record.                   |
| DELETE | /api/customer/[id] | Delete a specific customer record by its ID.    |
| PUT    | /api/customer/[id] | Update an existing customer record by its ID.   |
| GET    | /api/customer/[id] | Retrieve an existing customer record by its ID. |

#### Drivers

| Method | Route            | Description                                   |
| ------ | ---------------- | --------------------------------------------- |
| GET    | /api/driver      | Retrieve a list of all driver records.        |
| POST   | /api/driver      | Create a new driver record.                   |
| DELETE | /api/driver/[id] | Delete a specific driver record by its ID.    |
| PUT    | /api/driver/[id] | Update an existing driver record by its ID.   |
| GET    | /api/driver/[id] | Retrieve an existing driver record by its ID. |

#### Vehicles

| Method | Route             | Description                                    |
| ------ | ----------------- | ---------------------------------------------- |
| GET    | /api/vehicle      | Retrieve a list of all vehicle records.        |
| POST   | /api/vehicle      | Create a new vehicle record.                   |
| DELETE | /api/vehicle/[id] | Delete a specific vehicle record by its ID.    |
| PUT    | /api/vehicle/[id] | Update an existing vehicle record by its ID.   |
| GET    | /api/vehicle/[id] | Retrieve an existing vehicle record by its ID. |

#### Expenses

| Method | Route             | Description                                    |
| ------ | ----------------- | ---------------------------------------------- |
| GET    | /api/expense      | Retrieve a list of all expense records.        |
| POST   | /api/expense      | Create a new expense record.                   |
| DELETE | /api/expense/[id] | Delete a specific expense record by its ID.    |
| PUT    | /api/expense/[id] | Update an existing expense record by its ID.   |
| GET    | /api/expense/[id] | Retrieve an existing expense record by its ID. |
| POST   | /api/expense/[id] | Create an existing expense record by its ID.   |

#### Fueling Records

| Method | Route                   | Description                                          |
| ------ | ----------------------- | ---------------------------------------------------- |
| GET    | /api/fuelingrecord      | Retrieve a list of all fueling record entries.       |
| POST   | /api/fuelingrecord      | Create a new fueling record entry.                   |
| DELETE | /api/fuelingrecord/[id] | Delete a specific fueling record entry by its ID.    |
| PUT    | /api/fuelingrecord/[id] | Update an existing fueling record entry by its ID.   |
| GET    | /api/fuelingrecord/[id] | Retrieve an existing fueling record entry by its ID. |

#### Maintenance Records

| Method | Route                       | Description                                              |
| ------ | --------------------------- | -------------------------------------------------------- |
| GET    | /api/maintenancerecord      | Retrieve a list of all maintenance record entries.       |
| POST   | /api/maintenancerecord      | Create a new maintenance record entry.                   |
| DELETE | /api/maintenancerecord/[id] | Delete a specific maintenance record entry by its ID.    |
| PUT    | /api/maintenancerecord/[id] | Update an existing maintenance record entry by its ID.   |
| GET    | /api/maintenancerecord/[id] | Retrieve an existing maintenance record entry by its ID. |

#### Trips

| Method | Route          | Description                                 |
| ------ | -------------- | ------------------------------------------- |
| GET    | /api/trip      | Retrieve a list of all trip records.        |
| POST   | /api/trip      | Create a new trip record.                   |
| DELETE | /api/trip/[id] | Delete a specific trip record by its ID.    |
| PUT    | /api/trip/[id] | Update an existing trip record by its ID.   |
| GET    | /api/trip/[id] | Retrieve an existing trip record by its ID. |

#### User Roles

| Method | Route              | Description                                   |
| ------ | ------------------ | --------------------------------------------- |
| GET    | /api/userrole      | Retrieve a list of all user role records.     |
| POST   | /api/userrole      | Create a new user role record.                |
| DELETE | /api/userrole/[id] | Delete a specific user role record by its ID. |
| PUT    | /api/userrole/[id] | Update an existing user role record by        |
| GET    | /api/userrole/[id] | Retrieve an existing user role record by      |

#### Users

| Method | Route          | Description                              |
| ------ | -------------- | ---------------------------------------- |
| GET    | /api/user      | Retrieve a list of all user records.     |
| POST   | /api/user      | Create a new user record.                |
| DELETE | /api/user/[id] | Delete a specific user record by its ID. |
| PUT    | /api/user/[id] | Update an existing user record by        |
| GET    | /api/user/[id] | Retrieve an existing user record by      |

### Authorized Routes

#### Authentication

| Method | Route                   | Description                              |
| ------ | ----------------------- | ---------------------------------------- |
| GET    | /api/auth/[...nextauth] | Handles all the auth related operations. |
=======
Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
>>>>>>> parent of 796a4e5 (fix: previous commit didnt contain a custom README.md.)
