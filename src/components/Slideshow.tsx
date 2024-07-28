import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchUsers } from '../reducers/appReducer';

const Slideshow: React.FC<{ numUsers: number, running: boolean }> = ({ numUsers, running }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { usersData, loading, error } = useSelector((state: RootState) => state.users);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        dispatch(fetchUsers(numUsers))
    }, [dispatch, numUsers]);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (currentIndex + 1 > usersData.length) setCurrentIndex(0);

        if (running) {
            interval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % usersData.length);
            }, 2000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [usersData, running]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (usersData.length === 0) return null;

    const currentUser = usersData[currentIndex];
    if (!currentUser) return null;

    return (
        <>
            <div>
                <img src={currentUser.picture.large} alt={`${currentUser.name.first} ${currentUser.name.last}`} />
                <p>{currentUser.name.first} {currentUser.name.last}</p>
            </div>

        </>

    );
};

export default Slideshow;