import { View, TextInput, StyleSheet } from "react-native";


export default function InputBox({ value, onChange, placeholder }) {
return (
<View style={styles.box}>
<TextInput
style={styles.input}
keyboardType="numeric"
value={value}
onChangeText={onChange}
placeholder={placeholder}
/>
</View>
);
}


const styles = StyleSheet.create({
box: {
marginVertical: 6,
},
input: {
backgroundColor: "#F3F4F6",
padding: 14,
borderRadius: 12,
fontSize: 16,
},
});