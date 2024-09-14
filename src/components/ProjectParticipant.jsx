import React from 'react';

export const ProjectParticipant = ({ participant, color }) => {

    const nameParts = participant.split(' ');
    const initials = nameParts.map(part => part.charAt(0)).join('');

    return (
            <div className={`${color} border border-1 rounded-full p-2`}>{initials}</div>
    );
}
