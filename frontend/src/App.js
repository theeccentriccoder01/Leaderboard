import React, { useState, useEffect } from 'react';
import UserList from './components/UserList';
import ClaimButton from './components/ClaimButton';
import Leaderboard from './components/Leaderboard';
import './App.css'; 

function App() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [pointsAwarded, setPointsAwarded] = useState(null);
    const [newUserName, setNewUserName] = useState('');

    const API_BASE_URL = 'http://localhost:5000/api/users';

    const fetchLeaderboard = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/leaderboard`);
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching leaderboard:', error);
        }
    };

    useEffect(() => {
        const initializeUsersAndFetch = async () => {
            try {
                await fetch(`${API_BASE_URL}/initialize-users`, { method: 'POST' });
                fetchLeaderboard();
            } catch (error) {
                console.error('Error initializing users:', error);
                fetchLeaderboard();
            }
        };
        initializeUsersAndFetch();
    }, []);

    const handleUserSelect = (userId) => {
        setSelectedUser(userId);
        setPointsAwarded(null);
    };

    const handleClaimPoints = async () => {
        if (!selectedUser) return;

        try {
            const response = await fetch(`${API_BASE_URL}/claim-points/${selectedUser}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (response.ok) {
                setPointsAwarded(data.pointsAwarded);
                fetchLeaderboard();
            } else {
                console.error('Error claiming points:', data.message);
                alert(`Error claiming points: ${data.message}`);
            }
        } catch (error) {
            console.error('Error claiming points:', error);
            alert('An error occurred while claiming points.');
        }
    };

    const handleAddUser = async () => {
        if (!newUserName.trim()) {
            alert('User name cannot be empty.');
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/add-user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: newUserName.trim() }),
            });
            const data = await response.json();
            if (response.ok) {
                setNewUserName('');
                fetchLeaderboard();
            } else {
                alert(`Error adding user: ${data.message}`);
            }
        } catch (error) {
            console.error('Error adding user:', error);
            alert('An error occurred while adding the user.');
        }
    };

    return (
        <div className="App">
            <h1>Leaderboard</h1>

            <div className="action-section">
                <div className="user-add-input">
                    <input
                        type="text"
                        placeholder="Add new user name"
                        value={newUserName}
                        onChange={(e) => setNewUserName(e.target.value)}
                    />
                    <button onClick={handleAddUser}>Add User</button>
                </div>

                <div className="user-claim-section">
                    <UserList users={users} selectedUser={selectedUser} handleUserSelect={handleUserSelect} />
                    <ClaimButton selectedUser={selectedUser} handleClaimPoints={handleClaimPoints} />
                </div>
            </div>

            {pointsAwarded !== null && (
                <p className="points-award-message">
                    🎉 Successfully awarded **{pointsAwarded}** points!
                </p>
            )}

            <Leaderboard users={users} />
        </div>
    );
}

export default App;