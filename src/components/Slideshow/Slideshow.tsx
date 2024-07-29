import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { fetchUsers } from '../../reducers/appReducer';
import UserCard from '../UserCard/UserCard';
import { StyledSlideshow } from './styles';

const Slideshow: React.FC<{ numUsers: number, running: boolean, searchTerm: string }> = ({ numUsers, running, searchTerm }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { usersData, loading, error } = useSelector((state: RootState) => state.users);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        dispatch(fetchUsers(numUsers))
    }, [dispatch, numUsers]);

    const filteredUsers = useMemo(() => {
        const filtered = searchTerm
            ? usersData.filter(user => {
                const fullName = `${user.name.first.toLowerCase()} ${user.name.last.toLowerCase()}`;
                return user.name.first.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    user.name.last.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    fullName.includes(searchTerm.toLowerCase())
            }) : usersData;

        return filtered.length > 0 ? filtered : usersData;
    }, [usersData, searchTerm]);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (currentIndex + 1 > filteredUsers.length) setCurrentIndex(0);

        if (running) {
            interval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredUsers.length);
            }, 2000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [filteredUsers, running]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (filteredUsers.length === 0) return null;

    const currentUser = filteredUsers[currentIndex];
    if (!currentUser) return null;

    return (
        <StyledSlideshow>
            <UserCard currentUser={currentUser}></UserCard>
        </StyledSlideshow>
    );
};

export default Slideshow;