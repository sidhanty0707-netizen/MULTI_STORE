import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">

       <Link href="/" className="navbar-brand">
  Multi Store Order Management
</Link>

        <div className="navbar-nav ms-auto">

          <Link href="/" className="nav-link">
            Home
          </Link>

          <Link href="/create-order" className="nav-link">
            Create Order
          </Link>

          <Link href="/orders" className="nav-link">
            Orders
          </Link>

          <Link href="/update-status" className="nav-link">
            Update Status
          </Link>

        </div>

      </div>
    </nav>
  );
}