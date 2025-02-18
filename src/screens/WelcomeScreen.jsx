import { View } from "react-native"
import Welcome from "../components/Welcome"

const WelcomeScreen = () => {
    return (
        <View style={styles.container}>
            <Welcome />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default WelcomeScreen;