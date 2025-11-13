import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { MenuProvider } from './context/MenuContext';
import HomeScreen from './screens/HomeScreen';
import CategoryScreen from './screens/CategoryScreen';
import AddMenuItemScreen from './screens/AddMenuItemScreen';
import FilterByCourseScreen from './screens/FilterByCourseScreen';

type Screen = 'Home' | 'Category' | 'AddMenuItem' | 'FilterByCourse';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('Home');
  const [screenParams, setScreenParams] = useState<any>({});

  const navigate = (screen: Screen, params?: any) => {
    setCurrentScreen(screen);
    setScreenParams(params || {});
  };

  const goBack = () => {
    setCurrentScreen('Home');
    setScreenParams({});
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Home':
        return <HomeScreen navigation={{ navigate, goBack }} />;
      case 'Category':
        return <CategoryScreen navigation={{ navigate, goBack }} route={{ params: screenParams }} />;
      case 'AddMenuItem':
        return <AddMenuItemScreen navigation={{ navigate, goBack }} />;
      case 'FilterByCourse':
        return <FilterByCourseScreen navigation={{ navigate, goBack }} />;
      default:
        return <HomeScreen navigation={{ navigate, goBack }} />;
    }
  };

  return (
    <MenuProvider>
      {renderScreen()}
      <StatusBar style="auto" />
    </MenuProvider>
  );
};

export default App;