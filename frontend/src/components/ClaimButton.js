import React from 'react';

const ClaimButton = ({ selectedUser, handleClaimPoints }) => {
    return (
        <button
            onClick={handleClaimPoints}
            disabled={!selectedUser} // Disable if no user is selected
        >
            Claim Points
        </button>
    );
};

export default ClaimButton;