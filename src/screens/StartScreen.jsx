import { View } from "react-native"
import Start from "../components/Start"

const StartScreen = () => {
    return (
        <View style={styles.container}>
            <Start />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default StartScreen;