
import react from "react";
import "./App.css";
import {BrowserRouter as Router,Routes,Route,NavLink} from "react-router-dom";
import Formdata from "./Inventory/Formdata";
import Dashboard from "./dashboard/dashboard";
import User from "./Home/User_profile.js";
import About from "./Home/About";
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <Router>
      <div className="app-root">
        <TopBar />
        <div className="app-body">
          <Sidebar />
          <main className="main-area">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/inventory" element={<Formdata />} />
              <Route path="/about" element={<About />} />
              <Route path="/user" element={<User />} />

            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

function TopBar() {
  return (
    <header className="topbar">
      <div className="container">
        <h1 className="brand">Inventory Management Admin</h1>
        {/* <div className="status">Local Dev Server</div> */}
      </div>
    </header>
  );
}

function Sidebar() {
  return (
    <aside className="sidebar">
      <nav>
        <NavLink to="/about" end className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>About</NavLink>
        <NavLink to="/user" end className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>User</NavLink>
        <NavLink to="/dashboard" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>Dashboard</NavLink>
        <NavLink to="/inventory" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}> Inventory</NavLink>
      </nav>
    </aside>
  );
}

// --- Utility components placed BEFORE use to avoid ESLint 'not defined' or 'defined but never used' issues ---
// function Card({ title, body }) {
//   return (
//     <div className="card">
//       <h3>{title}</h3>
//       <p>{body}</p>
//     </div>
//   );
// }

// function Panel({ title, children }) {
//   return (
//     <div className="panel">
//       <h3>{title}</h3>
//       <div className="panel-body">{children}</div>
//     </div>
//   );
// }

function Home() {
  return (
    <section>
      <h2>Home</h2>
      <p>Welcome to your app. Use the sidebar to navigate to Dashboard and Inventory.</p>

      <div className="card-row">
        {/* <Card title="Quick Links" body="Create products, view orders, or open settings." />
        <Card title="Stats" body="Daily visitors: 123 — Sales: ₹12,340" />
        <Card title="Notes" body="This is a starter template. Customize components as needed." /> */}

      </div>
    </section>
  );
}

// function Dashboard() {
//   return (
//     <section>
//       <h2>Dashboard</h2>
//       <p>High level metrics and charts (placeholder).</p>
//       <div className="panel-row">
//         <Panel title="Sales Overview">This could be a chart component.</Panel>
//         <Panel title="Top Products">List your bestsellers here.</Panel>
//       </div>
//     </section>
//   );
// }

// function Inventory() {
//   // items must be declared inside the component scope — moved here to fix `no-undef` ESLint error
//   const items = [
//     { id: "P-001", name: "Veg Dum Biryani", qty: 120 },
//     { id: "P-002", name: "Paneer Biryani", qty: 80 },
//     { id: "P-003", name: "Rice Bowl", qty: 40 },
//   ];

//   return (
//     <section>
//       <h2>Inventory</h2>
//       <p>Current stock for your products. Hook this up to your backend or local state.</p>

//       <div className="table-wrap">
//         <table className="inventory-table">
//           <thead>
//             <tr>
//               <th>Product ID</th>
//               <th>Name</th>
//               <th>Quantity</th>
//             </tr>
//           </thead>
//           <tbody>
//             {items.map(it => (
//               <tr key={it.id}>
//                 <td>{it.id}</td>
//
export default App;