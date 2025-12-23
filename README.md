# 💳 Wallet Backoffice Management System

A modern, responsive dashboard built with **Angular 18+** for managing user wallets, vendor accounts, and financial transactions. This system features a robust role-based access control (RBAC) system tailored for both Administrators and Vendors.

## 🚀 Key Features

* **Role-Based Dashboards:** * **Admins:** Full access to Users, Vendors, and global Transactions.
* **Vendors:** Streamlined view focused on personal Wallet balance and private Transaction history.


* **Dynamic Routing:** Intelligent entry points—Vendors land on their Transactions automatically, while Admins land on the User Management overview.
* **Responsive Sidebar:** A sleek, collapsible navigation bar that adapts to screen sizes and filters menu items based on the logged-in user's role.
* **Advanced Transaction Management:** * Tabbed filtering (Normal, Charges, Settlements).
* Credit execution modals with real-time feedback.


* **Modern UI/UX:** * Custom styled **Material Snackbars** for success/error notifications.
* Clean, data-heavy tables optimized for readability.
* Responsive login page with secure JWT-based authentication.



## 🛠 Tech Stack

* **Frontend:** Angular (Standalone Components)
* **State Management:** RxJS & LocalStorage for session persistence.
* **Styling:** CSS3 (Flexbox/Grid) & Angular Material.
* **Security:** HTTP Interceptors for Bearer Token injection and Route Guards for unauthorized access prevention.

## 📂 Project Structure

```text
src/app/
├── core/               # Interceptors, Guards, Models, and Services
│   ├── guards/         # AuthGuard for route protection
│   ├── interceptor/    # AuthInterceptor for API headers
│   └── services/       # Logic for Auth, Transactions, and Users
├── layout/             # Shared Layouts (Sidebar, Main Wrapper)
├── pages/              # Feature Modules
│   ├── login/          # Secure Authentication
│   ├── transactions/   # Transaction list and filtering
│   ├── users-wallets/  # User management & Profiles
│   └── vendors-wallets/# Vendor balances & Settlement actions
└── shared/             # Reusable UI components

```

## ⚙️ Installation & Setup

1. **Clone the repository:**
```bash
git clone https://github.com/your-username/wallet-backoffice.git

```


2. **Install dependencies:**
```bash
npm install

```


3. **Configure Environment:**
Update `src/environments/environment.ts` with your API base URL:
```typescript
export const environment = {
  production: false,
  apiUrl: 'https://your-api-endpoint.com/api'
};

```


4. **Run the application:**
```bash
ng serve

```


Navigate to `http://localhost:4200/`.

## 🔐 Authentication Logic

The system uses a centralized `AuthService` to manage tokens and user roles.

* **Token Injection:** The `AuthInterceptor` automatically attaches the `Bearer` token to all outgoing requests except for the login and assets paths.
* **Conditional Redirects:** ```typescript
// app.routes.ts logic
redirectTo: () => {
const userType = localStorage.getItem('user_type');
return userType === 'vendors' ? 'transactions' : 'users';
}
```


```

