import { View } from "react-native"
import SaveStar from "../components/SaveStar"

const SaveStarScreen = () => {
    return (
        <View style={styles.container}>
            <SaveStar />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default SaveStarScreen;