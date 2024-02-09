/* eslint-disable @typescript-eslint/no-shadow */
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Dashboard from './src/pages/Dashboard/Dashboard';
import CharacterList from './src/pages/CharacterList/CharacterList';
import Profile from './src/pages/Profile/Profile';
import SignInPage from './src/pages/SignInPage/SignInPage';
import SignUpPage from './src/pages/SignUpPage/SignUpPage';
import {User, onAuthStateChanged} from 'firebase/auth';
import {firebase_auth} from './src/firebaseConfig';
import NewLoan from './src/pages/NewLoanPage/NewLoan';
const Stack = createNativeStackNavigator();

const App = () => {
  const [user, setUser] = React.useState<User | null>(null);
  React.useEffect(() => {
    onAuthStateChanged(firebase_auth, user => {
      console.log('user :', user);
      setUser(user);
    });
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen
              name="CharacterList"
              component={CharacterList}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="NewLoan"
              component={NewLoan}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{headerShown: false}}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Home"
              component={Dashboard}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SignInPage"
              component={SignInPage}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SignUpPage"
              component={SignUpPage}
              options={{headerShown: false}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
