import { StyleSheet } from "react-native";

// function arrCycle(index, size) {
//     return index+1 % size
// }

export const overlayStyle = (overlayFollowToggle, color) => StyleSheet.create({
    overlay: overlayFollowToggle ? {
        backgroundColor: color,
        width: 100,
        height: 100,
    } : 
    {
        backgroundColor: "blue",
        width: 100,
        height: 100,
        position: "relative",
    }
})