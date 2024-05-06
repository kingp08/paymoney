import React, {useState, useEffect, createContext} from 'react';
import NetInfo from '@react-native-community/netinfo';

export const NetworkContext = createContext();

const Network = ({children}) => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      handleConnectivityChange(state.isConnected);
    });
    NetInfo.fetch().then(state => {
      setIsConnected(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleConnectivityChange = isConnected => {
    setIsConnected(isConnected);
  };

  return (
    <NetworkContext.Provider value={{isConnected}}>
      {children}
    </NetworkContext.Provider>
  );
};

export default Network;
