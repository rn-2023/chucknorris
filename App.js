import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Button, Image } from 'react-native';

const URL = "https://api.chucknorris.io/jokes/random";
const imgURL = "https://api.chucknorris.io/img/chucknorris_logo_coloured_small@2x.png";

export default function App() {

  const [joke, setJoke] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState();

  useEffect(()=> {
    fetch(URL)
      .then(response => response.json())
      .then ((json) => {
        console.log(json);
        setJoke(json.value);
        setError(null);
        setIsLoading(false);
      },(error) => {
        setError("Error retrieving joke!");
        setIsLoading(false);
        console.log(error);
      })
  },[refresh])

  const getNewJoke = () => {
    setRefresh({});
  }

  if (isLoading) {
    return <View style={styles.container}><ActivityIndicator size="large"/></View>
  } else if (error) {
    return <View style={styles.container}><Text>{error}</Text></View>
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Chuck Norris Joke</Text>
        <Image style={styles.image} source={{uri: imgURL}} />
        <Text style={styles.joke}>{joke}</Text>
        <Button title="Refresh" onPress={() => getNewJoke()}></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    marginLeft: 20,
    marginRight: 20
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 20,
  },  
  joke: {
    marginTop: 10,
    marginBottom: 10,
  },
  image: {
    width: 180,
    height: 110
  }
});