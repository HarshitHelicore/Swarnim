import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react"
import { ActivityIndicator, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { APP_BASE_URL } from "../setting/setting";
import { Orders } from "../config/apiConstant";
// import moment from 'moment';

import Moment from 'react-moment';
import 'moment-timezone';

import Ionicons from 'react-native-vector-icons/Ionicons';



export const View_Orders = ({ navigation }: any) => {

	const [loader, SetLoader] = useState(false);
	const [user_token, SetuserToken] = useState<string>();
	const [user_data, Setuserdata] = useState<any>();
	const [response, Setresponse] = useState<any>();
	const [orders, Setorders] = useState<any>();


	const data = [
		{
			"date": "03-02-2000",
			"Firm_name": "democsdc dscds,cdsbcldbcjkabdckacbjkdvcdskhj",
			"DEaler_name": "cndskjcdcjkbdcdscjkdsbckdsjbccbsdhcvdsvc",
			"amount": 121212121,
			"status": "appproved"

		},
		{
			"date": "03-02-2000",
			"Firm_name": "demo",
			"DEaler_name": "cndskjcdcjkbdcdscjkdsbckdsjbccbsdhcvdsvc",
			"amount": 121212121,
			"status": "appproved"

		},
		{
			"date": "03-02-2000",
			"Firm_name": "demosvcbdsjbvdjvbhvcsfxiyasbhfjgjhdjhk,gihd",
			"DEaler_name": "cndskjcdcjkbdcdscjkdsbckdsjbccbsdhcvdsvc",
			"amount": 121212121,
			"status": "appproved"

		}, {
			"date": "03-02-2000",
			"Firm_name": "democsdc dscds,cdsbcldbcjkabdckacbjkdvcdskhj",
			"DEaler_name": "cndskjcdcjkbdcdscjkdsbckdsjbccbsdhcvdsvc",
			"amount": 121212121,
			"status": "appproved"

		},
		{
			"date": "03-02-2000",
			"Firm_name": "demo",
			"DEaler_name": "cndskjcdcjkbdcdscjkdsbckdsjbccbsdhcvdsvc",
			"amount": 121212121,
			"status": "appproved"

		},
		{
			"date": "03-02-2000",
			"Firm_name": "demosvcbdsjbvdjvbhvcsfxiyasbhfjgjhdjhk,gihd",
			"DEaler_name": "cndskjcdcjkbdcdscjkdsbckdsjbccbsdhcvdsvc",
			"amount": 121212121,
			"status": "ssss"

		}
	]

	const get_order_details = async () => {

		SetLoader(true);


		const Token: any = await AsyncStorage.getItem('token');
		const user_login_data: any = await AsyncStorage.getItem('user_datats');
		const login_data: any = JSON.parse(user_login_data)
		{
			!window.cn(Token) && Token &&
				Token ? SetuserToken(Token) : SetuserToken("");
		}
		{
			!window.cn(login_data) && login_data &&
				login_data ? Setuserdata(login_data) : Setuserdata({});
		}

		try {
			const response = await axios.get(APP_BASE_URL + Orders, {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + Token
				},
				params: {
					"status": 2,
					"salesman": login_data.id,
					"salesman_state": login_data.state
				}
			});
			response ? Setresponse(response) : Setresponse({});
			response.data.data ? Setorders(response?.data?.data) : Setorders({});

			SetLoader(false);

		} catch (error) {
			console.log(">>>>>>>>>>>>>>>>>>>s>>>>>>>>>.error", error);

		}


	}

	useEffect(() => {
		get_order_details();
	}, [])

	const view_details = (response: any, id: any) => {
		{
			!window.cn(response) && response &&
				navigation.navigate('Open Order', { responsesss: response, specific_id: id });
		}
	}

	return (
		<>
			<SafeAreaView style={{ backgroundColor: "white", flex: 1, height: "100%" }}>
				{loader ?
					<View style={{ height: "100%", backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
						<ActivityIndicator size="large" color='black' />
					</View>
					: null}

				<View style={{ flexDirection: 'row', alignItems: 'center', marginTop: "3%", marginBottom: "3%" }}>
					<View style={{ width: "15%"}}>
						<TouchableOpacity onPress={() => navigation.goBack()}>
							<View style={{alignItems: 'center'}}>	

							<Ionicons
								name="arrow-back-outline" size={25} color='#388847'
							/>

							</View>
							
							{/* <Image style={{ width: 20, height: 20 }} source={require('../assets/images/backicon.png')} /> */}
						</TouchableOpacity>
					</View>
					<View style={{ width: "75%", alignItems: 'center' }}>
						<Text style={{ color: '#247401', fontSize: 20, fontWeight: 'bold', fontFamily: 'Montserrat' }}>Your Orders</Text>
					</View>
				</View>

				<FlatList
					// contentContainerStyle={{ paddingBottom: 100 }}
					data={!window.cn(orders) && orders}
					renderItem=
					{({ item }) =>
						<View style={{ marginLeft: 20, marginRight: 20, marginBottom: 15, padding: 5 }}>
							<View style={{ borderWidth: 0.5, height: "auto", borderRadius: 10, width: "100%", flex: 1, borderColor: 'black' }}>
								<View style={{ marginLeft: 20, marginRight: 20, marginTop: 10, marginBottom: 10 }}>

									<View style={{ flexDirection: 'row' }}>
										<View style={styles.output_text_styles}>
											<Text style={[styles.text_styles, { fontStyle: 'normal', fontWeight: 'bold' }]}>Date:</Text>
										</View>
										{/* <>
									{item.created_at ? demo_date(item.created_at) : <Text>cdsjcvdj</Text>}
									</> */}
										<View style={styles.output_styles}>
											<Text style={styles.text_styles} numberOfLines={1}>
												<Moment element={Text} format="DD/MM/YYYY" style={{ color: 'black' }}>
													{item.created_at}
												</Moment>
											</Text>
										</View>
									</View>

									<View style={{ flexDirection: 'row' }}>
										<View style={styles.output_text_styles}>
											<Text style={[styles.text_styles, { fontStyle: 'normal', fontWeight: 'bold' }]}>Firm Name:</Text>
										</View>
										<View style={styles.output_styles}>
											<Text style={styles.text_styles} numberOfLines={1}>{item.dealer.firm_name}</Text>
										</View>

									</View>

									<View style={{ flexDirection: 'row' }}>
										<View style={styles.output_text_styles}>
											<Text style={[styles.text_styles, { fontStyle: 'normal', fontWeight: 'bold' }]}>Dealer Name:</Text>
										</View>
										<View style={styles.output_styles}>
											<Text style={styles.text_styles} numberOfLines={1}>{item.dealer.full_name}</Text>
										</View>

									</View>

									<View style={{ flexDirection: 'row' }}>
										<View style={styles.output_text_styles}>
											<Text style={[styles.text_styles, { fontStyle: 'normal', fontWeight: 'bold' }]}>Amount:</Text>
										</View>
										<View style={styles.output_styles}>
											<Text style={styles.text_styles} numberOfLines={1}>{item.order_amount}</Text>
										</View>

									</View>

									<View style={{ flexDirection: 'row' }}>
										<View style={styles.output_text_styles}>
											<Text style={[styles.text_styles, { fontStyle: 'normal', fontWeight: 'bold' }]}>Status:</Text>
										</View>
										<View style={styles.output_styles}>
											<Text style={styles.text_styles} numberOfLines={1}>{item.status}</Text>
										</View>

									</View>

									<View style={styles.button_view}>
										<TouchableOpacity onPress={() => view_details(item, item.dealer.id)}>
											<View>
												<Text style={styles.button_text}>
													View Details
												</Text>
											</View>
										</TouchableOpacity>
									</View>

								</View>

							</View>
						</View>
					}
				// }
				/>

			</SafeAreaView>

		</>
	)

}


const styles = StyleSheet.create({
	text_styles: {
		fontSize: 14,
		color: '#171C15',
		fontFamily: 'Montserrat',
	},
	output_text_styles: {
		width: "30%",
		marginTop: 5,
	},
	output_styles: {
		marginTop: 5,
		width: '72%'
	},
	button_view: {
		marginTop: 10,
		marginLeft: 20,
		borderWidth: 1,
		borderColor: 'black',
		borderRadius: 5,
		width: "40%",
		justifyContent: 'center',
		alignItems: 'center'
	},
	button_text: {
		color: 'black',
		fontStyle: 'normal',
		fontSize: 16,
		fontFamily: 'Montserrat'
	}
})