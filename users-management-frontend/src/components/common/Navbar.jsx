import React from "react";
import { Link } from "react-router-dom";
import UserService from "../service/UserService";

function Navbar() {
    const isAuthenticated = UserService.isAuthenticated();
    const isAdmin = UserService.isAdmin();

    const handleLogout = () => {
        const confirmDelete = window.confirm('Logout this user?');
        if (confirmDelete) {
            UserService.logout();
        }
    };

    return (
            <nav>
                <ul>
                    {!isAuthenticated && <li><Link to="/">Home</Link></li>}
                    {isAuthenticated && <li><Link to="/profile">Profile</Link></li>}
                    {isAdmin && <li><Link to="admin/user-management">User Management</Link></li>}
                    {isAuthenticated && <li><Link to="/" onClick={handleLogout}>Logout</Link>n</li>}
                </ul>
            </nav>
    );
}

export default Navbar;