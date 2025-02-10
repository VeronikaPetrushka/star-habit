import { View } from "react-native"
import Home from "../components/Home"

const HomeScreen = ({ route }) => {
    const { habitName } = route.params || {};

    return (
        <View style={styles.container}>
            <Home habitName={habitName} />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default HomeScreen;