import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import UsersService from "../service/UserService";

function UserManagementPage() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // fetch users data when the component mounts
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            
            const token = localStorage.getItem('token')
            const response = await UsersService.getAllUser(token);
            setUsers(response.ourUsersList); // list of users is under the key 'ourUsersList'
        } catch (error) {
            console.error('Error fetching users:', error)            
        }
    }

    const deleteUser = async (userId) => {
        try {
            // prompt for confirmation before deleting the user
            const confirmDelete = window.confirm('Are you sure you want to delete this user?')

            const token = localStorage.getItem('token')
            if (confirmDelete) {
                await UsersService.deleteUser(userId, token)
                // after deleting the user, fetch the updated list of users
                fetchUsers();
            }
        } catch (error) {
            console.error('Error deleting user:', error)
        }
    }

    return (
        <div className="user-management-container">
            <h2>User Management Page</h2>
            <button className="reg-button"> <Link to="/register">Add User</Link></button>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <button className="delete-button" onClick={() => deleteUser(user.id)}>Delete</button>
                                <button><Link to={`/update-user/${user.id}`}>Update</Link></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default UserManagementPage;