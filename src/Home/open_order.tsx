import { useEffect, useState } from "react";
import { FlatList, Image, LogBox, StyleSheet } from "react-native"
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native"
import { styles } from "react-native-floating-label-input/src/styles";
import Ionicons from 'react-native-vector-icons/Ionicons';


export const Open_Order = ({ navigation, route }: any) => {

	const [data, setdata] = useState<any>();
	const [packing_size, setpackingsize] = useState<any>();
	const [quantity, setquantity] = useState<any>();

	const [crop_name, Setcropname] = useState<string>();
	const [variety_name, Setvarietyname] = useState<string>();

	LogBox.ignoreLogs([
		'Non-serializable values were found in the navigation state',
	]);

	useEffect(() => {
		get_specific_user_data();
	}, [])

	const get_specific_user_data = () => {
		{
			!window.cn(route.params.responsesss) && route.params.responsesss &&
				setdata(route.params.responsesss.lineitems);
			const data = route.params.responsesss
			// for (key of data.lineitems) {
			// 	{
			// 		!window.cn(key.packing_size) && key.packing_size &&
			// 			setpackingsize(key.packing_size);
			// 	}
			// 	{
			// 		!window.cn(key.quantity) && key.quantity &&
			// 			setquantity(key.quantity);
			// 	}

			// 	{
			// 		!window.cn(key.crop_obj.name) && key.crop_obj.name &&
			// 			Setcropname(key.crop_obj.name);
			// 	}

			// 	{
			// 		!window.cn(key.variety_obj.name) && key.variety_obj.name &&
			// 			Setvarietyname(key.variety_obj.name);
			// 	}

			// }
		}
	}

	const press_back_button = () => {
		navigation.navigate('View Orders');
	}

	return (
		<SafeAreaView style={{ height: "100%", backgroundColor: 'white' }}>
			<View style={{ flexDirection: 'row', alignItems: 'center', marginTop: "3%", marginBottom: "3%" }}>
				<View style={{ width: "15%"}}>
					<TouchableOpacity onPress={press_back_button}>
						<View style={{ alignItems: 'center' }}>

							<Ionicons
								name="arrow-back-outline" size={25} color='#388847'
							/>

						</View>
						{/* <Image style={{ width: 20, height: 20 }} source={require('../assets/images/backicon.png')} /> */}
					</TouchableOpacity>
				</View>
				<View style={{ width: "75%", alignItems: 'center' }}>
					<Text style={{ color: '#247401', fontSize: 20, fontWeight: '500', fontFamily: 'Montserrat' }}>Orders</Text>
				</View>
			</View>

			<FlatList
				// contentContainerStyle={{ paddingBottom: 100 }}
				data={!window.cn(data) && data}
				renderItem=
				{({ item }) =>
					<View style={{ marginLeft: 20, marginRight: 20, marginBottom: 15, padding: 5, borderWidth: 0.5, borderColor: 'black', borderRadius: 10 }}>
						<View style={{ width: "100%" }}>
							{!window.cn(item.crop_obj.name) && !window.cn(item.variety_obj.name) && item.crop_obj.name && item.variety_obj.name &&
								<View style={{ marginLeft: 20, marginTop: 10 }}>
									<Text style={Styles.text_style}>{!window.cn(item.crop_obj.name) && item.crop_obj.name} - {!window.cn(item.variety_obj.name) && item.variety_obj.name}</Text>
								</View>
							}

							<View style={{ flexDirection: 'row', marginTop: 10 }}>
								<View style={{ marginLeft: 20, width: "20%" }}>
									<Text style={Styles.text_style}>
										Size
									</Text>
								</View>
								{!window.cn(item.packing_size) && item.packing_size &&
									<View>
										<Text style={Styles.text_style}>{!window.cn(item.packing_size) && item.packing_size}</Text>
									</View>
								}
							</View>

							<View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
								<View style={{ marginLeft: 20, width: "20%" }}>
									<Text style={Styles.text_style}>
										Qty
									</Text>
								</View>
								{!window.cn(item.quantity) && item.quantity &&
									<View>
										<Text style={Styles.text_style}>{!window.cn(item.quantity) && item.quantity}</Text>
									</View>
								}
							</View>

						</View>
					</View>
				}
			/>

			{/* <View style={{ borderWidth: 0.5, height: "auto", margin: 20, borderRadius: 10, borderColor: '#247401' }}>
				<View style={{ width: "100%" }}>
					{!window.cn(crop_name) && !window.cn(variety_name) && crop_name && variety_name &&
						<View style={{ marginLeft: 20, marginTop: 10 }}>
							<Text style={Styles.text_style}>{!window.cn(crop_name) && crop_name} - {!window.cn(variety_name) && variety_name}</Text>
						</View>
					}




				</View>
			</View> */}
		</SafeAreaView>
	)

}


const Styles = StyleSheet.create({
	text_style: {
		color: 'black',
		fontFamily: 'Montserrat',
		fontWeight: 'bold',
		fontSize: 14,
		fontStyle: 'normal',

	}
})