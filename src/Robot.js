import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from './config';

const Robot = () => {
  const [users, setUsers] = useState([]);
  const [randomUsers, setRandomUsers] = useState([]);
  const [currentSender, setCurrentSender] = useState({});
  const [currentReceiver, setCurrentReceiver] = useState({});
  const [randomLetters, setSelectedLetters] = useState('');
  const [emptyCabinets0, setEmptyCabinets0] = useState([]);
  const [emptyCabinets1, setEmptyCabinets1] = useState([]);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [isAutoTesting, setIsAutoTesting] = useState(false);
  const [isSendParcelDisabled, setIsSendParcelDisabled] = useState(false);

  const generateRandomLetters = () => {
    const alphabet = ['A', 'B', 'C', 'D', 'E'];
    const randomLetters = [];

    while (randomLetters.length < 2) {
      const randomIndex = Math.floor(Math.random() * alphabet.length);
      const randomLetter = alphabet[randomIndex];

      if (!randomLetters.includes(randomLetter)) {
        randomLetters.push(randomLetter);
      }
    }

    setSelectedLetters(randomLetters);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${config.backendUrl}/getAllUsers`);
      const userData = response.data.users;
      setUsers(userData);
      if (isPageLoaded === false) {
        setIsPageLoaded(true);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const getRandomUsers = () => {
    const shuffledUsers = users.sort(() => 0.5 - Math.random());
    const selectedUsers = shuffledUsers.slice(0, 2);
    setRandomUsers(selectedUsers);
    setCurrentSender(selectedUsers[0]);
    setCurrentReceiver(selectedUsers[1]);
  };

  const findEmptyCabinets = async () => {
    try {
      const response = await axios.get(`${config.backendUrl}/findEmptyCabinet?locker=${randomLetters[0]}`);
      setEmptyCabinets0(response.data.data.list);
    } catch (error) {
      console.error('Error finding empty cabinets:', error);
    }

    try {
      const response = await axios.get(`${config.backendUrl}/findEmptyCabinet?locker=${randomLetters[1]}`);
      setEmptyCabinets1(response.data.data.list);
    } catch (error) {
      console.error('Error finding empty cabinets:', error);
    }
  };

  const sendParcel = async () => {
    try {
      if (!currentSender || !currentReceiver || !emptyCabinets0[0] || !emptyCabinets1[0]) {
        console.error('Invalid data for sending parcel. Make sure all data is available.');
        return;
      }

      const requestBody = {
        sender_name: currentSender.username,
        sender_email: currentSender.email,
        pickup_locker: randomLetters[0],
        pickup_cabinet: emptyCabinets0[0].value,
        receiver_name: currentReceiver.username,
        receiver_email: currentReceiver.email,
        length: 11,
        width: 12,
        height: 13,
        mass: 14,
        sender_locker: randomLetters[1],
        sender_cabinet: emptyCabinets1[0].value,
      };

      const response = await axios.post(`${config.backendUrl}/addTestParcel`, requestBody);
    } catch (error) {
      console.error('Error sending parcel:', error);
    }
  };

  useEffect(() => {
    generateRandomLetters();
    fetchData();
    if (users.length > 0) {
      getRandomUsers();
    }
    findEmptyCabinets();
  }, [isPageLoaded]);

  useEffect(() => {
    let autoTestTimer;

    const autoTest = async () => {
      await sendParcel();
      generateRandomLetters();
      fetchData();
      if (users.length > 0) {
        getRandomUsers();
      }
      findEmptyCabinets();
    };

    if (isAutoTesting) {
      autoTestTimer = setInterval(autoTest, 0.5 * 60 * 1000);
    }

    return () => {
      clearInterval(autoTestTimer);
    };
  }, [isAutoTesting, users]);

  const handleSendParcelClick = () => {
    sendParcel();
    generateRandomLetters();
    fetchData();
    if (users.length > 0) {
      getRandomUsers();
    }
    findEmptyCabinets();
  };

  const handleAutoTestClick = () => {
    setIsAutoTesting((prev) => !prev);
    setIsSendParcelDisabled((prev) => !prev); 
  };

  return (
    <div>
      <h1>Test Robot</h1>
      <h2>Two randomly selected accounts</h2>
      <ul>
        <li>
          <strong>{currentSender.username}</strong> - {currentSender.email}
        </li>
        <li>
          <strong>{currentReceiver.username}</strong> - {currentReceiver.email}
        </li>
      </ul>

      <button onClick={handleSendParcelClick} disabled={isSendParcelDisabled}>
        Manually add package information
      </button>
      <button onClick={handleAutoTestClick}>{isAutoTesting ? 'Stop automated testing' : 'Start automated testing'}</button>
    </div>
  );
};

export default Robot;
