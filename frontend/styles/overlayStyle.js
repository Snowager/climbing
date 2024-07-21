import { StyleSheet } from "react-native";

export const overlayStyle = (overlayFollowToggle, xpos, ypos) => StyleSheet.create({
    overlay: overlayFollowToggle ? {
        backgroundColor: "blue",
        width: 100,
        height: 100,
        position: "absolute",
        top: ypos-100,
        left: xpos-50,
    } : 
    {
        backgroundColor: "blue",
        width: 100,
        height: 100,
        position: "relative",
    }
})