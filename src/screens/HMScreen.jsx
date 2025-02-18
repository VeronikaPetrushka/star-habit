import { View } from "react-native"
import HM from "../components/HM"

const HMScreen = ({ route }) => {
    const { habitName } = route.params || {};

    return (
        <View style={styles.container}>
            <HM habitName={habitName} />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default HMScreen;