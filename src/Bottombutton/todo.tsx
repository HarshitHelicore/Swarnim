import { SafeAreaView,
    View,
    Text
     } from "react-native"

export const Todo = ({ navigation }: any) => {
    return (
        <SafeAreaView>
            <View>
                <Text style={{textAlign: 'center', fontSize: 16, fontWeight: 'bold'}}>
                    TODO                    
                </Text>
            </View>
        </SafeAreaView>
    )
}