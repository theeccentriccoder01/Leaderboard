import React from 'react';
import './Leaderboard.css';
const getAvatarUrl = (userId) => {
    const seed = userId ? userId.substring(0, 10) : Math.random().toString(36).substring(7);
    return `https://api.dicebear.com/8.x/bottts/svg?seed=${seed}`;
};

const Leaderboard = ({ users }) => {
    if (!users || users.length === 0) {
        return <p className="no-users-message">No users on the leaderboard yet. Add some or claim points!</p>;
    }

    const topThree = users.slice(0, 3);
    const restOfUsers = users.slice(3);

    return (
        <div className="leaderboard-container">
            <h2>Leaderboard</h2>

            <div className="top-three-ranking">
                {topThree[1] && (
                    <div className="rank-card second-place">
                        <img src={getAvatarUrl(topThree[1]._id)} alt={topThree[1].name} className="user-avatar" />
                        <span className="rank-badge">2</span>
                        <div className="user-info">
                            <h3>{topThree[1].name}</h3>
                            <p>{topThree[1].points} <span className="points-icon">🏆</span></p>
                        </div>
                    </div>
                )}

                {topThree[0] && (
                    <div className="rank-card first-place">
                        <img src={getAvatarUrl(topThree[0]._id)} alt={topThree[0].name} className="user-avatar" />
                        <span className="rank-badge crown-gold">👑</span>
                        <div className="user-info">
                            <h3>{topThree[0].name}</h3>
                            <p>{topThree[0].points} <span className="points-icon">🏆</span></p>
                        </div>
                    </div>
                )}

                {topThree[2] && (
                    <div className="rank-card third-place">
                        <img src={getAvatarUrl(topThree[2]._id)} alt={topThree[2].name} className="user-avatar" />
                        <span className="rank-badge">3</span>
                        <div className="user-info">
                            <h3>{topThree[2].name}</h3>
                            <p>{topThree[2].points} <span className="points-icon">🏆</span></p>
                        </div>
                    </div>
                )}
            </div>

            <div className="rest-of-leaderboard">
                <table>
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th></th>
                            <th>Name</th>
                            <th>Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {restOfUsers.map(user => (
                            <tr key={user._id}>
                                <td>{user.rank}</td>
                                <td>
                                    <img src={getAvatarUrl(user._id)} alt={user.name} className="user-avatar-small" />
                                </td>
                                <td>{user.name}</td>
                                <td>{user.points} <span className="points-icon">🏆</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Leaderboard;