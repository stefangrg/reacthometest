import React from "react"
import { User } from "../../types"
import { StyledUserCard } from "./styles";

const UserCard: React.FC<{ currentUser: User }> = ({ currentUser }) => {
    return <StyledUserCard>
        <img src={currentUser.picture.large} alt={`${currentUser.name.first} ${currentUser.name.last}`} />
        <p>{currentUser.name.first} {currentUser.name.last}</p>
    </StyledUserCard>
}

export default UserCard;